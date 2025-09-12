import { z } from "zod"

export class AlojamientoController {
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService
    }

    buscarTodos (req, res) {
        const {page = 1, limit = 10} = req.query
        const filtros = req.query

        const alojamientosPaginados = this.alojamientoService.buscarTodos(page, limit, filtros)
        if (alojamientosPaginados === null) {
            return res.status(204).send()
        }
        res.status(200).json(alojamientosPaginados)
    }

    crear(req, res) {
        const body = req.body
        const resultBody = alojamientoSchema.safeParse(body)

        if(resultBody.error) {
            res.status(400).json(resultBody.error.issues)
            return
        }

        const nuevaAlojamiento = this.alojamientoService.crear(resultBody.data);
        res.status(201).json(nuevaAlojamiento);
    }

    findById(req, res) {
        const resultId = idTransform.safeParse(req.params.id)

        if (resultId.error) {
            res.status(400).json(resultId.error.issues)
            return
        }

        const id = resultId.data
        
        const alojamiento = this.alojamientoService.findById(id);
        if (!alojamiento) {
            res.status(404).json({
                error: "No existe un alojamiento con ese ID."
            })
            return
        }
        res.status(200).json(alojamiento);
    }

    eliminar(req, res) {
        const resultId = idTransform.safeParse(req.params.id)

        if (resultId.error) {
            res.status(400).json(resultId.error.issues)
            return
        }

        const id = resultId.data

        const alojamientoEliminado = this.alojamientoService.eliminar(id);
        if (!alojamientoEliminado) {
            res.status(404).json({
                error: "No existe el alojamiento que se intenta eliminar con ese ID."
            })
            return
        }

        res.status(200).json(alojamientoEliminado);
    }

    actualizar(req, res) {
        const resultId = idTransform.safeParse(req.params.id)

        if (resultId.error) {
            res.status(400).json(resultId.error.issues)
            return
        }

        const id = resultId.data

        const body = req.body
        const resultBody = alojamientoSchema.safeParse(body)

        const alojamientoActualizado = this.alojamientoService.actualizar(id, resultBody.data);

        if (!alojamientoActualizado) {
            res.status(404).json({
                error: "No existe el alojamiento que se intenta eliminar con ese ID."
            })
            return
        }

        res.json(alojamientoActualizado);
    }
}

const idTransform = z.string().transform(((val, ctx)  => {
    const num = Number(val);
    if (isNaN(num)) {
        ctx.addIssue({
            code: "INVALID_ID",
            message: "id must be a number"
        });
        return z.NEVER;
    }
    return num;
}))

const alojamientoSchema = z.object({
    nombre: z.string().min(3).max(20),
    categoria: z.string(),
    precioPorNoche: z.number().nonnegative()
})