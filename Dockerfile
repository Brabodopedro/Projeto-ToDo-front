FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Usar Vite ou algum server HTTP (como serve ou nginx)
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
