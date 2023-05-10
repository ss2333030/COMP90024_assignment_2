"""
This module defines a Mastodon client, which is capable of streaming data 
from Mastodon API.
"""
from mastodon import Mastodon, StreamListener
import json, os, couchdb


class Listener(StreamListener):
    def __init__(self, db):
        super().__init__()
        self.db = db

    def on_update(self, toot):
        # Converts the toot into a Python dictionary
        temp = {"content": toot["content"], "created_at": toot["created_at"]}
        # toot = json.loads(json.dumps(status, indent=2,
        #                   sort_keys=True, default=str))
        # # Filters Mastodon data
        # filtered_toot = dict()
        # filtered_toot["account"] = toot["account"]
        # filtered_toot["content"] = toot["content"]
        # filtered_toot["created_at"] = toot["created_at"]
        # # Saves the toot into database
        self.db.save(json.dumps(temp, default=str))
        # print(toot)

def main():
    # Connects to Mastodon server
    m = Mastodon(api_base_url=os.environ["MASTODON_URL"], access_token=os.environ["MASTODON_API_KEY"])

    # Connects to CouchDB
    couch = couchdb.Server(f"http://{os.environ['COUCHDB_USERNAME']}:{os.environ['COUCHDB_PASSWORD']}@{os.environ['COUCHDB_IP']}:5984/")
    mastodon_db = couch["mastodon"]
    print("Harversting data from Mastodon API...")
    m.stream_local(Listener(mastodon_db))
    mastodon_db.save()


if __name__ == "__main__":
    main()
