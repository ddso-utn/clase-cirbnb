import { ValidationError, NotFoundError } from "../error/appError.js";

export class ReservaService {
    constructor(reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    toDTO(reserva) {
        return {
            id: reserva.id || reserva._id,
            diaInicio: reserva.diaInicio,
            diaFin: reserva.diaFin,
            nombreHuesped: reserva.nombreHuesped,
            alojamiento: reserva.alojamiento
        };
    }

    async findAll() {
        const reservas = await this.reservaRepository.findAll();
        return reservas.map(r => this.toDTO(r));
    }


    async filtroEjemplo(filtros = {}){
        const reservas = await this.reservaRepository.findByFilters(filtros);
        return reservas.map(r => this.toDTO(r));
    }


    async create(data) {
        const { diaInicio, diaFin, nombreHuesped, alojamiento } = data;
        if (!diaInicio || !diaFin || !nombreHuesped) {
            throw new ValidationError("Todos los campos son requeridos");
        }
        const nueva = { diaInicio, diaFin, nombreHuesped, alojamiento };
        const reservaGuardada = await this.reservaRepository.save(nueva);
        return this.toDTO(reservaGuardada);
    }

    async findById(id) {
        const reserva = await this.reservaRepository.findById(id);
        if (!reserva) {
            throw new NotFoundError("Reserva no encontrada");
        }

        reserva.cantidadNoches(); //Prueba del metodo cantidadNoches porque aca ya tenemos nuestro objeto JS automaticamente.


        return this.toDTO(reserva);
    }

    async update(id, data) {
        const reserva = await this.reservaRepository.findById(id);
        if (!reserva) {
            throw new NotFoundError("Reserva no encontrada");
        }
        if (data.diaInicio !== undefined) reserva.diaInicio = data.diaInicio;
        if (data.diaFin !== undefined) reserva.diaFin = data.diaFin;
        if (data.nombreHuesped !== undefined) reserva.nombreHuesped = data.nombreHuesped;
        if (data.alojamiento !== undefined) reserva.alojamiento = data.alojamiento;

        const actualizada = await this.reservaRepository.save(reserva);
        return this.toDTO(actualizada);
    }

    async delete(id) {
        const reserva = await this.reservaRepository.findById(id);
        if (!reserva) {
            throw new NotFoundError("Reserva no encontrada");
        }
        await this.reservaRepository.delete(id);
        return this.toDTO(reserva);
    }
}