FROM node:20-alpine

WORKDIR /app

COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN npm ci --prefix client && npm ci --prefix server

COPY client ./client
COPY server ./server

RUN npm run build --prefix client && npm run build --prefix server

ENV NODE_ENV=production
EXPOSE 8000

CMD ["npm", "run", "start", "--prefix", "server"]
