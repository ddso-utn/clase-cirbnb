import {Alojamiento} from "../models/entities/alojamiento.js"

export class AlojamientoService {
    constructor(alojamientoRepository) {
        this.alojamientoRepository = alojamientoRepository
    }

    buscarTodos(page, limit, filtros) {
        const numeroPagina = Math.max(Number(page), 1)
        const elementosXPagina = Math.min(Math.max(Number(limit), 1), 100)

        const alojamientos = this.alojamientoRepository.findByPage(numeroPagina, elementosXPagina, filtros)
        
        const total = this.alojamientoRepository.contarTodos();
        const totalPaginas = Math.ceil(total / elementosXPagina)
        
        return {
            pagina: numeroPagina,
            perPage: elementosXPagina,
            total: total, 
            totalPaginas: totalPaginas,
            data: alojamientos
        }
    }

    crear(nuevoAlojamientoJSON) {
        const nuevoAlojamiento = new Alojamiento(
            nuevoAlojamientoJSON.nombre,
            nuevoAlojamientoJSON.precioPorNoche,
            nuevoAlojamientoJSON.categoria
        )

        const alojamientoGuardado = this.alojamientoRepository.crear(nuevoAlojamiento)
        
        return alojamientoGuardado
    }

    findById(id) {
        const alojamiento = this.alojamientoRepository.findById(id)
        return alojamiento
    }

    eliminar(id) {
        const alojamientoEliminado = this.alojamientoRepository.eliminar(id)
        return alojamientoEliminado
    }

    actualizar(id, alojamientoActualizadoJSON) {
        const alojamientoGuardado = this.alojamientoRepository.actualizar(id, alojamientoActualizadoJSON)
        return alojamientoGuardado
    }
}