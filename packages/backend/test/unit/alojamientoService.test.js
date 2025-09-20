import { Alojamiento } from "../../models/entities/alojamiento";
import { Categoria } from "../../models/entities/categoria.js";
import { AlojamientoService } from "../../services/alojamientoService.js";
import { jest } from "@jest/globals";

describe("AlojamientoService.buscarTodos", () => {
  const mockRepo = {
    findByPage: jest.fn(),
    contarTodos: jest.fn(),
  };

  const alojamientoService = new AlojamientoService(mockRepo);

  test("Estructura de paginacion default", async () => {
    // preparacion
    const sampleData = [
      new Alojamiento("Hotel1", 100, Categoria.Hotel),
      new Alojamiento("Hotel2", 100, Categoria.Hotel),
      new Alojamiento("Hotel3", 100, Categoria.Hotel),
    ];

    mockRepo.findByPage.mockResolvedValue(sampleData);

    mockRepo.contarTodos.mockResolvedValue(10);

    // ejecucion
    const resultado = await alojamientoService.buscarTodos(2, 3, {});

    //comparacion de resultados
    expect(mockRepo.findByPage).toHaveBeenCalledWith(2, 3, {});
    expect(mockRepo.contarTodos).toHaveBeenCalled();

    expect(resultado).toEqual({
      pagina: 2,
      perPage: 3,
      total: 10,
      totalPaginas: Math.ceil(10 / 3),
      data: sampleData,
    });
  });

  test("Estructura de paginacion default", async () => {
    // preparacion
    const sampleData = [
      new Alojamiento("Hotel1", 100, Categoria.Hotel),
      new Alojamiento("Hotel2", 100, Categoria.Hotel),
      new Alojamiento("Hotel3", 100, Categoria.Hotel),
    ];

    mockRepo.findByPage.mockResolvedValue(sampleData);

    mockRepo.contarTodos.mockResolvedValue(10);

    // ejecucion
    const resultado = await alojamientoService.buscarTodos("2", "3", {});

    //comparacion de resultados
    expect(mockRepo.findByPage).toHaveBeenCalledWith(2, 3, {});
    expect(mockRepo.contarTodos).toHaveBeenCalled();

    expect(resultado).toEqual({
      pagina: 2,
      perPage: 3,
      total: 10,
      totalPaginas: Math.ceil(10 / 3),
      data: sampleData,
    });
  });

  test("Estructura de paginacion default", async () => {
    // preparacion
    const sampleData = [
      new Alojamiento("Hotel1", 100, Categoria.Hotel),
      new Alojamiento("Hotel2", 100, Categoria.Hotel),
      new Alojamiento("Hotel3", 100, Categoria.Hotel),
    ];

    mockRepo.findByPage.mockResolvedValue(sampleData);

    mockRepo.contarTodos.mockResolvedValue(500);

    // ejecucion
    const resultado = await alojamientoService.buscarTodos(-1, 600, {});

    //comparacion de resultados
    expect(mockRepo.findByPage).toHaveBeenCalledWith(1, 100, {});
    expect(mockRepo.contarTodos).toHaveBeenCalled();

    expect(resultado).toEqual({
      pagina: 1,
      perPage: 100,
      total: 500,
      totalPaginas: Math.ceil(500 / 100),
      data: sampleData,
    });
  });
});
