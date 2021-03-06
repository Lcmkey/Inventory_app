# .env

```properties
# App Info
PORT=5000
JWT_SECRET=your-secret

# DB Config
POSTGRES_USER=admin
POSTGRES_PASSWORD=your-password
POSTGRES_DB=inventory_app
POSTGRES_TEST_DB=inventory_app_test
```

# How to Run

### __Startup the Docker Services__

    $ docker-compose up -d

### __Check service that is Running__

    $ docker ps

output:
```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
aec913f8608b        adminer             "entrypoint.sh docke…"   2 hours ago         Up 2 hours          0.0.0.0:8080->8080/tcp   backend_adminer_1
0b97cad1d105        postgres            "docker-entrypoint.s…"   2 hours ago         Up 2 hours          0.0.0.0:5432->5432/tcp   backend_db_1

```

### **Migrate database**

    $ make migrate

### **Initial db data**

    $ make seeks

### __Install package__

    $ npm i

### __Run app__
    $ make dev

# Model a SQL Database

Every Record will have:
Created At - datetime
Updated At - datetime
Deleted At - datetime

## Entities in an Home Inventory System

- [x] User
- [ ] Item
- [x] Item Type
- [ ] Comment
- [x] Manufacturer
- [ ] Warranty
- [x] Item Location
- [ ] Item Purchase Location

## Seed the Database

- [x] User
- [ ] Countries - Partial, more to do!
- [ ] US States - Partial, more to do!
- [ ] Item Types
- [ ] Location

# Knex setup

### install

    $ npm i knex

### Get some help

    $ npx knex -h
    $ knex -h

### Create migrate file

    $ knex migrate:make init
    $ knex migrate:make item_table

### Run migrate to init db

    $ knex migrate:latest

### Run migrate with debug mode

    $ npm run migrate -- --debug

### Create initial Seeds file

    $ knex seed:make initial

### Run seed to create data

    $ knex seed:run

# eslint setup

### install

    $ npm i eslint

### init

    $ npx eslint --init


# [JsonSchma][JsonSchma]

[JsonSchma]:https://jsonschema.net/home "JsonSchma"

# Test

### __Get all users__

    $ curl http://localhost:5000/api/v1/users | jq

### __Get user by id__

    $ curl http://localhost:5000/api/v1/users/1 | jq

### __Create user__

    $ curl -X POST -H "Content-Type: application/json" -d '{"email": "sam.leung02@test.com", "name": "sam.leung", "password": "Ab_12345678"}' http://localhost:5000/api/v1/auth/signup | jq


### __Get all state__

    $ curl http://localhost:5000/api/v1/states | jq

### __Get state by id__

    $ curl http://localhost:5000/api/v1/states/1 | jq

### __Sigin__

    $ curl -X POST -H "Content-Type: application/json" -d '{"email": "sam.leung02@test.com", "password": "Ab_12345678"}' http://localhost:5000/api/v1/auth/signin | jq