import { z } from "zod"

export class AlojamientoController {
    
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService
    }

    async findAll(req, res, next) {
        try {
            const alojamientos = await this.alojamientoService.findAll();
            res.json(alojamientos);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const alojamiento = await this.alojamientoService.create(req.body);
            res.status(201).json(alojamiento);
        } catch (error) {
            next(error);
        }
    }

    async findById(req, res, next) {
        try {
            const alojamiento = await this.alojamientoService.findById(req.params.id);
            res.json(alojamiento);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const alojamiento = await this.alojamientoService.update(req.params.id, req.body);
            /*
            if (!alojamiento) {
                return res.status(404).json({ message: "Alojamiento not found" });
            }
            */
            res.json(alojamiento);
        } catch (error) {
            next(error);
        }
    }

    // Recordar que siempre intamos hacer baja logica
    async delete(req, res, next) {
        try {
            const alojamiento = await this.alojamientoService.delete(req.params.id);
            res.json({ message: "Alojamiento eliminada" });
        } catch (error) {
            next(error);
        }
    }

    
}
