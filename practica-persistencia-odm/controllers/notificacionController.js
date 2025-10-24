class NotificacionController {
  constructor(notificacionService) {
    this.notificacionService = notificacionService;
  }

  async obtenerNotificacionesNoLeidas(req, res, next) {
    try {
      const notificaciones = await this.notificacionService.obtenerNotificacionesNoLeidas();

      if (notificaciones.length === 0) {
        return res.status(204).send();
      }

      return res.status(200).json(notificaciones);
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
