FROM node:16.13.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build --configuration=production

FROM nginx:1.21.0-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx","-g","daemon off;"]