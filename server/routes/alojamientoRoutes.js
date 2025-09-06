import { AlojamientoController } from "../controllers/alojamientoController.js";
import express from 'express'

const pathAlojamiento = "/alojamiento"

export default function alojamientoRoutes(getController) {
    const router = express.Router() 

    router.get(pathAlojamiento, (req,res) => {
        getController(AlojamientoController).buscarTodos(req,res)
    })

    router.post(pathAlojamiento, (req, res) => {
        getController(AlojamientoController).crear(req,res)
    })

    router.get(pathAlojamiento + "/:id", (req, res) => {
        getController(AlojamientoController).findById(req,res)
    })

    router.delete(pathAlojamiento + "/:id", (req, res) => {
        getController(AlojamientoController).eliminar(req,res)
    })

    router.put(pathAlojamiento + "/:id", (req, res) => {
        getController(AlojamientoController).actualizar(req,res)
    })

    return router 
}