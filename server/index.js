import dotenv from "dotenv"
dotenv.config(); 

import express from "express"
import { Server } from "./server.js"

import routes from "./routes/routes.js"

import { AlojamientoController } from "./controllers/alojamientoController.js"
import { AlojamientoService } from "./services/alojamientoService.js"
import { AlojamientoRepository } from "./models/repositories/alojamientoRepository.js"
import { MongoDBClient } from "./config/database.js";

import { ReservaController } from "./controllers/reservaController.js"
import { ReservaService } from "./services/reservaService.js"
import { ReservaRepository } from "./models/repositories/reservaRepository.js"

import NotificacionController from "./controllers/notificacionController.js"
import NotificacionService from "./services/notificacionService.js"
import NotificacionRepository from "./models/repositories/notificacionRepository.js"


const app = express()
app.use(express.json())

// Configuramos el puerto con el .env
const port = process.env.PORT || 3000
dotenv.config();

// Se envía al server el puerto
const server = new Server(app, port)

const alojamientoRepository = new AlojamientoRepository()
const alojamientoService = new AlojamientoService(alojamientoRepository)
const alojamientoController = new AlojamientoController(alojamientoService)

server.setController(AlojamientoController, alojamientoController)

const reservaRepository = new ReservaRepository()
const reservaService = new ReservaService(reservaRepository)
const reservaController = new ReservaController(reservaService)

server.setController(ReservaController, reservaController)

const notificacionRepository = new NotificacionRepository()
const notificacionService = new NotificacionService(notificacionRepository)
const notificacionController = new NotificacionController(notificacionService)

server.setController(NotificacionController, notificacionController)

routes.forEach(route => server.addRoute(route))
server.configureRoutes();
server.launch();

//Conexion a las base de mongo
MongoDBClient.connect();











    