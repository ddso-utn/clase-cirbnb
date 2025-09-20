import { ValorNegativoError } from "../../../errors/ValorNegativoError.js";

export class DescuentoFijo {
  constructor(valor) {
    if (valor < 0) {
      throw new ValorNegativoError();
    }
    this.valor = valor;
  }

  valorDescontado(_precioBase, _cantidad) {
    return this.valor;
  }
}
