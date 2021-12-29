FROM registry-proxy.alfa-bank.kz:443/nginxinc/nginx-unprivileged:1.20-alpine
COPY ./build /usr/share/nginx/html/b2b
EXPOSE 8080/tcp
