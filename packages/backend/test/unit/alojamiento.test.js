import { Alojamiento } from "../../models/entities/alojamiento.js";
import { Reserva } from "../../models/entities/reserva.js";
import { Categoria } from "../../models/entities/categoria.js";

describe("Alojamiento.tieneConflictoConFechas", () => {
  const alojamientoBase = () => {
    return new Alojamiento("Hotel", 100, Categoria.Hotel);
  };
  test("Sin reservas retorna false", () => {
    const a = alojamientoBase();
    expect(
      a.tieneConflictoConFechas(new Date("2025-09-22"), new Date("2025-09-30"))
    ).toBe(false);
  });

  test("Reserva previa, no hay conflicto", () => {
    const a = alojamientoBase();
    const r = new Reserva(a, new Date("2025-09-22"), new Date("2025-09-30"));
    a.agregarReserva(r);

    expect(
      a.tieneConflictoConFechas(new Date("2025-10-22"), new Date("2025-10-30"))
    ).toBe(false);
  });

  test("Fecha de inicio de la nueva reserva es previa a fecha de fin de una reserva previa", () => {
    const a = alojamientoBase();
    const r = new Reserva(a, new Date("2025-09-22"), new Date("2025-09-30"));
    a.agregarReserva(r);

    expect(
      a.tieneConflictoConFechas(new Date("2025-09-25"), new Date("2025-10-05"))
    ).toBe(true);
  });

  test("Fecha de fin de la nueva reserva es posterior a fecha de inicio de una reserva previa", () => {
    const a = alojamientoBase();
    const r = new Reserva(a, new Date("2025-09-22"), new Date("2025-09-30"));
    a.agregarReserva(r);

    expect(
      a.tieneConflictoConFechas(new Date("2025-09-10"), new Date("2025-09-25"))
    ).toBe(true);
  });

  test("Fechas de nueva reserva totalmente dentro del rango de una reserva previa", () => {
    const a = alojamientoBase();
    const r = new Reserva(a, new Date("2025-09-22"), new Date("2025-09-30"));
    a.agregarReserva(r);

    expect(
      a.tieneConflictoConFechas(new Date("2025-09-25"), new Date("2025-09-27"))
    ).toBe(true);
  });
});
