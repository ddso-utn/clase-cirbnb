import NotificacionController from "../controllers/notificacionController.js";
import express from "express";

const pathNotificacion = "/notificacion";

export default function notificacionRoutes(getController) {
  const router = express.Router();

  router.get(pathNotificacion, (req, res, next) => {
    getController(NotificacionController).obtenerNotificacionesNoLeidas(req, res, next);
  });

  router.post(pathNotificacion, (req, res, next) => {
    getController(NotificacionController).crearNotificacion(req, res, next);
  });

  return router;
}
