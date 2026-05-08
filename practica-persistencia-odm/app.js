import express from "express"

import routes from "./routes/routes.js"

import { Server } from "./server.js"

import { AlojamientoController } from "./controllers/alojamientoController.js"
import { AlojamientoService } from "./services/alojamientoService.js"
import { AlojamientoRepository } from "./models/repositories/alojamientoRepository.js"

import { ReservaController } from "./controllers/reservaController.js"
import { ReservaService } from "./services/reservaService.js"
import { ReservaRepository } from "./models/repositories/reservaRepository.js"

const app = express()

app.use(express.json())

const server = new Server(app)

// ---------- ALOJAMIENTOS ----------

const alojamientoRepository = new AlojamientoRepository()

const alojamientoService =
    new AlojamientoService(alojamientoRepository)

const alojamientoController =
    new AlojamientoController(alojamientoService)

server.setController(
    AlojamientoController,
    alojamientoController
)

// ---------- RESERVAS ----------

const reservaRepository = new ReservaRepository()

const reservaService =
    new ReservaService(reservaRepository)

const reservaController =
    new ReservaController(reservaService)

server.setController(
    ReservaController,
    reservaController
)

// ---------- RUTAS ----------

routes.forEach(route => server.addRoute(route))

server.configureRoutes()

export default server