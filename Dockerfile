# Stage 1: Build
FROM node:20-alpine AS builder

ARG APP
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build $APP

# Stage 2: Production
FROM node:20-alpine

ARG APP
ENV APP=$APP
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml .env ./

RUN npm install -g pnpm
RUN pnpm install --prod

EXPOSE 3000
CMD node dist/apps/$APP/$APP/src/main.js
