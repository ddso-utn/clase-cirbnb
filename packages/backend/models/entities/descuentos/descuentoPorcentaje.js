export class DescuentoPorcentaje {
  constructor(porcentaje) {
    // Recibe por ejemplo, 10
    this.porcentaje = porcentaje;
  }

  valorDescontado(precioBase, cantidad) {
    return precioBase * (this.porcentaje / 100);
  }
}

