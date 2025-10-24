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
            descripcion: alojamiento.descripcion,
            ubicacion: alojamiento.ubicacion,
            puntaje: alojamiento.puntaje,
            precio: alojamiento.precio,
            imagen: alojamiento.imagen,
        };
    }

    async findAll() {
        const alojamientos = await this.alojamientoRepository.findAll();
        return alojamientos.map(a => this.toDTO(a));
    }

    async findAllPaginated(page = 1, limit = 10, filters = {}) {
        // Validate and sanitize pagination params
        page = Math.max(1, parseInt(page) || 1);
        limit = Math.min(100, Math.max(1, parseInt(limit) || 10));

        const result = await this.alojamientoRepository.findPaginated(page, limit, filters);

        const totalPaginas = Math.ceil(result.total / limit);

        return {
            pagina: page,
            perPage: limit,
            total: result.total,
            totalPaginas,
            data: result.data.map(a => this.toDTO(a))
        };
    }

    async create(data) {
        const { nombre, descripcion, ubicacion, puntaje, precio, imagen } = data;

        if (!nombre || !descripcion || !ubicacion || puntaje === undefined || !precio || !imagen) {
            throw new ValidationError('Todos los campos son requeridos: nombre, descripcion, ubicacion, puntaje, precio, imagen');
        }

        const existente = await this.alojamientoRepository.findByName(nombre);
        if (existente) {
            throw new ConflictError(`Ya existe un alojamiento con el nombre ${nombre}`);
        }

        const nuevo = new Alojamiento(nombre, descripcion, ubicacion, puntaje, precio, imagen);
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
        if (data.descripcion !== undefined) alojamiento.descripcion = data.descripcion;
        if (data.ubicacion !== undefined) alojamiento.ubicacion = data.ubicacion;
        if (data.puntaje !== undefined) alojamiento.puntaje = data.puntaje;
        if (data.precio !== undefined) alojamiento.precio = data.precio;
        if (data.imagen !== undefined) alojamiento.imagen = data.imagen;

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