"""
This module defines a Mastodon client, which is capable of streaming data 
from Mastodon API. The Mastodon client first cleans the data, then processes the data,
and finally saves the data into a CouchDB database.
"""
from mastodon import Mastodon, StreamListener
import json, sys, couchdb, uuid
from html.parser import HTMLParser


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

    def handle_starttag(self, tag, attrs):
        if tag == "a":  # encountered a link tag
            is_url = False
            for item in attrs:
                if item[0] == "target":
                    is_url = True
                    break

            if is_url:  # this link tag represents a URL
                self.url_present = True
            else:  # this link tag represents a hashtag
                self.tag_present = True

    def handle_data(self, data):
        if self.tag_present:
            self.text += "|" + data
            if data != "#" and data != " ":
                self.tag_list.append(data)  # add the hashtag to tag array
        elif self.url_present:
            self.text += "|" + data
            self.url += data
        else:
            self.text += "|" + data
            self.content_list.append(data)  # add the content string to content array

    def handle_endtag(self, tag):
        if tag == "a":
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
            "contents": self.content_list,
            "tags": self.tag_list,
            "urls": self.url_list,
        }


class MyListener(StreamListener):
    def __init__(self, db, html_parser):
        super().__init__()
        self.db = db
        self.html_parser = html_parser

    def on_update(self, toot):
        """After getting a post, clean it up, normalize it, process it, and store it in the database."""
        toot = self.__clean_toot(toot)
        print(toot, end="\n\n")
        # toot = self.__process_toot(toot)
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
            "_id": str(uuid.uuid4()),
            "content": self.html_parser.get_result(),
            "created_at": created_at
        }

    # def __process_toot(self, toot):
    #     toot["relevant"] = True
    #     return toot

    def __save_to_db(self, toot):
        """Saves the given post to database according to its relevance."""
        # if toot["relevant"]:
        #     del toot["relevant"]
        self.db.save(toot)


def main():
    # Reads configuration information
    config_file = None
    try:
        config_file = open(sys.argv[1], "r")
    except FileNotFoundError:
        print("The configuration file does not exist.")
        sys.exit(1)

    config_info = json.load(config_file)
    config_file.close()

    # Connects to Mastodon server
    mastodon = Mastodon(
        access_token=config_info["access_token"],
        api_base_url=config_info["api_base_url"],
    )

    if not mastodon.stream_healthy():
        print("The streaming API is not usable.")
        sys.exit(2)

    # Connects to CouchDB
    couch = couchdb.Server(
        "http://"
        + config_info["couchdb_username"]
        + ":"
        + config_info["couchdb_password"]
        + "@"
        + config_info["couchdb_ip_address"]
        + ":"
        + str(config_info["couchdb_port_number"])
        + "/"
    )

    # Gets the database named mastodon
    mastodon_db = couch["mastodon"]

    # Streams Mastodon data
    mastodon.stream_public(listener=MyListener(mastodon_db, MyHTMLParser()), local=True)


if __name__ == "__main__":
    main()
