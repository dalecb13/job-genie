# Cover Letters

Cover Letters is an application that helps me reduce the repeated efforts in writing cover letters. Cover Letters have many Paragraphs, and each Paragraph is often targeted toward a collection of Tags as well as (Job Description) Sections.

---

## Getting Started

### UI

- `npm run dev` in `./ui` folder

---

## Dev Commands

`npx npx @nestjs/cli@latest`

### Prisma

```bash
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm
```

---

## Glossary

### Cover Letter

A collection of Sections

### Section

A Line or Paragraph that relates to a collection of Tags

---

## APIs

### Tags

Get all Tags

```bash
curl http://localhost:8080/tags
```

Create a Tag

```bash
curl http://localhost:8080/tags -X POST -H "Content-Type: application/json" -d '{"tagName":"value1"}'
```

### Sections

Get all Sections

```bash
curl http://localhost:8080/sections
```

Create a Section

```bash
curl http://localhost:8080/sections -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "param1=value1&param2=value2"
```

---

## PostgreSQL

```bash
CREATE DATABASE cover_letters;
CREATE TABLE IF NOT EXISTS 
```
