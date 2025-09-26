import { ReservaController } from "../controllers/reservaController.js";
import express from 'express';

const pathReserva = "/reserva";

export default function reservaRoutes(getController) {
    const router = express.Router();

    router.get(pathReserva, (req, res, next) => {
        getController(ReservaController).findAll(req, res, next);
    });

    router.post(pathReserva, (req, res, next) => {
        getController(ReservaController).create(req, res, next);
    });

    router.get(pathReserva + "/:id", (req, res, next) => {
        getController(ReservaController).findById(req, res, next);
    });

    router.put(pathReserva + "/:id", (req, res, next) => {
        getController(ReservaController).update(req, res, next);
    });

    router.delete(pathReserva + "/:id", (req, res, next) => {
        getController(ReservaController).delete(req, res, next);
    });

    return router;
}
