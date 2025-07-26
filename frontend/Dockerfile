FROM node:22-slim

#create a system user(robot to run up minimal) and system group not to run as root and add appuser to group
#-s craete a system user named appuser
#-G add user to group
RUN addgroup -S app && adduser -S appuser -G app

#ENV NODE_ENV=production

WORKDIR /app

#if package.json and lock.json dont changed docker uses cached dependencies instaed or reinstallin
COPY package*.json ./

#install only dependencies and skips devdependencies for production
RUN npm install --only=production 


RUN chown -R appuser:app .

USER appuser

COPY . .

EXPOSE 5173

CMD npm run dev
