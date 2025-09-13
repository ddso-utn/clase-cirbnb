import { AlojamientoController } from "../controllers/alojamientoController.js";
import express from "express";
import { alojamientosErrorHandler } from "../middlewares/alojamientosMiddleware.js";
import { loggerMiddleware } from "../middlewares/loggerMiddleware.js";

const pathAlojamiento = "/alojamientos";

export default function alojamientoRoutes(getController) {
  const router = express.Router();

  router.use(loggerMiddleware);

  router.get(pathAlojamiento, async (req, res) => {
    try {
      await getController(AlojamientoController).buscarTodos(req, res);
    } catch (err) {
      //usamos el error
    }
  });

  router.post(pathAlojamiento, async (req, res, next) => {
    try {
      await getController(AlojamientoController).crear(req, res);
    } catch (err) {
      next(err);
    }
  });

  router.get(pathAlojamiento + "/:id", async (req, res, next) => {
    try {
      await getController(AlojamientoController).findById(req, res);
    } catch (err) {
      next(err);
    }
  });

  router.delete(pathAlojamiento + "/:id", (req, res) => {
    getController(AlojamientoController).eliminar(req, res);
  });

  router.put(pathAlojamiento + "/:id", (req, res) => {
    getController(AlojamientoController).actualizar(req, res);
  });

  router.use(alojamientosErrorHandler);

  return router;
}
