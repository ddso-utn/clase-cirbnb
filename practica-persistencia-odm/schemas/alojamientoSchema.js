import mongoose from 'mongoose';
import { Alojamiento } from '../models/entities/alojamiento.js';

const alojamientoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim:true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true
    },
    ubicacion:{
        type: String,
        required: true,
        trim: true
    },
    puntaje:{
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    precio:{
        type: Number,
        required: true,
        min: 0
    },
    imagen:{
        type: String,
        required: true
    }
},{
    timestamps: true,
    collection: 'alojamientos'
});


alojamientoSchema.loadClass(Alojamiento);

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);