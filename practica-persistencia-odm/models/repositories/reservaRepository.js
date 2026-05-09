import { ReservaModel } from "../../schemas/reservaSchema.js";

export class ReservaRepository {
    constructor() {
        this.model = ReservaModel;
    }

    async findAll() {
        return await this.model.find().populate('alojamiento'); //RECORDAR QUE SIN EL POPULATE PUEDE USAR EL MIDDLEWARE DEL SCHEMA O RERTORNAR EL ID EN VEZ DEL OBJETO
    }


    async findByFilters(filtros = {}) {
        return await this.model.find(filtros).populate('alojamiento');
    }

    async findById(id) {
        return await this.model.findById(id).populate('alojamiento');
    }

    async findByNombreHuesped(nombreHuesped) {
        return await this.model.findOne({ nombreHuesped: nombreHuesped }).populate('alojamiento');
    }

    async save(reserva) {
        //Si tiene id es update, si no es create
        const query = reserva.id ? { _id: reserva.id } : { _id: new this.model()._id };
        
        //Busca una reserva con ese _id y la actualiza con los datos de reserva.
        //Si no existe, la crea (por upsert: true).
        return await this.model.findOneAndUpdate(
            query,
            reserva,
            { 
                new: true, 
                runValidators: true,
                upsert: true
            }
        ).populate('alojamiento');
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id).populate('alojamiento');
    }




    async reservasPorAlojamiento() {

    // aggregate() inicia un PIPELINE DE AGREGACIÓN.
    // Permite procesar datos mediante etapas de transformación llamadas pipeline.
    // La agregación en MongoDB funciona parecido a una línea de producción:
    // Cada objeto dentro del array [] es una ETAPA.
    // Los datos van pasando por cada etapa y transformándose.

    return await this.model.aggregate([
        // $group sirve para AGRUPAR documentos.
        // Es parecido al GROUP BY de SQL.
        // Ejemplo:
        // Reserva 1 -> alojamiento A
        // Reserva 2 -> alojamiento A
        // Reserva 3 -> alojamiento B
        // Resultado:
        // alojamiento A -> 2 reservas
        // alojamiento B -> 1 reserva
        {
            $group: {

                // _id es la "clave de agrupación".
                // "$alojamiento" significa: "agrupá por el valor del campo alojamiento"
                // "$: estoy leyendo un campo del documento"
                // IMPORTANTE:
                // Este _id NO es el _id original del documento.
                // En $group, _id representa:
                // "el criterio por el cual agrupo"
                // Entonces: _id = ObjectId del alojamiento

                _id: "$alojamiento",

                // totalReservas será un nuevo campo.
                // $sum: 1 significa: "sumá 1 por cada documento del grupo"
                // Es decir cuenta cuántas reservas hay.
                totalReservas: {
                    $sum: 1
                }
            }
        },

        // $lookup sirve para relacionar colecciones.
        // Es parecido a un JOIN en SQL.
        // Hasta ahora tenemos algo así:
        // {
        //    _id: ObjectId("123"),
        //    totalReservas: 5
        // }
        // Pero queremos el nombre del alojamiento.
        // Entonces buscamos el alojamiento completo
        // en la colección "alojamientos".
        //
        {
            $lookup: {

                // from: colección donde vamos a buscar.
                // OJO: Acá va el nombre REAL de la colección en MongoDB.
                // NO el nombre del modelo.
                from: "alojamientos",
                // localField: campo del documento ACTUAL.
                // Actualmente el _id contiene el ObjectId del alojamiento.
                localField: "_id",
                // foreignField: campo de la colección externa con el que queremos comparar.
                // En alojamientos buscamos:
                // alojamiento._id == _id actual
                foreignField: "_id",
                // as: nombre del nuevo campo donde se guardará el resultado.
                // IMPORTANTE: $lookup SIEMPRE devuelve un ARRAY. Aunque encuentre un solo documento.
                // Resultado:
                // {
                //   _id: ObjectId(...),
                //   totalReservas: 5,
                //   alojamiento: [
                //      {nombre: "Hotel Plaza"}
                //   ]
                // }
                //
                as: "alojamiento"
            }
        },
        // $unwind rompe/desarma arrays.
        // Como $lookup devuelve un array:
        // alojamiento: [ {...} ]
        // queremos convertirlo en:
        // alojamiento: { ... }
        // O sea: sacar el objeto del array.
        {
            $unwind: "$alojamiento"
        },
        // $project sirve para:
        // - elegir qué campos mostrar
        // - renombrar campos
        // - ocultar campos
        // - transformar salida
        {
            $project: {
                // _id: 0 significa: NO mostrar _id
                _id: 0,
                // Creamos un nuevo campo llamado "alojamiento" y le asignamos: alojamiento.nombre
                // El símbolo $ indica: "leer este campo"
                alojamiento: "$alojamiento.nombre",
                // totalReservas: 1 significa: incluir el campo totalReservas.
                totalReservas: 1
            }
        }
    ])
}




}