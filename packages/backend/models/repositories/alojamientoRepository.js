import fs from "node:fs/promises";
import path from "node:path";
import { Alojamiento } from "../entities/alojamiento.js";

export class AlojamientoRepository {
  static alojamientoPath = path.join("data", "alojamientos.json");

  async findByPage(numeroPagina, elementosXPagina, filtros) {
    const offset = (numeroPagina - 1) * elementosXPagina;
    const alojamientos = await this.buscarTodos(filtros);
    return alojamientos.slice(offset, offset + elementosXPagina);
  }

  async buscarTodos(filtros) {
    const { maxPrice } = filtros;
    const data = await fs.readFile(AlojamientoRepository.alojamientoPath);

    const dataObjects = await JSON.parse(data);

    let alojamientosADevolver = mapToAlojamientos(dataObjects);

    if (maxPrice) {
      alojamientosADevolver = this.precioMenorQue(
        maxPrice,
        alojamientosADevolver
      );
    }

    return alojamientosADevolver;
  }

  async crear(alojamiento) {
    const alojamientos = await this.buscarTodos({});
    alojamiento.id = alojamientos.length + 1;
    alojamientos.push(alojamiento);
    await fs.writeFile(
      AlojamientoRepository.alojamientoPath,
      JSON.stringify(alojamientos)
    );
    return alojamiento;
  }

  async findById(id) {
    const alojamientos = await this.buscarTodos({});
    return alojamientos.filter((aloj) => aloj.id === id)[0];
  }

  async eliminar(id) {
    const alojamientos = await this.buscarTodos({});
    const indice = alojamientos.findIndex((aloj) => aloj.id === id);
    if (indice === -1) return null;
    const alojamiento = alojamientos[indice];
    alojamientos.splice(indice, 1);
    await fs.writeFile(
      AlojamientoRepository.alojamientoPath,
      JSON.stringify(alojamientos)
    );
    return alojamiento;
  }

  async actualizar(id, alojamientoModificado) {
    const alojamientos = await this.buscarTodos({});
    const indice = alojamientos.findIndex((a) => a.id === id);
    if (indice === -1) return null;
    const alojamientoActualizado = {
      ...alojamientos[indice],
      ...alojamientoModificado,
    };
    alojamientos[indice] = alojamientoActualizado;
    await fs.writeFile(
      AlojamientoRepository.alojamientoPath,
      JSON.stringify(alojamientos)
    );
    return alojamientoActualizado;
  }

  // AUX

  precioMenorQue(precio, alojamientos) {
    return alojamientos.filter((a) => a.precioPorNoche < precio);
  }

  alojamientoMasCaro() {
    const listaDePrecios = this.alojamientos.map((a) => {
      return a.precioPorNoche;
    });
    const precioMaximo = Math.max(...listaDePrecios);

    const alojamiento = this.alojamientos.find((a) => {
      return a.precioPorNoche == precioMaximo;
    });

    return alojamiento;
  }

  async contarTodos() {
    const alojamientos = await this.buscarTodos({});
    return alojamientos.length;
  }
}

function mapToAlojamiento(dataObject) {
  const { nombre, categoria, precioPorNoche } = dataObject;
  const aloj = new Alojamiento(nombre, precioPorNoche, categoria);
  aloj.id = dataObject.id;
  return aloj;
}

function mapToAlojamientos(dataObjects) {
  return dataObjects.map(mapToAlojamiento);
}
