
const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const resService = require("../reservations/reservations.service");
const hasProperties = require("../errors/hasProperties")(
    "table_name",
    "capacity"
);

async function reservationValidation(req, res, next) {
    if (!req.body.data) {
        return next({
            status: 400,
            message: "Reservation not found.",
        })
    }
    if (!req.body.data.reservation_id) {
        return next({
            status: 400,
            message: "reservation_id not found",
        });
    }
    const reservation = await resService.listById(req.body.data.reservation_id);

    if(reservation === undefined) {
        return next({
            status: 400,
            message: `reservation_id: ${req.body.data.reservation_id} not found`
        });
    }
    res.locals.reservation = reservation;
    next();
}

async function tableValidation(req, res, next) {
    const reservation = res.locals.reservation;
    const { table_id } = req.params;
    const table = await service.read(table_id);
    if(table) {
        res.locals.table = table;
        if (reservation.people > table.capacity) {
            return next({
                status: 400,
                message: "Insufficient table capacity",
            });
        }
        if (table.reservation_id) {
            return next({
                status: 400,
                message: "Table is occupied"
            });
        }
        next();
    } else {
        return next({
            status: 404,
            message: `table_id: ${table_id} not found`,
        });
    }
}

async function alreadySeated(req, res, next) {
    const status = res.locals.reservation.status;
    if(status === "seated") {
        return next({
            status: 400,
            message: "reservation is already seated"
        })
    }
    next();
}

async function update(req, res, next) {
    const { reservation_id } = req.body.data;
    await resService.updateResStatus(Number(reservation_id), "seated");
    const updatedTable = {
        ...res.locals.table,
        reservation_id: reservation_id,
    };
    res.json({ data: await service.update(updatedTable) });
}

module.exports = {
    update: [
        asyncErrorBoundary(reservationValidation),
        asyncErrorBoundary(tableValidation),
        asyncErrorBoundary(alreadySeated),
        asyncErrorBoundary(update),
    ],
}
