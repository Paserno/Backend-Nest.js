<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# TesloDB API

1. Clonar proyecto
2. Instalar dependencias 
```
yarn install
```
3. Clonar el archivo ```.env.template``` y renombrar a ```.env```
4. Cambiar las variables de entorno
5. Levantar la base de datos
```
docker-compose up -d
```
6. Levantar proyecto
 ```
 yarn star:dev
 ``` 
7. Ejecutar SEED (Seed es para llenar la base de datos)
 ```
  http://localhost:3000/api/seed
 ```


# 
## Librerias de tercero

##### Propio de Nest
- [@nestjs/serve-static](https://docs.nestjs.com/recipes/serve-static)
- [@nestjs/jwt](https://docs.nestjs.com/security/authentication#jwt-token)
- [@nestjs/passport](https://docs.nestjs.com/recipes/passport#implement-protected-route-and-jwt-strategy-guards)
- [@nestjs/typeorm](https://docs.nestjs.com/techniques/database)
- [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction) - OpenAPI
- [@nestjs/websockets](https://docs.nestjs.com/websockets/gateways#installation)

##### Otros
- [class-transformer](https://github.com/nestjs/class-transformer)
- [class-validator](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe)
- [pg](https://github.com/brianc/node-postgres) - PostgresDB
- [typeorm](https://github.com/typeorm/typeorm)
- [uuid](https://github.com/uuidjs/uuid)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [passport-jwt](https://github.com/mikenicholson/passport-jwt)
- [passport](https://github.com/jaredhanson/passport)
- [socket.io](https://github.com/socketio/socket.io)