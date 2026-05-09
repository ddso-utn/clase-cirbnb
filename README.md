# 📚 Clase - Sábado 09/05/2026  

Este repositorio contiene los materiales y ejemplos trabajados en clase.  

## 🔹 Temas vistos
- Persistencia en MongoDB
- Mongoose como ODM y practica

## Rutas para postman
Se encuentran las colecciones en postman_examples
- POST, GET ALL: localhost:3000/alojamiento
- GET ONE, PUT, DELETE: localhost:3000/alojamiento/{id}
- POST, GET ALL: localhost:3000/reserva
- GET W/FILTER: http://localhost:3000/reserva?nombreHuesped=nombre
- GET ONE, PUT, DELETE localhost:3000/reserva/{id}
- Extras para los casos vistos en clase

## Instalacion MongoDB
Opcion 1 -> Documentación oficial: https://www.mongodb.com/docs/manual/installation/
Opción 2 -> Docker: docker run -d \
            --name practica-persistencia-dds \
            -p 27017:27017 \
            -e MONGO_INITDB_ROOT_USERNAME=root \
            -e MONGO_INITDB_ROOT_PASSWORD=secret \
            mongo:6


## Instalacion Mongoose
Documentación oficial: https://mongoosejs.com/docs/index.html
- npm install mongoose --save

## Herramientas extras MongoDB
Documentación oficial: https://www.mongodb.com/docs/development/

