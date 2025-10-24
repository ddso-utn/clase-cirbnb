import { Schema, model } from "mongoose";

const notificacionSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "El título debe tener al menos 3 caracteres"],
      maxlength: [50, "El título no puede exceder 50 caracteres"],
    },
    mensaje: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "El mensaje debe tener al menos 3 caracteres"],
      maxlength: [500, "El mensaje no puede exceder 500 caracteres"],
    },
    estado: {
      type: String,
      enum: ["LEIDA", "NO_LEIDA"],
      default: "NO_LEIDA",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "notificaciones",
  }
);

const Notificacion = model("Notificacion", notificacionSchema);

export default Notificacion;
