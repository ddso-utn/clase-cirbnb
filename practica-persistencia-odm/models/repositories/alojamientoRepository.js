import { AlojamientoModel } from "../../schemas/alojamientoSchema.js";
import { ReservaModel } from "../../schemas/reservaSchema.js"; 

export class AlojamientoRepository {
    //-----------------editar en vivo 3
    
    //Este es el modelo que previamente dijimos que lo usabamos en node
    constructor() {
        this.model = AlojamientoModel;
    }
    
    async findAll() {
        return await this.model.find();
    }

    
    //-----------------editar en vivo 11
    async findAll() {
        const alojamientos = await this.model.find();
        //Para cada alojamiento, cargamos sus reservas
        for (const alojamiento of alojamientos) {
            const reservas = await ReservaModel.find({ alojamiento: alojamiento._id });
            alojamiento.reservas = reservas;
        }
        return alojamientos;
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findByName(nombre) {
        return await this.model.findOne({ nombre });
    }


    //ejemplo de operadores
    //Para filtrar resultados según condiciones numéricas.
    //Por ejemplo, mostrar solo alojamientos más caros que un precio dado.
    async findByMinPrice(minPrice) {
        return await this.model.find({ precioPorNoche: { $gt: minPrice } });
    }
    async findByPriceRange(min, max) {
    return await this.model.find({
        precioPorNoche: { $gt: min, $lt: max }
    });
}


    //forma1
    async save(alojamiento) {
        const nuevoAlojamiento = new this.model(alojamiento);
        return await nuevoAlojamiento.save();
    }
    async update(id, alojamientoModificado) {
        return await this.model.findByIdAndUpdate(id, alojamientoModificado, { new: true });
    }
    //forma2
    async save(alojamiento) {
    if (alojamiento.id || alojamiento._id) {
        // Si tiene id, actualiza el alojamiento existente
        const alojamientoActualizado = await this.model.findByIdAndUpdate(
            alojamiento.id || alojamiento._id,
            alojamiento,
            { new: true, runValidators: true } // retorna el nuevo y runValidators asegura que las validaciones del schema se apliquen
        );

        // ACA tenemos que inicializar las cosas que no persistimos en la base como por ej las reservas
        

        return alojamientoActualizado;
    } else {
        // Si no tiene id, crea un nuevo alojamiento
        const nuevoAlojamiento = new this.model(alojamiento); //estamos haciendo un nuevo documento instanciado con el esquema q definimos
        const alojamientoGuardado = await nuevoAlojamiento.save(); //aca es la instancia q tenemos en la base de datos
        alojamientoGuardado.reservas = []; // Inicializa el array de reservas como vacío
        return alojamientoGuardado;
    }
    }



    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    // Métodos auxiliares (opcional)
    async alojamientoMasCaro() {
        return await this.model.findOne().sort({ precioPorNoche: -1 });
    }



    //TODO ESTO VUELA
    /*
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
        */
}