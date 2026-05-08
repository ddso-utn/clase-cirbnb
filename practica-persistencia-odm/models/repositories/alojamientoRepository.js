import { AlojamientoModel } from "../../schemas/alojamientoSchema.js";
import { ReservaModel } from "../../schemas/reservaSchema.js"; 

export class AlojamientoRepository {
    
    //Este es el modelo que previamente dijimos que lo usabamos en node
    constructor() {
        this.model = AlojamientoModel;
    }


    async findAll() {
        return await this.model.find({eliminado: false});  //.find({ eliminado: false }) para el caso de baja logica
        //ver en mogoose lo de paginado
    }

    //AGREGAR ALGO CON AGREGACION

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

    async findById(id) {
        return await this.model.findById(id);
    }

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
        //CONTAR LO DEL DELETE LOGICO con una marca que sea removed y controlar eso despues
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

    //AGREGAR CONCEPTO DE SESION

    //ENTIDADES, CONTROLLER, SERVICE PELADO, RUTAS, TODO HECHO
    


    //-------------- EXTRA
    //GET ALL PAGINAO
    async findAllPaginated(page = 1, limit = 5) {
        //cuantos documentos hay que saltar
        const skip = (page - 1) * limit

        const alojamientos =
            await this.model
                .find() //.find({ eliminado: false })

                .skip(skip)
                .limit(limit)

        const total =
            await this.model.countDocuments({
                //eliminado: false
            })

        return {
            alojamientos,
            total,
            page,
            // por ejemplo para 23 con x por pagina -> 4.6 necesito 5 paginas la ultima no completa
            totalPages: Math.ceil(total / limit)
        }
    }

    //SOFT DELETE
    async softDelete(id) {
        return await this.model.findByIdAndUpdate( id,
                {
                    eliminado: true
                },
                {
                    new: true //ESTO LE DICE A MONGOOSE DAME EL DOCU ACTUALIZADO
                }
            )
    }
}