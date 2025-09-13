export class InvalidCategoriaError extends Error {
  constructor(categoria) {
    super();
    this.message = "La categoria " + categoria + " no es válida.";
  }
}
