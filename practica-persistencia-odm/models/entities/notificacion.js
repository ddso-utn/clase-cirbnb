class Notificacion {
  constructor(id, titulo, mensaje, estado = "NO_LEIDA") {
    this.id = id;
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.estado = estado;
  }

  marcarComoLeida() {
    this.estado = "LEIDA";
  }

  estaLeida() {
    return this.estado === "LEIDA";
  }
}

export default Notificacion;
