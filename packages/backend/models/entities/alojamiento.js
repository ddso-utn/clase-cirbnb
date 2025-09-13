import { z } from "zod"
export class Alojamiento {
  constructor(nombre, precioPorNoche, categoria) {
    z.object({
      nombre: z.string().min(3).max(20),
      categoria: z.string(),
      precioPorNoche: z.number().nonnegative()
    })
    
    this.nombre = nombre;
    this.precioPorNoche = precioPorNoche;
    this.categoria = categoria;
    this.reservas = [];
    this.caracteristicas = [];
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

  agregarCaracteristica(caracteristica) {
    this.caracteristicas.push(caracteristica);
  }

  obtenerTotalReservas(reservas) {
  return reservas.reduce((previo, reserva) => {
    return previo + reserva.precioFinal();
  }, 0);
}
}