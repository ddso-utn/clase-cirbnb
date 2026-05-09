import { ReservaController } from "../controllers/reservaController.js";
import express from 'express';

const pathReserva = "/reserva";

export default function reservaRoutes(getController) {
    const router = express.Router();
    const controller = getController(ReservaController);

    router.get(pathReserva, (req, res, next) => {
        controller.findAll(req, res, next);
    });

    router.post(pathReserva, (req, res, next) => {
        controller.create(req, res, next);
    });

    router.get(pathReserva + "/:id", (req, res, next) => {
        controller.findById(req, res, next);
    });

    router.put(pathReserva + "/:id", (req, res, next) => {
        controller.update(req, res, next);
    });

    router.delete(pathReserva + "/:id", (req, res, next) => {
        controller.delete(req, res, next);
    });

    router.get( "/reserva/:id/total", (req, res, next) => {
        controller.obtenerReservaConTotal(req, res, next);
    });

    router.get(pathReserva + "/estadisticas/reservas-por-alojamiento", (req, res, next) => {
        controller.reservasPorAlojamiento(req, res, next);
    });

    return router;
}
