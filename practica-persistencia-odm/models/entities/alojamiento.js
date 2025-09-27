import { z } from "zod"

export class Alojamiento {
  id
  nombre
  precioPorNoche
  //Aca definimos una relacion bidireccional, pero solo en objetos no lo hacemos persistente
  reservas = [];
  

  constructor(nombre, precioPorNoche) {
    this.nombre = nombre;
    this.precioPorNoche = precioPorNoche;    
  }


  getDescripcion() {
    return `${this.nombre} (${this.categoria}) - ${this.precioPorNoche} por noche`;
  }

  tieneConflictoConFechas(fechaInicio, fechaFin) {
    return this.reservas.some(
      (reserva) => fechaInicio < reserva.diaFin && fechaFin > reserva.diaInicio
    );
  }

  agregarReserva(reserva) {
    this.reservas.push(reserva);
  }

  obtenerTotalReservas(reservas) {
  return reservas.reduce((previo, reserva) => {
    return previo + reserva.precioFinal();
  }, 0);
  }


}