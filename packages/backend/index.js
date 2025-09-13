import dotenv from "dotenv"
import express from "express"
import { Server } from "./server.js"

import routes from "./routes/routes.js"

import { AlojamientoController } from "./controllers/alojamientoController.js"
import { AlojamientoService } from "./services/alojamientoService.js"
import { AlojamientoRepository } from "./models/repositories/alojamientoRepository.js"

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

routes.forEach(route => server.addRoute(route))
server.configureRoutes();
server.launch();