#!/bin/sh

pushd $(dirname $0)/.. > /dev/null

./build.sh
docker tag healthcoin-web jjavery/healthcoin
docker push jjavery/healthcoin
