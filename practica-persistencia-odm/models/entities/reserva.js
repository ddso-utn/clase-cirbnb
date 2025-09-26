export class Reserva {
  
  //-----------------editar en vivo 4
  id
  diaInicio
  diaFin
  nombreHuesped
  //Relacion bidireccional
  alojamiento = null


  constructor(diaInicio, diaFin, nombreHuesped) {
    this.diaInicio = diaInicio;
    this.diaFin = diaFin;
    this.nombreHuesped = nombreHuesped;
  }

  setAlojamiento(alojamiento) {
    this.alojamiento = alojamiento;  
  }


  //TODO prueba con este metodo para ver con el objeto
  cantidadNoches() {
    const msPorDia = 1000 * 60 * 60 * 24;
    return Math.ceil((this.diaFin - this.diaInicio) / msPorDia);
  }


  /*
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
  }
*/

}