import mongoose from "mongoose";
import { Reserva } from "../models/entities/reserva.js";

//-----------------editar en vivo 5

const ReservaSchema = new mongoose.Schema({
  diaInicio: {
    type: Date,
    required: true
  },
  diaFin: {
    type: Date,
    required: true
  },
  nombreHuesped: {
    type: String,
    required: true,
    trim: true,
    validate: {
            validator: function(v) {
                return v.length >= 3;
            },
            message: 'El nombre debe tener al menos 3 caracteres'
        }
  },
  alojamiento: {
    //Aca asociamodos la reserva con un alojamiento con la REFERENCIA, no como embebido
    //SI EMBEBO DEBO LLAMAR AL ESQUEMA DEL ALOJAMENTO O ARMARLO ACA Y PASARLO ENTERO POR POSTMAN
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alojamiento", // Nombre del modelo al que se refiere que debe coincidir con el de alojamientoSchema.js
    required: false // Puedes poner true si siempre debe estar asociado
  }
}, {
  timestamps: true,
  //collection: "reservas" aca lo dejamos para ver como lo crea
});

//Si queremos popular solo ciertos campos del alojamiento
ReservaSchema.pre(/^find/, function(next) {
  this.populate('alojamiento', 'nombre');
  next();
});

// Validación personalizada para fechas
ReservaSchema.pre("validate", function(next) {
  if (this.diaInicio >= this.diaFin) {
    return next(new Error("La fecha de inicio debe ser previa a la de fin"));
  }
  next();
});


ReservaSchema.loadClass(Reserva);

export const ReservaModel = mongoose.model("Reserva", ReservaSchema);