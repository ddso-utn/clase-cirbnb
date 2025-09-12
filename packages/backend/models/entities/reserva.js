export class Reserva {
  constructor(alojamiento, diaInicio, diaFin) {
    if (!diaInicio instanceof Date || !diaFin instanceof Date) {
      throw new Error(
        "El Dia de inicio y de fin deben ser una instancia de Date"
      );
    }

    if (diaInicio >= diaFin) {
      throw new Error("La fecha de inicio de be ser previa a la de fin");
    }

    this.alojamiento = alojamiento;
    this.diaInicio = diaInicio;
    this.diaFin = diaFin;
    this.descuentos = [];
  }

  cantidadNoches() {
    const msPorDia = 1000 * 60 * 60 * 24;
    return Math.ceil((this.diaFin - this.diaInicio) / msPorDia);
  }

  precioBase() {
    return this.cantidadNoches() * this.alojamiento.precioPorNoche;
  }

  precioFinal() {
    let base = this.precioBase();
    let totalDescontado = 0;
    for (const desc of this.descuentos) {
      totalDescontado += desc.valorDescontado(base, this.cantidadNoches());
    }
    return Math.max(0, base - totalDescontado);
  }

  agregarDescuento(descuento) {
    this.descuentos.push(descuento);
  }
}