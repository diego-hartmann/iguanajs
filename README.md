# 🦎 IguanaJS

[IguanaJS](https://iguanajs.com) is a modern Express REST API boilerplate built for scalable feature-based services with Prisma, Docker, OpenAPI and strong DX.

Designed for fast iteration, clean architecture and long-term maintainability.

---

# 🚀 Quick start

## Clone

```bash
npx degit https://github.com/diego-hartmann/iguanajs <your-service-name>
cd <your-service-name>
npm install
```

## Start Postgres

```bash
npm run db:up
```

## Generate Prisma schema + client

```bash
npm run prisma:schema
npm run prisma:migrate
```

## Run in dev

```bash
npm run dev
```

API running at:

```
http://localhost:3000
```

---

# 🧠 Philosophy

IguanaJS is built around:

- feature isolation
- schema modularization
- type safety
- predictable migrations
- reproducible environments
- zero magic architecture

Each feature owns:

- routes
- services
- schemas
- database models

No giant monolith folders.

---

# 📁 Project architecture

```
src/
  features/
    user/
      user.routes.ts
      user.service.ts
      user.schema.ts
  core/
    middleware/
    logger/
    server.ts
  index.ts

prisma/
  base.prisma
  models/
    user.prisma
  schema.prisma
```

### Architecture principles

- features are independent
- Prisma models are modular
- OpenAPI derives from Zod schemas
- services contain business logic
- routes stay thin

---

# 🧩 Features system

## Create a feature

```bash
npm run make
```

Generates:

- feature folder
- route + service scaffold
- Zod schema
- Prisma model fragment

List features:

```bash
npm run features
```

---

# 🗄 Prisma workflow

IguanaJS uses modular Prisma schemas.

Each feature has its own model file:

```
prisma/models/<feature>.prisma
```

These are merged into a single schema.

## Build schema

```bash
npm run prisma:schema
```

This concatenates:

```
base.prisma
+ models/*.prisma
→ schema.prisma
```

Then regenerates Prisma client.

## Run migrations

```bash
npm run prisma:migrate
```

## Reset database (dev only)

```bash
npm run prisma:reset:dev
```

---

## Prisma flow diagram

```
Feature model files
        ↓
 prisma/models/*.prisma
        ↓
 prisma:schema script
        ↓
 prisma/schema.prisma
        ↓
 prisma generate
        ↓
 Prisma Client
        ↓
 Application runtime
```

---

# 🐳 Database (Docker)

Start Postgres:

```bash
npm run db:up
```

Stop:

```bash
npm run db:down
```

Refresh DB:

```bash
npm run db:refresh
```

Inspect containers:

```bash
npm run db:info
```

---

# 📦 Build & run

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Production start

```bash
npm start
```

---

# 📖 OpenAPI

IguanaJS can generate OpenAPI from Zod schemas.

```bash
npm run openapi:build
```

Output:

```
openapi.json
```

You can plug it into:

- Swagger UI
- Stoplight
- Postman
- Bruno

---

# 🧪 Testing

## Unit tests

```bash
npm run test:unit
```

## API smoke tests

```bash
npm run test:api
```

---

# 🧹 Code quality

Lint:

```bash
npm run lint
```

Fix lint:

```bash
npm run lint:fix
```

Format:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

Type check:

```bash
npm run check:types
```

---

# 🌍 Environment variables

IguanaJS uses:

```
dotenv-safe
```

Create:

```
.env
.env.example
```

All required variables must exist in `.env.example`.

This prevents silent runtime failures.

---

# 🚢 Deploy guide

## Minimal production flow

```
git clone
npm install
npm run build
node dist/index.js
```

## Docker production suggestion

Create:

```
Dockerfile
docker-compose.prod.yml
```

Use:

- Node 20 alpine
- Postgres managed externally
- environment variables via secrets

IguanaJS does not force a deployment platform.

Works on:

- Fly.io
- Railway
- Render
- AWS
- VPS
- Kubernetes

---

# 🔐 Security defaults

Pre-configured:

- helmet
- rate limiting
- CORS
- structured logging
- JWT support
- schema validation

Safe by default, extensible by design.

---

# 📋 Requirements

- Node.js 20+
- Docker Desktop

Optional:

Bruno (API client)  
macOS: `brew install --cask bruno`  
Windows/Linux: https://www.usebruno.com

TablePlus (DB client)  
macOS: `brew install --cask tableplus`  
Windows/Linux: https://tableplus.com

---

# 🧠 Stack

- Express
- Prisma + Postgres
- Zod validation
- OpenAPI generator
- Docker
- Jest
- TSUP
- ESLint + Prettier
- Pino logger

---

# 🎯 Goals

IguanaJS is designed to:

- scale with features
- avoid spaghetti services
- enforce clean structure
- reduce boilerplate
- improve DX
- keep runtime predictable

---

# License

MIT
