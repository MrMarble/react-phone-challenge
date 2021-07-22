# Phone catalogue

[![Release](https://github.com/MrMarble/react-phone-challenge/actions/workflows/release.yml/badge.svg)](https://github.com/MrMarble/react-phone-challenge/actions/workflows/release.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/mrmarble/react-phone-challenge)

## Objetive

- Create a REST API providing phone information with crud capabilities
- Create a react app to browse through the catalog

## Onlie demo

https://react-phone-challenge.vercel.app

## API Endpoints

The React application only uses the GET methods, although there are more available:

| Method | End Point    | Params | Body                          | Description                                                   |
| ------ | ------------ | ------ | ----------------------------- | ------------------------------------------------------------- |
| GET    | /phones      | `page` |                               | returns a list of Phones. `page` param is used for pagination |
| GET    | /phones/`ID` |        |                               | returns the phone that matches with the `ID`                  |
| POST   | /phones/`ID` |        | [Phone](prisma/schema.prisma) | creates a Phone at `ID`                                       |
| PUT    | /phones/`ID` |        | [Phone](prisma/schema.prisma) | creates or updates a Phone at `ID`                            |
| PATCH  | /phones/`ID` |        | [Phone](prisma/schema.prisma) | updates a Phone at `ID`                                       |

## Local installation

You need `node` and `docker`.

Clone this repository

```bash
git clone https://github.com/mrmarble/react-phone-challenge
```

Install the dependencies

```bash
npm i
```

Start PostgreSql container

```bash
docker-compose up postgres -d
```

Create database

```bash
npx prisma generate && npx db push
```

Populate database with some data

```bash
docker-compose run -v ./prisma:/prisma postgres psql -U phones -d mydb -c "COPY \"Phone\"(name,manufacturer,color,price,\"imageFileName\",\"screenSize\",\"screenType\",processor,ram) FROM '/prisma/phone_dataset.csv' DELIMITER ',' CSV HEADER;" -h postgres
```

Start development server 🚀

```bash
npm run dev
```

Done! 🎉

## Deployment

### Docker

You can use the provided `Dockerfile` and/or `docker-compose.yml` to deploy this project to any server

just run

```bash
docker-compose up -d
```

and wait for the stack to be ready.

Once is up, you can populate the database following the same steps for the local installation

### Vercel

This repo is intented to be used with vercel. First you will need a PostgreSql provider like [Heroku](https://www.heroku.com/postgres)

Once Postgres is ready, you can use the provided [csv](prisma/phone_dataset.csv) to populate your database.

Configure the `DATABASE_URL` environmet variable so it points to your server and run

```bash
npx prisma generate && npx db push
```

Then, use the cli to upload the csv

```bash
# Heroku example

# authenticate to the postgresql provider with heroku-cli
$ heroku pg:psql [postgres-service-name] --app [react-phone-challenge]

# Upload csv
postgres#= \c "Phone"(name,manufacturer,color,price,"imageFileName","screenSize","screenType",processor,ram) FROM '/prisma/phone_dataset.csv' DELIMITER ',' CSV HEADER;
# COPY 1017 <-- response from command
```

Once is done, deploy to vercel and configure the `DATABASE_URL` environment variable to your postgres provider and is done! 🎉
