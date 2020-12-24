# microservice Node / Mongoose

### Install Node.js and MongoDB

https://docs.mongodb.com/manual/installation

https://nodejs.org/en/download/

### import collections from migrate folder
```bash
# mongoimport ./migrate/users.json -d DB_NAME -c users --jsonArray --drop
# mongoimport ./migrate/comments.json -d DB_NAME -c comments --jsonArray --drop
```

Edit .env file correspondingly

### Start nodejs server
```bash
# yarn start
```

#### for available endpoints refer to
/users/routes.js

/comments/routes.js
