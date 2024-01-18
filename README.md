# Comcamp 35 Backend

A Backend for Comcamp 35 Registration website

## Prerequisite

- Node.js v18+ (with pnpm)

## Setup

clone this repository

### Environment variables

create `.env` file in the root directory

enter this lines in `.env` file

```env
# Database
DATABASE_URL=""

MINIO_ENDPOINT=""
MINIO_ACCESS_KEY=""
MINIO_SECRET_KEY=""
MINIO_BUCKET_NAME=""

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_SECRET=""
GOOGLE_CALLBACK_URL=""

# Cookie
JWT_SECRET=""
FRONTEND_URL="http://localhost:3000"
```

### Install dependencies

We use `pnpm` for this repository so you can install it by

```bash
npm install -g pnpm
```

And then install the packages

```bash
pnpm install
```

### Pull database info

```bash
pnpx prisma db pull
```

### Start the server

```bash
pnpm start:dev
```

### For Production

Build the package

```bash
pnpm build
```

Migrate prisma as production

```bash
pnpx prisma migrate deploy
```

Start the server

```bash
pnpm start:prod
```
