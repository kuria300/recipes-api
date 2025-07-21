FROM node:22-alphine

WORKDIR /app

COPY package*json ./

RUN npm install --only-production

COPY --chown=node:node . .

USER node

EXPOSE 5000

CMD [ "npm" "run" "dev" ]