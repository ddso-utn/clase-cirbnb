import mongoose from 'mongoose';
import { Alojamiento } from '../models/entities/alojamiento.js';

const alojamientoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim:true
    },
    precioPorNoche:{
        type: Number,
        required: true,
        min: 0
    },
    //ESTO ES PARA EL SOFT DELETE
    eliminado: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
    //versionKey: false,
    collection: 'alojamientos'
});

/* ESTO PARA Q NO SEA VEA EL VERSIONKEY EN LOS POPULATE 
alojamientoSchema.set('toJSON', {
   versionKey: false
});
*/

//CARGAMOS EL ESQUEMA ALOJAMIENTO (MONGOOSE) A LA ENTIDAD ALOJAMIENTO (NUESTRO DOMINIO)
alojamientoSchema.loadClass(Alojamiento);

//EXPORTAMOS EL MODELO MONGOOSE QUE SE USARA CORRESPONDIENTE AL ESQUEMA
export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);