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

        console.log('--- CANTIDAD DE NOCHES ---');
        console.log(reserva.cantidadNoches()); //Prueba del metodo cantidadNoches porque aca ya tenemos nuestro objeto JS automaticamente.


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
    
    //AGREGACION
    async reservasPorAlojamiento() {
        return await this.reservaRepository.reservasPorAlojamiento();
    }

    //LOGICA CON OBJETOS
    async obtenerReservaConTotal(id) {
        const reserva = await this.reservaRepository.findById(id)
        //HASTA ACA RESERVA ES UN OBJETO MONGOOSE TIENE DATOS, METODOS, FUNCIONES Y METADATA

        const fechaInicio = new Date(reserva.diaInicio)
        const fechaFin = new Date(reserva.diaFin)
        const dias = Math.ceil( (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24))
        const total = dias * reserva.alojamiento.precioPorNoche

        return {
            //ACA SI LO CONVIERTO EN OBJETO JS CON DATOS PUROS
            ...reserva.toObject(), //... LLENA LAS PROPIEDADES DEL OBJETO RESERVA EN EL NUEVO OBJETO QUE ESTOY CREANDO
            cantidadDias: dias,
            totalReserva: total
        }
    }


    //SESION
    /*
    Una sesión permite agrupar operaciones MongoDB
    dentro de un mismo contexto transaccional.
    Si algo falla, se puede hacer rollback.
    La transacción es lógica de negocio, POR ENDE VA EN SERVICE
    Aunque acá usamos una sola operación,
    las sesiones son útiles cuando
    hay múltiples escrituras relacionadas.
    Las transacciones en Mongo requieren replica set, que es una config pensada para alta disp, replicacion, consistencia, etc auqneu se tenga solo una instancia.
    En producción suele usarse Atlas o clusters replicados. Y a veces al instalar local suele venir desactivada esta opcion.
    */

    async createReserva(data) {
        // iniciamos sesión
        const session = await mongoose.startSession()
        try {
            // iniciamos transacción
            session.startTransaction()
            // creamos reserva usando sesión
            const reserva =
                await this.repository.create(
                    data,
                    session
                )
            // confirmamos cambios
            await session.commitTransaction()
            return reserva

        } catch(error) {
            // rollback
            await session.abortTransaction()
            throw error
        } finally {
            // cerramos sesión, la sesión siempre debe cerrarse.
            session.endSession()
        }
    }
        
    //Y EN EL REPOSITORY DEBERIAMOS:
    /*
    async create(data, session) {
            // create usando sesión Mongo
            return await this.model.create(
                [data],
                { session }
            )
    }
    */

}