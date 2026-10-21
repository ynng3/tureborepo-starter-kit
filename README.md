# Turborepo Starter Kit

A full-stack monorepo starter built with Turborepo and TypeScript. It includes:

- Next.js app for server-rendered UI
- React + Vite app for client-side frontend
- Express.js API server
- Shared constants package
- Prisma + PostgreSQL database adapter
- JWT-based login/register sample API

## Project structure

```text
.
├── apps/
│   ├── nextjs/
│   ├── react/
│   └── expressjs/
├── packages/
│   ├── constants/
│   └── database/
├── .env.example
├── docker-compose.yml
├── package.json
├── turbo.json
├── tsconfig.base.json
├── README.md
└── package-lock.json
```

## Tech stack

- Node.js + TypeScript
- Turborepo
- Next.js 14
- React + Vite
- Express.js
- Prisma ORM
- PostgreSQL
- JWT + bcryptjs

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL database or Docker

## Quick start

```bash
npm install
npm run db:up
npm run dev
```

If you do not want to use Docker, install PostgreSQL locally and set the `DATABASE_URL` manually.

## Run apps individually

```bash
npm run dev:next
npm run dev:react
npm run dev:express
```

## Root scripts

```bash
npm run dev        # run all apps in parallel
npm run build      # build all workspace packages/apps
npm run lint       # run workspace lint tasks
npm run check-types# run TypeScript checks
npm run db:up      # start PostgreSQL via docker-compose
npm run db:down    # stop PostgreSQL container
```

## Environment configuration

Create local env files from the examples:

```bash
cp .env.example .env
cp apps/expressjs/.env.example apps/expressjs/.env
cp packages/database/.env.example packages/database/.env
```

Core variables:

- `DATABASE_URL` for Prisma connection
- `PORT` for Express server
- `JWT_SECRET` for JWT signing

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/turborepo_starter?schema=public"
PORT=3001
JWT_SECRET="change-this-to-a-secure-secret"
```

## Database setup

This starter uses PostgreSQL through Prisma.

### Option 1: Docker (recommended)

```bash
npm run db:up
```

### Option 2: Local PostgreSQL

Update your `DATABASE_URL` to match your local database and then run:

```bash
npx prisma db push
npm --workspace packages/database run db:seed
```

## API endpoints

The Express app exposes a RESTful sample API under `/api/v1`.

### Health check

```bash
curl http://localhost:3001/api/v1/health
```

### Register user

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'
```

### List users

```bash
curl http://localhost:3001/api/v1/users
```

## Seeded example user

A sample account is included in the Prisma seed:

- Email: `hello@turborepo.local`
- Password: `password123`

## App URLs

- Next.js: http://localhost:3000
- React: http://localhost:5173
- Express API: http://localhost:3001

## Express architecture

The Express app is structured in layered folders for readability and maintainability:

```text
apps/expressjs/src/
├── app.ts
├── index.ts
├── config/
├── controllers/
├── models/
├── routes/
├── services/
├── views/
└── ...
```

This keeps request handling, business logic, and response shaping separated.

## Notes

- The login sample uses JWT for demonstration purposes.
- Passwords are hashed with bcrypt before storage.
- This project is intended as a starter for real authentication and API flows.
- Docker must be installed for the included `docker-compose.yml` workflow.

## Troubleshooting

### Docker command not found

If `docker` is unavailable in your environment, either:

- install Docker Desktop / Docker Engine, or
- start a local PostgreSQL instance and update `DATABASE_URL` accordingly.

### Prisma client not generated

```bash
npx prisma generate
```

### Database schema not applied

```bash
npx prisma db push
```

### Database seed missing

```bash
npm --workspace packages/database run db:seed
```
