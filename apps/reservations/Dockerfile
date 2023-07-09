FROM node:alpine AS development
LABEL authors="angelcruz"

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:alpine AS production
LABEL authors="angelcruz"

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]