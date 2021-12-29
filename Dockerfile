FROM registry-proxy.alfa-bank.kz:443/nginx:1.20-alpine
COPY ./build /usr/share/nginx/html/b2b
EXPOSE 80/tcp
