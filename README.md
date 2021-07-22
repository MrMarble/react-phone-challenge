# Phone catalogue

[![Release](https://github.com/MrMarble/react-phone-challenge/actions/workflows/release.yml/badge.svg)](https://github.com/MrMarble/react-phone-challenge/actions/workflows/release.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/mrmarble/react-phone-challenge)

## Objetive

- Create a REST API providing phone information with crud capabilities
- Create a react app to browse through the catalog

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
