FROM centos:latest

RUN yum update -y
RUN yum install epel-release -y
RUN yum install \
	gcc-c++ \
	make \
	nodejs \
	python \
	-y

RUN groupadd -r healthcoin \
	&& useradd -m -r -g healthcoin healthcoin

WORKDIR /opt/healthcoin/healthcoin-server
COPY healthcoin-server/package.json .
RUN npm install --loglevel http --progress false

WORKDIR /opt/healthcoin/healthcoin-client
COPY healthcoin-client/package.json .
RUN npm install --loglevel http --progress false

WORKDIR /opt/healthcoin/healthcoin-server
COPY healthcoin-server .

WORKDIR /opt/healthcoin/healthcoin-client
COPY healthcoin-client .
RUN npm run build \
	&& cp -r dist/* ../healthcoin-server/public/ \
	&& mkdir ../healthcoin-server/public/images \
	&& cp -r src/images/* ../healthcoin-server/public/images/ \
	&& rm -rf ../healthcoin-client

WORKDIR /opt/healthcoin/healthcoin-server
COPY generate-data ./public/generate-data

EXPOSE 80
ENV NODE_ENV=production
CMD [ "node", "." ]
