import { Alojamiento } from "../models/entities/alojamiento.js";

export class AlojamientoService {
  constructor(alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository;
  }

  async buscarTodos(page, limit, filtros) {
    const numeroPagina = Math.max(Number(page), 1);
    const elementosXPagina = Math.min(Math.max(Number(limit), 1), 100);

    const alojamientos = await this.alojamientoRepository.findByPage(
      numeroPagina,
      elementosXPagina,
      filtros
    );

    const total = await this.alojamientoRepository.contarTodos();
    const totalPaginas = Math.ceil(total / elementosXPagina);

    return {
      pagina: numeroPagina,
      perPage: elementosXPagina,
      total: total,
      totalPaginas: totalPaginas,
      data: alojamientos,
    };
  }

  async crear(nuevoAlojamientoJSON) {
    const nuevoAlojamiento = new Alojamiento(
      nuevoAlojamientoJSON.nombre,
      nuevoAlojamientoJSON.precioPorNoche,
      nuevoAlojamientoJSON.categoria
    );

    const alojamientoGuardado =
      await this.alojamientoRepository.crear(nuevoAlojamiento);

    return alojamientoGuardado;
  }

  async findById(id) {
    const alojamiento = await this.alojamientoRepository.findById(id);
    return alojamiento;
  }

  async eliminar(id) {
    const alojamientoEliminado = await this.alojamientoRepository.eliminar(id);
    return alojamientoEliminado;
  }

  async actualizar(id, alojamientoActualizadoJSON) {
    const alojamientoGuardado = await this.alojamientoRepository.actualizar(
      id,
      alojamientoActualizadoJSON
    );
    return alojamientoGuardado;
  }
}
