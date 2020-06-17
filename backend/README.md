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

### **Migrate database**

    $ make migrate

### **Initial db data**

    $ make seeks

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

    $ curl -X POST -H "Content-Type: application/json" -d '{"email": "sam.leung@test.com", "name": "sam.leung", "password": "12345678"}' http://localhost:5000/api/v1/users | jq