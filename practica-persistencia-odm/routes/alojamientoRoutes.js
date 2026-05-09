import { AlojamientoController } from "../controllers/alojamientoController.js";
import express from 'express'

const pathAlojamiento = "/alojamiento"

export default function alojamientoRoutes(getController) {
    const router = express.Router() 
    const controller = getController(AlojamientoController)

    router.get(pathAlojamiento, (req,res, next) => {
        controller.findAll(req,res, next)
    })

    router.post(pathAlojamiento, (req, res,next) => {
        controller.create(req,res, next)
    })

    router.get(pathAlojamiento + "/paginado", (req, res, next) => {
        controller.findAllPaginated(req, res, next)
    })

    router.get(pathAlojamiento + "/:id", (req, res, next) => {
        controller.findById(req,res, next)
    })

    router.delete(pathAlojamiento + "/:id", (req, res, next) => {
        controller.delete(req,res, next)
    })

    router.put(pathAlojamiento + "/:id", (req, res, next) => {
        controller.update(req,res, next)
    })

    router.delete(pathAlojamiento + "/soft/:id", (req, res, next) => {
        controller.softDelete(req,res, next)
    })


    return router 
}