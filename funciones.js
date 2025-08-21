function aumentarPrecioDiario(alojamientos, aumento) {
  alojamientos.forEach((a) => {
    a.precioPorNoche = a.precioPorNoche + aumento;
  });
}

function alojamientoMasCaro(alojamientos) {
  const listaDePrecios = alojamientos.map((a) => {
    return a.precioPorNoche;
  });
  const precioMaximo = Math.max(...listaDePrecios);

  const alojamiento = alojamientos.find((a) => {
    return a.precioPorNoche == precioMaximo;
  });

  return alojamiento;
}

function filtrarPorPrecio(alojamientos, precioMaximo) {
  return alojamientos.filter((a) => {
    return a.precioPorNoche <= precioMaximo;
  });
}

function obtenerTotalReservas(reservas) {
  return reservas.reduce((previo, reserva) => {
    return previo + reserva.precioFinal();
  }, 0);
}

function alojamientosConCaracteristicas(alojamientos, caracteristicas) {
  return alojamientos.filter(alojamiento => {
    return caracteristicas.every(caracteristica => {
      return alojamiento.caracteristicas.includes(caracteristica);
    });
  });
}

module.exports = {
  aumentarPrecioDiario,
  alojamientoMasCaro,
  filtrarPorPrecio,
  obtenerTotalReservas,
  alojamientosConCaracteristicas,
};
