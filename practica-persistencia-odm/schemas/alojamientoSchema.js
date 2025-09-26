import mongoose from 'mongoose';
import { Alojamiento } from '../models/entities/alojamiento.js';


//-----------------editar en vivo 2
const alojamientoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precioPorNoche: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true,
    collection: 'alojamientos' // Nombre de la colección en MongoDB -> por defecto es el plural
});

// Vincular la clase Alojamiento con el schema
alojamientoSchema.loadClass(Alojamiento);

// Este modelo es el que usaremos para interactuar con la colección de alojamientos en la base de datos desde node
export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);