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
    //ESTO NO PONERLO AL PRINCIPIO
    eliminado: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
    //versionKey: false,
    collection: 'alojamientos'
});

/* ESTO PARA Q NO SEA VEA EL VERSIONKEY
alojamientoSchema.set('toJSON', {
   versionKey: false
});
*/


alojamientoSchema.loadClass(Alojamiento);

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);