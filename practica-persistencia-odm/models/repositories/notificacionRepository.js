import NotificacionSchema from "../../schemas/notificacionSchema.js";
import Notificacion from "../entities/notificacion.js";

class NotificacionRepository {
  async findAll() {
    const notificaciones = await NotificacionSchema.find();
    return notificaciones.map(
      (n) => new Notificacion(n._id, n.titulo, n.mensaje, n.estado)
    );
  }

  async findById(id) {
    const notificacion = await NotificacionSchema.findById(id);
    if (!notificacion) return null;
    return new Notificacion(
      notificacion._id,
      notificacion.titulo,
      notificacion.mensaje,
      notificacion.estado
    );
  }

  async findByEstado(estado) {
    const notificaciones = await NotificacionSchema.find({ estado });
    return notificaciones.map(
      (n) => new Notificacion(n._id, n.titulo, n.mensaje, n.estado)
    );
  }

  async save(notificacion) {
    let notificacionGuardada;

    if (notificacion.id) {
      notificacionGuardada = await NotificacionSchema.findByIdAndUpdate(
        notificacion.id,
        {
          titulo: notificacion.titulo,
          mensaje: notificacion.mensaje,
          estado: notificacion.estado,
        },
        { new: true, runValidators: true }
      );
    } else {
      const nuevaNotificacion = new NotificacionSchema({
        titulo: notificacion.titulo,
        mensaje: notificacion.mensaje,
        estado: notificacion.estado,
      });
      notificacionGuardada = await nuevaNotificacion.save();
    }

    return new Notificacion(
      notificacionGuardada._id,
      notificacionGuardada.titulo,
      notificacionGuardada.mensaje,
      notificacionGuardada.estado
    );
  }

  async delete(id) {
    const result = await NotificacionSchema.findByIdAndDelete(id);
    return result !== null;
  }
}

export default NotificacionRepository;
