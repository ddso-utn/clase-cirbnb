import mongoose from "mongoose";
import { Reserva } from "../models/entities/reserva.js";

const ReservaSchema = new mongoose.Schema({
    diaInicio:{
        type: Date,
        required: true
    }
    ,diaFin:{
        type: Date,
        required: true
    }
    ,nombreHuesped:{
        type: String,
        required: true,
        trim:true,
        validate:{
            validator: function(v){
                return v && v.length >= 3;
            },
            message: 'El nombre del huésped debe tener al menos 3 caracteres.'
        }
    }
    ,alojamiento:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alojamiento',
        required: false
    },
    },{
    timestamps: true,
         
});

ReservaSchema.pre(/^find/, function(next) {
    this.populate('alojamiento', '');
    next();
});


ReservaSchema.loadClass(Reserva);

export const ReservaModel = mongoose.model('Reserva', ReservaSchema);
