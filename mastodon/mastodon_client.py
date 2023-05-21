"""
This module defines a Mastodon client, which is capable of streaming data 
from Mastodon API. The Mastodon client first cleans the data, then processes the data,
and finally saves the data into a CouchDB database.
"""
from mastodon import Mastodon, StreamListener
import json, sys, couchdb
from html.parser import HTMLParser
from transformers import pipeline
from uuid import uuid4


class MyHTMLParser(HTMLParser):
    """Parses the given HTML text into desired format."""

    def __init__(self):
        super().__init__()
        self.text = ""
        self.content_list = []  # store a list of content strings
        self.tag_list = []  # store a list of tag strings
        self.url_list = []  # store a list of url strings
        self.url = ""
        self.tag_present = False
        self.url_present = False
        self.punctuation_marks = " .?!,;:-()[]{'}\""

    def handle_starttag(self, tag, attrs):
        if tag == "a":  # encountered a link tag
            is_url = False
            for item in attrs:
                if item[0] == "target":  # this link tag represents a URL
                    is_url = True
                    break
            self.text += "|"
            if is_url:  # this link tag represents a URL
                self.url_present = True
            else:  # this link tag represents a hashtag
                self.tag_present = True

    def handle_data(self, data):
        if self.tag_present:
            if data != "#" and data != " ":
                self.text += data
                self.tag_list.append(
                    data.strip(self.punctuation_marks).lower()
                )  # add the hashtag to tag array
        elif self.url_present:
            self.text += data
            self.url += data
        else:
            self.text += " " + data
            temp = filter(
                lambda s: len(s) != 0 and s.isalpha(),
                map(lambda s: s.strip(self.punctuation_marks).lower(), data.split()),
            )
            self.content_list += temp  # add the content string to content array

    def handle_endtag(self, tag):
        if tag == "a":
            self.text += "|"
            if self.url_present:
                self.url_list.append(self.url)
                self.url = ""
            self.tag_present = False
            self.url_present = False

    def reset_parser(self):
        self.text = ""
        self.url = ""
        self.content_list = []
        self.tag_list = []
        self.url_list = []

    def get_result(self):
        return {
            "text": self.text,
            "tokens": self.content_list,
            "tags": self.tag_list,
            "urls": self.url_list,
        }


class MyListener(StreamListener):
    def __init__(
        self, db, html_parser, coffee_keywords, work_keywords, sentiment_pipeline
    ):
        super().__init__()
        self.db = db
        self.html_parser = html_parser
        self.coffee_keywords = coffee_keywords
        self.work_keywords = work_keywords
        self.sentiment_pipeline = sentiment_pipeline

    def on_update(self, toot):
        """After getting a post, clean it up, normalize it, process it, and store it in the database."""
        if toot["language"] == "en":
            toot = self.__clean_toot(toot)
            toot = self.__process_toot(toot)
            self.__save_to_db(toot)

    def __clean_toot(self, toot):
        """Cleans the given toot. Keep only necessary fields and transform those fields into desired format."""

        created_at = {
            "year": toot["created_at"].year,
            "month": toot["created_at"].month,
            "day": toot["created_at"].day,
            "hour": toot["created_at"].hour,
            "minute": toot["created_at"].minute,
            "second": toot["created_at"].second,
        }

        self.html_parser.reset_parser()
        self.html_parser.feed(toot["content"])

        return {
            "_id": uuid4().hex,
            "content": self.html_parser.get_result(),
            "created_at": created_at,
        }

    def __process_toot(self, toot):
        """Processes the given toot."""

        toot["mentions_coffee"] = self.__mentions_coffee(toot)
        toot["mentions_work"] = self.__mentions_work(toot)
        if toot["mentions_work"]:
            toot["sentiment"] = self.__get_sentiment(toot)

        return toot

    def __mentions_coffee(self, toot):
        """Determines whether the given toot mentions coffee or not."""

        tokens = toot["content"]["tokens"]
        tags = toot["content"]["tags"]

        mentions_coffee = False

        for tag in tags:
            if tag in self.coffee_keywords:
                mentions_coffee = True
                break

        if not mentions_coffee:
            for token in tokens:
                if token in self.coffee_keywords:
                    mentions_coffee = True
                    break

        return mentions_coffee

    def __mentions_work(self, toot):
        """Determines whether the given toot mentions work or not."""

        tokens = toot["content"]["tokens"]
        tags = toot["content"]["tags"]

        mentions_work = False

        for tag in tags:
            if tag in self.work_keywords:
                mentions_work = True
                break

        if not mentions_work:
            for token in tokens:
                if token in self.work_keywords:
                    mentions_work = True
                    break

        return mentions_work

    def __get_sentiment(self, toot):
        """Performs sentiment analysis on the given toot."""

        return self.sentiment_pipeline(toot["content"]["text"])[0]

    def __save_to_db(self, toot):
        """Saves the given post to database."""

        del toot["content"]  # don't need content anymore
        self.db.save(toot)


def main():
    # Reads files
    config_file = None
    coffee_keyword_file = None
    work_keyword_file = None
    try:
        config_file = open(sys.argv[1], "r")
        coffee_keyword_file = open(sys.argv[2], "r")
        work_keyword_file = open(sys.argv[3], "r")
    except FileNotFoundError:
        print("The configuration file does not exist.")
        sys.exit(1)

    config_info = json.load(config_file)
    coffee_keywords = json.load(coffee_keyword_file)
    work_keywords = json.load(work_keyword_file)

    config_file.close()
    coffee_keyword_file.close()
    work_keyword_file.close()

    # Connects to Mastodon server
    mastodon = Mastodon(
        access_token=config_info["access_token"],
        api_base_url=config_info["api_base_url"],
    )

    print(mastodon.retrieve_mastodon_version())

    # Connects to CouchDB
    couch = couchdb.Server(
        "http://"
        + config_info["couchdb_username"]
        + ":"
        + config_info["couchdb_password"]
        + "@"
        + config_info["couchdb_ip_address"]
        + ":"
        + config_info["couchdb_port_number"]
        + "/"
    )

    # Gets the database named mastodon and the sentiment pipeline named sentiment-analysis
    mastodon_db = couch["mastodon"]
    sentiment_pipeline = pipeline("sentiment-analysis")

    print("The Mastodon client is now streaming data...")

    # Streams Mastodon data
    mastodon.stream_public(
        listener=MyListener(
            mastodon_db,
            MyHTMLParser(),
            coffee_keywords,
            work_keywords,
            sentiment_pipeline,
        ),
        local=True,
    )


if __name__ == "__main__":
    main()
