import { AlojamientoModel } from "../../schemas/alojamientoSchema.js";
import { ReservaModel } from "../../schemas/reservaSchema.js"; 

export class AlojamientoRepository {
    
    //Este es el modelo que previamente dijimos que lo usabamos en node
    constructor() {
        this.model = AlojamientoModel;
    }


    async findAll() {
        return await this.model.find();
    }

    /*
    //Si queremos cargar la bireccionalidad 
    async findById(id) {
        const alojamientoSchema = await this.model.find();
        for (let alojamiento of alojamientoSchema) {
            //Si el alojamiento tiene reservas, las cargamos
            if (alojamiento.reservas && alojamiento.reservas.length > 0) {
                alojamiento.reservas = await ReservaModel.find({ alojamiento: alojamiento._id });
                //...
            }
        return await this.model.findById(id);
    }
    */

    async findByName(nombre) {
        return await this.model.findOne({ nombre });
    }

    async save(alojamiento) {
        const nuevoAlojamiento = new this.model(alojamiento);
        return await nuevoAlojamiento.save();
    }
    async update(id, alojamientoModificado) {
        return await this.model.findByIdAndUpdate(id, alojamientoModificado, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async count(){
        return this.model.countDocuments();
    }


    //Ejemplo de operadores
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

    
}