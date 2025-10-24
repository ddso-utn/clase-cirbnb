import Notificacion from "../models/entities/notificacion.js";
import { ValidationError } from "../error/appError.js";

class NotificacionService {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  toDTO(notificacion) {
    return {
      id: notificacion.id?._id || notificacion.id,
      titulo: notificacion.titulo,
      mensaje: notificacion.mensaje,
      estado: notificacion.estado,
    };
  }

  async obtenerNotificacionesNoLeidas() {
    const notificacionesNoLeidas = await this.notificacionRepository.findByEstado("NO_LEIDA");

    const notificacionesDTO = notificacionesNoLeidas.map((n) => this.toDTO(n));

    const promesasActualizacion = notificacionesNoLeidas.map(async (notificacion) => {
      notificacion.marcarComoLeida();
      await this.notificacionRepository.save(notificacion);
    });

    await Promise.all(promesasActualizacion);

    return notificacionesDTO;
  }

  async crearNotificacion(datos) {
    if (!datos.titulo || datos.titulo.trim().length < 3) {
      throw new ValidationError("El título debe tener al menos 3 caracteres");
    }

    if (datos.titulo.trim().length > 50) {
      throw new ValidationError("El título no puede exceder 50 caracteres");
    }

    if (!datos.mensaje || datos.mensaje.trim().length < 3) {
      throw new ValidationError("El mensaje debe tener al menos 3 caracteres");
    }

    if (datos.mensaje.trim().length > 500) {
      throw new ValidationError("El mensaje no puede exceder 500 caracteres");
    }

    const nuevaNotificacion = new Notificacion(
      null,
      datos.titulo.trim(),
      datos.mensaje.trim(),
      "NO_LEIDA"
    );

    const notificacionGuardada = await this.notificacionRepository.save(nuevaNotificacion);
    return this.toDTO(notificacionGuardada);
  }
}

export default NotificacionService;
