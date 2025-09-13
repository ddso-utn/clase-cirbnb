import { z } from "zod";
import { AlojamientoDoesNotExist } from "../errors/AlojamientoDoesNotExist.js";
import { Categoria } from "../models/entities/categoria.js";
import { InvalidCategoriaError } from "../errors/InvalidCategoria.js";

export class AlojamientoController {
  constructor(alojamientoService) {
    this.alojamientoService = alojamientoService;
  }

  async buscarTodos(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const filtros = req.query;

    const alojamientosPaginados = await this.alojamientoService.buscarTodos(
      page,
      limit,
      filtros
    );
    if (alojamientosPaginados === null) {
      return res.status(204).send();
    }
    res.status(200).json(alojamientosPaginados);
  }

  async crear(req, res) {
    const body = req.body;
    const resultBody = alojamientoSchema.safeParse(body);

    if (resultBody.error) {
      res.status(400).json(resultBody.error.issues);
      return;
    }

    if (!Object.values(Categoria).includes(resultBody.data.categoria)) {
      throw new InvalidCategoriaError(resultBody.data.categoria);
    }

    const nuevaAlojamiento = await this.alojamientoService.crear(
      resultBody.data
    );
    res.status(201).json(nuevaAlojamiento);
  }

  async findById(req, res) {
    const resultId = idTransform.safeParse(req.params.id);

    if (resultId.error) {
      res.status(400).json(resultId.error.issues);
      return;
    }

    const id = resultId.data;

    const alojamiento = await this.alojamientoService.findById(id);
    if (!alojamiento) {
      throw new AlojamientoDoesNotExist(id);
    }
    res.status(200).json(alojamiento);
  }

  async eliminar(req, res) {
    const resultId = idTransform.safeParse(req.params.id);

    if (resultId.error) {
      res.status(400).json(resultId.error.issues);
      return;
    }

    const id = resultId.data;

    const alojamientoEliminado = await this.alojamientoService.eliminar(id);
    if (!alojamientoEliminado) {
      res.status(404).json({
        error: "No existe el alojamiento que se intenta eliminar con ese ID.",
      });
      return;
    }

    res.status(200).json(alojamientoEliminado);
  }

  async actualizar(req, res) {
    const resultId = idTransform.safeParse(req.params.id);

    if (resultId.error) {
      res.status(400).json(resultId.error.issues);
      return;
    }

    const id = resultId.data;

    const body = req.body;
    const resultBody = alojamientoSchema.safeParse(body);

    const alojamientoActualizado = await this.alojamientoService.actualizar(
      id,
      resultBody.data
    );

    if (!alojamientoActualizado) {
      res.status(404).json({
        error: "No existe el alojamiento que se intenta eliminar con ese ID.",
      });
      return;
    }

    res.json(alojamientoActualizado);
  }
}

const idTransform = z.string().transform((val, ctx) => {
  const num = Number(val);
  if (isNaN(num)) {
    ctx.addIssue({
      code: "INVALID_ID",
      message: "id must be a number",
    });
    return z.NEVER;
  }
  return num;
});

const alojamientoSchema = z.object({
  nombre: z.string().min(3).max(20),
  categoria: z.string(),
  precioPorNoche: z.number().nonnegative(),
});
