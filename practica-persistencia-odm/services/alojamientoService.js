import {Alojamiento} from "../models/entities/alojamiento.js"

export class AlojamientoService {
    
    constructor(alojamientoRepository) {
        this.alojamientoRepository = alojamientoRepository
    }

    //Aca como mas nos guste podemos transformar el objeto a un DTO
    toDTO(alojamiento) {
        return {
            id: alojamiento.id || alojamiento._id, //validacion de if default de mongo
            nombre: alojamiento.nombre,
            //precioPorNoche: alojamiento.precioPorNoche,
        };
    }

    async findAll() {
        const alojamientos = await this.alojamientoRepository.findAll();
        return alojamientos.map(a => this.toDTO(a));
    }

    async create(data) {
        const { nombre, precioPorNoche } = data;

        if (!nombre || !precioPorNoche) {
            throw new ValidationError('Nombre y precioPorNoche son requeridos');
        }

        const existente = await this.alojamientoRepository.findByName(nombre);
        if (existente) {
            throw new ConflictError(`Ya existe un alojamiento con el nombre ${nombre}`);
        }

        const nuevo = new Alojamiento(nombre, precioPorNoche);
        const alojamientoGuardado = await this.alojamientoRepository.save(nuevo);
        return this.toDTO(alojamientoGuardado);
    }

    async findById(id) {
        const alojamiento = await this.alojamientoRepository.findById(id);
        if (!alojamiento) {
            throw new NotFoundError("Alojamiento no encontrado");
        }
        return this.toDTO(alojamiento);
    }

    async update(id, data) {
        const alojamiento = await this.alojamientoRepository.findById(id);
        if (!alojamiento) {
            throw new NotFoundError("Alojamiento no encontrado");
        }

        if (data.nombre !== undefined) alojamiento.nombre = data.nombre;
        if (data.precioPorNoche !== undefined) alojamiento.precioPorNoche = data.precioPorNoche;

        const actualizado = await this.alojamientoRepository.save(alojamiento);
        return this.toDTO(actualizado);
    }

    async delete(id) {
        const alojamiento = await this.alojamientoRepository.findById(id);
        if (!alojamiento) {
            throw new NotFoundError("Alojamiento no encontrado");
        }
        await this.alojamientoRepository.delete(id);
        return this.toDTO(alojamiento);
    }
}