FROM node:18-alpine AS builder
WORKDIR /app

ARG VITE_API_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build 

FROM nginx:1.25-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost/ || exit 1

EXPOSE 80