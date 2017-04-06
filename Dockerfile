FROM centos:latest

RUN yum update -y
RUN yum install epel-release -y
RUN yum install \
	gcc-c++ \
	make \
	nodejs \
	python \
	-y

WORKDIR /opt/healthcoin

COPY healthcoin-server/package.json .
RUN npm install --progress false

COPY healthcoin-server .
COPY healthcoin-client/build ./public

EXPOSE 80

ENV NODE_ENV=production

CMD [ "node", "." ]
