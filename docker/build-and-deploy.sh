#!/bin/sh

pushd $(dirname $0)/.. > /dev/null

docker/build.sh
docker tag healthcoin-web jjavery/healthcoin
docker push jjavery/healthcoin
