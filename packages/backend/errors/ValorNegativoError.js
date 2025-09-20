export class ValorNegativoError extends Error {
  constructor() {
    super();
    this.message = "El valor de un descuento no puede ser negativo.";
  }
}
