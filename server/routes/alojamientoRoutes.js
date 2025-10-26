import { AlojamientoController } from "../controllers/alojamientoController.js";
import express from 'express'

const pathAlojamiento = "/alojamiento"

export default function alojamientoRoutes(getController) {
    const router = express.Router() 

    router.get(pathAlojamiento, (req,res, next) => {
        getController(AlojamientoController).findAll(req,res, next)
    })

    router.post(pathAlojamiento, (req, res,next) => {
        getController(AlojamientoController).create(req,res, next)
    })

    router.get(pathAlojamiento + "/:id", (req, res, next) => {
        getController(AlojamientoController).findById(req,res, next)
    })

    router.delete(pathAlojamiento + "/:id", (req, res, next) => {
        getController(AlojamientoController).delete(req,res, next)
    })

    router.put(pathAlojamiento + "/:id", (req, res, next) => {
        getController(AlojamientoController).update(req,res, next)
    })

    return router 
}