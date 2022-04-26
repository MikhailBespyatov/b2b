# syntax = registry-proxy.alfa-bank.kz/docker/dockerfile:1.4
#FROM registry-test.alfa-bank.kz/bnpl/node16.13.1-yarn1.22.17 as builder
#WORKDIR /srv
#COPY . /srv/
#RUN <<eot
#  export REACT_APP_VERSION=$(git describe --always)
#  export PUBLIC_URL=/b2b
#  export CI=false
#  yarn install --network-timeout 100000 --non-interactive --pure-lockfile
#  yarn run build
#eot
#FROM registry-proxy.alfa-bank.kz/nginxinc/nginx-unprivileged:1.20-alpine
#COPY --from=builder /srv/build/ /app/
#COPY <<-'eot' /etc/nginx/conf.d/default.conf
#  server {
#    listen 8080;
#    server_name localhost;
#    location / {
#      root /app;
#      try_files $uri $uri/ /index.html$is_args$args;
#      index index.html;
#    }
#  }
#eot
#EXPOSE 8080/tcp
FROM registry-test.alfa-bank.kz/node:10.15.3-alpine
COPY package.json /srv/package.json
COPY build /srv/build
COPY server.js /srv/server.js

WORKDIR /srv

ENV PORT=8080
ENV SKIP_PREFLIGHT_CHECK=true

EXPOSE 8080
USER node:node
ENTRYPOINT ["node", "server.js"]
