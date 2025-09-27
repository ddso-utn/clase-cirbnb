# 📚 Clase - Sábado 27/09  

Este repositorio contiene los materiales y ejemplos trabajados en clase.  

## 🔹 Temas vistos
- Persistencia de Datos
- Persistencia en Bases de Datos NoSQL
- Persistencia en MongoDB
- Mongoose como ODM y practica


## ⚙️ Correr el server
Para correr el server:  
1. Entrar en la carpeta server `cd .\server\`
2. Instlar dependencias `npm i`.  
3. Levantar la app `node .\index`  

## Configuración de variables de entorno
Para usar las variables de entorno:  
1. Copiar el archivo `.env.example`.  
2. Renombrarlo como `.env`.  
3. Ajustar los valores necesarios.  

## Rutas para postman
Se encuentran las colecciones en postman_examples
- POST, GET ALL: localhost:3000/alojamiento
- GET ONE, PUT, DELETE: localhost:3000/alojamiento/{id}
- POST, GET ALL: localhost:3000/reserva
- GET W/FILTER: http://localhost:3000/reserva?nombreHuesped=nombre
- GET ONE, PUT, DELETE localhost:3000/reserva/{id}

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

## Herramientas extras MongoDB
Documentación oficial: https://www.mongodb.com/docs/development/

