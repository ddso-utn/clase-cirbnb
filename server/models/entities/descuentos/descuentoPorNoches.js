export class DescuentoPorNoches {
  constructor(cantidadMinima, porcentaje) {
    this.cantidadMinima = cantidadMinima;
    this.porcentaje = porcentaje;
  }

  valorDescontado(precioBase, cantidad) {
    const vecesRepetido = Math.floor(cantidad / this.cantidadMinima);
    let valorDescontado = 0;
    if (vecesRepetido >= 1) {
      valorDescontado = precioBase * (this.porcentaje / 100) * vecesRepetido;
    }
    return valorDescontado;
  }
}