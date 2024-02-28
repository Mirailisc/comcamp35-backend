FROM node:18-alpine AS base
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

WORKDIR /app
COPY . ./

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

FROM deps AS build
RUN pnpm prisma
RUN pnpm build

FROM build AS deploy

# Database
ENV DATABASE_URL DATABASE_URL
# Authentication
ENV JWT_TOKEN JWT_TOKEN
ENV GOOGLE_CLIENT_ID GOOGLE_CLIENT_ID
ENV GOOGLE_SECRET GOOGLE_SECRET
ENV GOOGLE_CALLBACK_URL GOOGLE_CALLBACK_URL

ENV APP_VERSION APP_VERSION
ENV FRONTEND_URL FRONTEND_URL

ENV NODE_ENV=production

CMD [ "pnpm", "start:prod" ]