class NotificacionController {
  constructor(notificacionService) {
    this.notificacionService = notificacionService;
  }

  async obtenerUltimaNotificacionNoLeida(req, res, next) {
    try {
      const notificacion = await this.notificacionService.obtenerUltimaNotificacionNoLeida();

      if (!notificacion) {
        return res.status(204).send();
      }

      return res.status(200).json(notificacion);
    } catch (error) {
      next(error);
    }
  }

  async crearNotificacion(req, res, next) {
    try {
      const nuevaNotificacion = await this.notificacionService.crearNotificacion(req.body);
      return res.status(201).json(nuevaNotificacion);
    } catch (error) {
      next(error);
    }
  }
}

export default NotificacionController;
