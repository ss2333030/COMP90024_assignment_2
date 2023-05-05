"""
This module defines a Mastodon client, which is capable of streaming data 
from Mastodon API.

"""
from mastodon import Mastodon, MastodonNotFoundError, MastodonRatelimitError, StreamListener
import csv, os, time, json
import requests
import couchdb

def main():
    class Listener(StreamListener):
        def __init__(self, db) -> None:
            super().__init__()
            self.db = db

        def on_update(self, status):
            # Converts the toot into a Python dictionary
            toot = json.loads(json.dumps(status, indent=2, sort_keys=True, default=str))
            # Filters Mastodon data
            filtered_toot = dict()
            filtered_toot["account"] = toot["account"]
            filtered_toot["content"] = toot["content"]
            filtered_toot["created_at"] = toot["created_at"]
            # Saves the toot into database
            self.db.save(toot)
    
    # Sets up connection
    m = Mastodon(api_base_url=f'https://mastodon.social', access_token="uxK_q_ON-JA7jj98vBeS4s6-5L_FORWziWMcOYRRi2Y")
    couch = couchdb.Server('http://admin:ss2333030@localhost:5984/')
    
    db = couch["data"]
    print("Harversting data from Mastodon API...")
    m.stream_public(Listener(db))
    
if __name__ == "__main__":
    main()
