FROM node:22-alpine
WORKDIR /app

# Thêm apk upgrade để vá các lỗi bảo mật của Alpine OS
RUN apk update && apk upgrade --no-cache && apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

ENV PORT 3001
EXPOSE 3001

CMD ["npm", "run", "start"]