export class AlojamientoDoesNotExist extends Error {
  constructor(id) {
    super();
    this.message = "Alojamiento con id: " + id + " no existe.";
  }
}
