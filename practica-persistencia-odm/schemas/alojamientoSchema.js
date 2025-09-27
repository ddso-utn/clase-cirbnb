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
    }
},{
    timestamps: true,
    collection: 'alojamientos'
});


alojamientoSchema.loadClass(Alojamiento);

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);