# Toppalife API

## Prerequisites

* Node
* Docker Desktop installed and running

## General Setup

1. Create a `.env` file, using `.env.example` as a base
2. Run `yarn install` or `npm install`.
3. Complete the steps in **Database Setup**.
4. Run `yarn start` or `npm start`.

## Database Setup

Prisma is used to populate Postgres from schemas and automate migrations. You can find the schemas under `prisma/schema.prisma`.

If you've created your `.env` file, you should still be missing the `DATABASE_URL` variable, which is required to connect to the database.

To generate the `DATABASE_URL` variable, run `npx prisma init --datasource-provider postgresql`. This will generate the variable and `schema.prisma`. If this is already setup, you can create it yourself in your `.env` file e.g. `DATABASE_URL="postgresql://admin:password123@127.0.0.1:5432/myapp?schema=public"`.

Once this is done, spin up the Postgres and Redis databases by running `docker compose up -d`. We should now be able to connect to our database.

If using VSCode, you could use the [MySql](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2) extension, select Postgres, add the information from your .env file to the relevant fields and click "Connect" to test the database connection and view data.

To create the database tables, run `npx prisma db push`.

