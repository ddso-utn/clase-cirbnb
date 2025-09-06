export class DescuentoFijo {
  constructor(valor) {
    this.valor = valor;
  }

  valorDescontado(precioBase, cantidad) {
    return this.valor;
  }
}