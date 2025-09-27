import { ReservaModel } from "../../schemas/reservaSchema.js";

export class ReservaRepository {
    constructor() {
        this.model = ReservaModel;
    }

    async findAll() {
        return await this.model.find().populate('alojamiento');
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
}