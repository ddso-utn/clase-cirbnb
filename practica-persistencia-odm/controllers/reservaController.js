export class ReservaController {
    constructor(reservaService) {
        this.reservaService = reservaService;
    }

    async findAll(req, res, next) {
        try {
            const reservas = await this.reservaService.findAll();
            res.json(reservas);
        } catch (error) {
            next(error);
        }
    }


    async create(req, res, next) {
        try {
            const reserva = await this.reservaService.create(req.body);
            res.status(201).json(reserva);
        } catch (error) {
            next(error);
        }
    }

    async findById(req, res, next) {
        try {
            const reserva = await this.reservaService.findById(req.params.id);
            res.json(reserva);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const reserva = await this.reservaService.update(req.params.id, req.body);
            res.json(reserva);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const reserva = await this.reservaService.delete(req.params.id);
            res.json({ message: "Reserva eliminada" });
        } catch (error) {
            next(error);
        }
    }

    //Otra version con filtros
    async findAllWithFilters(req, res, next) {
        try {
            // Permite filtrar por nombreHuesped: /reserva?nombreHuesped=Juan
            const filtros = {};
            if (req.query.nombreHuesped) {
                filtros.nombreHuesped = req.query.nombreHuesped;
            }
            const reservas = await this.reservaService.filtroEjemplo(filtros);
            res.json(reservas);
        } catch (error) {
            next(error);
        }
    }
}