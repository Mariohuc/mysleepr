# stage development 
FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY nest-cli.json ./

RUN npm i -g pnpm

RUN pnpm install

COPY apps/notifications apps/notifications
COPY libs libs

RUN cd apps/notifications && pnpm install

RUN pnpm run build notifications

# stage production
FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/notifications/main"]



