import { z } from "zod"

export class Alojamiento {
  id
  nombre
  descripcion
  ubicacion
  puntaje
  precio
  imagen
  //Aca definimos una relacion bidireccional, pero solo en objetos no lo hacemos persistente
  reservas = [];


  constructor(nombre, descripcion, ubicacion, puntaje, precio, imagen) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.ubicacion = ubicacion;
    this.puntaje = puntaje;
    this.precio = precio;
    this.imagen = imagen;
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