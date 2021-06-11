#Build Frontend
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install --no-optional && npm cache clean --force
COPY ./ /app/
RUN npm run build


#deploy with nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3006
ENTRYPOINT ["nginx", "-g", "daemon off;"]

