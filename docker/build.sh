#!/bin/sh

pushd $(dirname $0)/.. > /dev/null

docker build -t healthcoin-web .
