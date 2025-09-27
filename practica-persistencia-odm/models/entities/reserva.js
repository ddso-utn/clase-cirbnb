export class Reserva {
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


  cantidadNoches() {
    const msPorDia = 1000 * 60 * 60 * 24;
    return Math.ceil((this.diaFin - this.diaInicio) / msPorDia);
  }


}