FROM centos:latest

RUN yum update -y
RUN yum install epel-release -y
RUN yum install \
	gcc-c++ \
	make \
	nodejs \
	python \
	-y

ENV NODE_ENV=production

WORKDIR /opt/healthcoin/healthcoin-server
COPY healthcoin-server/package.json .
RUN npm install --progress false

WORKDIR /opt/healthcoin/healthcoin-client
COPY healthcoin-client/package.json .
RUN npm install --progress false

WORKDIR /opt/healthcoin/healthcoin-server
COPY healthcoin-server .

WORKDIR /opt/healthcoin/healthcoin-client
COPY healthcoin-client .
RUN npm run build

RUN cp -r dist/* ../healthcoin-server/public/

WORKDIR /opt/healthcoin/healthcoin-server
EXPOSE 80
CMD [ "node", "." ]
