import { z } from "zod"

export class AlojamientoController {
    
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService
    }

    async findAll(req, res, next) {
        try {
            const { page, limit, maxPrice } = req.query;

            const filters = {};
            if (maxPrice !== undefined) {
                filters.maxPrice = parseFloat(maxPrice);
            }

            const result = await this.alojamientoService.findAllPaginated(page, limit, filters);

            // Return 204 if no alojamientos found
            if (result.total === 0) {
                return res.status(204).send();
            }

            res.json(result);
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
