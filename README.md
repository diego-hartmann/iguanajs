# 🦎 IguanaJS

[IguanaJS](https://iguanajs.com) is a Restfull Express API boilerplate

### Cloning

```shell
npx degit https://github.com/diego-hartmann/iguanajs <your-service-name>
cd <your-service-name>
npm install
npm run dev
```

### Create a new feature

`npm run make`

It will also create a Prisma model file in prisma/models.

### Create Prisma schema file

`npm run prisma:schema`

It will use the files in prisma/models to create/overwrite prisma/schema.prisma (main file).

### Migrate Prisma to Database (Postgres)

`npm run prisma:migrate`

### Init Docker (Postgres)

`npm run up`

### Run service in DEV

`npm run dev`

### Dependencies

- Docker Desktop (for Postgres)
- Bruno (optional API client)
  - macOS: brew install --cask bruno
  - Windows / Linux: https://www.usebruno.com
- TablePlus (optional Postgres client)
  - macOS: brew install --cask tableplus
  - Windows / Linux: https://tableplus.com
