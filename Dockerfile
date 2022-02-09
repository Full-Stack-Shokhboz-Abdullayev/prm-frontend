FROM node:14.18.1-alpine
WORKDIR /app
COPY ./package.json . 
RUN apk add --no-cache --virtual .gyp \
        python2 \
        make \
        g++ \
    && npm install \
    && apk del .gyp
COPY . .
RUN npm run build
ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["npm", "start"]