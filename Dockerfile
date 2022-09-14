FROM    node:16.13.2

WORKDIR /app

COPY    package.json .

RUN     npm install

ARG     NODE_ENV
RUN     if [ "$NODE_ENV" = "development" ]; then\
          npm install; \
          else npm install --only=production; \
        fi

COPY    . ./

ENV     PORT 4000
EXPOSE  $PORT

CMD [ "node","index.js"]