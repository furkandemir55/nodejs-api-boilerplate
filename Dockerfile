FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . ./

RUN npm run build




FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV production
ENV PROJECT_ENV docker

COPY package*.json ./
RUN npm ci
COPY --from=builder /app/dist .

CMD ["node", "index.js"]
