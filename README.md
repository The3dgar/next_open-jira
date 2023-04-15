# Nest js Open Jira App

Para correr localmente, se necesita la db 

```
docker-compose up -d
```

MongoDb URL local:

```
mongodb://localhost:27017/entriesdb
```

## .env

fijarse en __.env.template__ para crear el __.env__

## llenar db

GET ``` http://localhost:3000/api/seed ```