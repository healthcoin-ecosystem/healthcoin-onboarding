#!/bin/sh

NETWORK=healthcoin
DB_HOSTNAME=healthcoin-db1
WEB_HOSTNAME=healthcoin-web1
WEB_IMAGE=healthcoin-web

docker stop $WEB_HOSTNAME
docker stop $DB_HOSTNAME

docker rm $WEB_HOSTNAME

docker network create $NETWORK

docker run \
	--name $DB_HOSTNAME \
	--hostname $DB_HOSTNAME \
	--network $NETWORK \
	--publish 27107:27017 \
	--detach \
	mongo

docker run \
	--name $WEB_HOSTNAME \
	--hostname $WEB_HOSTNAME \
	--network $NETWORK \
	--publish 80:80 \
	--detach \
	$WEB_IMAGE
