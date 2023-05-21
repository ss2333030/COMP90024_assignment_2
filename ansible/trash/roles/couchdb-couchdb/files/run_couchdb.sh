#!/bin/bash

export USERNAME="admin"
export PASSWORD="password"
export VERSION="3.2.1"
export COOKIE="a192aeb9904e6590849337933b000c99"

docker pull ibmcom/couchdb3:${VERSION}

if [! -z $(docker ps --all --filter "name=couchdb5" --quiet)]
then
    docker stop $(docker ps --all --filter "name=couchdb5" --quiet) 
    docker rm $(docker ps --all --filter "name=couchdb5" --quiet)
fi

docker run -d --name couchdb5 \ 
    -p 5984:5984 -p 4369:4369 -p 9100:9100 \
    --mount type=volume,src=couchdb,target=/opt/couchdb/data \
    --env COUCHDB_USER=${user} --env COUCHDB_PASSWORD=${pass} \
    --env COUCHDB_SECRET=${cookie} \
    --env ERL_FLAGS="-setcookie \"${cookie}\" -name \"couchdb@172.26.135.121\"" \
    ibmcom/couchdb3:${VERSION} \
    /