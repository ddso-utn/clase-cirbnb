export class AlojamientoRepository {
    constructor() {
        this.alojamientos = [];
        this.nextId = 1;
    }

    findByPage(numeroPagina, elementosXPagina, filtros) {
        const offset = (numeroPagina - 1) * elementosXPagina
        const alojamientos = this.buscarTodos(filtros)
        return alojamientos.slice(offset, offset + elementosXPagina)
    }

    buscarTodos(filtros) {
        const {maxPrice} = filtros
        let alojamientosADevolver = this.alojamientos

        if(maxPrice) {
            alojamientosADevolver = this.precioMenorQue(maxPrice, alojamientosADevolver)
        }

        return alojamientosADevolver
    }

    crear(alojamiento) {
        alojamiento.id = this.nextId++;
        this.alojamientos.push(alojamiento)
        return alojamiento
    }

    findById(id) {
        return this.alojamientos.filter(aloj => aloj.id === id)[0]
    }

    eliminar(id) {
        const indice = this.alojamientos.findIndex(aloj => aloj.id === id)
        if(indice === -1) return null
        const alojamiento = this.alojamientos[indice]
        this.alojamientos.splice(indice, 1)
        return alojamiento
    }

    actualizar(id, alojamientoModificado) {
        const indice = this.alojamientos.findIndex(a => a.id === id);
        if(indice === -1) return null
        const alojamientoActualizado = {
            ...this.alojamientos[indice],
            ...alojamientoModificado
        }
        this.alojamientos[indice] = alojamientoActualizado
        return alojamientoActualizado
    }

    // AUX

    precioMenorQue(precio, alojamientos) {
        return alojamientos.filter(a => a.precioPorNoche < precio)
    }

    alojamientoMasCaro() {
        const listaDePrecios = this.alojamientos.map((a) => {
            return a.precioPorNoche;
        });
        const precioMaximo = Math.max(...listaDePrecios);

        const alojamiento = this.alojamientos.find((a) => {
            return a.precioPorNoche == precioMaximo;
        });

        return alojamiento;
    }

    contarTodos() {
        return this.alojamientos.length
    }
}