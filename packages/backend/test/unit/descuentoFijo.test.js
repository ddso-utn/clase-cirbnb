import { ValorNegativoError } from "../../errors/ValorNegativoError.js";
import { DescuentoFijo } from "../../models/entities/descuentos/descuentoFijo.js";

describe("DescuentoFijo valorDescontado", () => {
  test("Devuelve el valor fijo pasado por constructor", () => {
    const d = new DescuentoFijo(100); // Preparacion
    const valor = d.valorDescontado(0, 0); // Ejecucion
    expect(valor).toBe(100); // Resultado
  });

  test("No se deben poder instanciar descuentos con valor negativo", () => {
    expect(() => new DescuentoFijo(-1)).toThrow(ValorNegativoError);
  });

  test("Se deben poder instanciar descuentos con valor 0", () => {
    const d = new DescuentoFijo(0); // Preparacion
    const valor = d.valorDescontado(0, 0); // Ejecucion
    expect(valor).toBe(0); // Resultado
  });
});
