FROM node:14 as builder

WORKDIR /app

COPY . .

#RUN rm -rf node_modules package-lock.json && npm i && npm run build:prod

#Start a new stage from scratch


FROM nginx:1.20.1

RUN rm /etc/nginx/conf.d/default.conf && rm /usr/share/nginx/html/* && mkdir -p /usr/share/nginx/html/b2b

COPY --from=builder /app/build /usr/share/nginx/html/b2b
COPY deploy/nginx.conf /etc/nginx/conf.d/

#COPY content /usr/share/nginx/html

#COPY conf /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
