FROM node:20-alpine
WORKDIR /app
RUN npm install kafkajs
COPY producer.js consumer.js ./