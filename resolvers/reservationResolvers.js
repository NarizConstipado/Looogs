const db = require('../models/index.js')
const Reservations = db.reservation
const { statusName } = require("../utilities/statusMessages.js");

const reservationResolvers = {
    Query: {
        getReservation: async (_, { reservationID }, context) => {
            try {
                const reservation = await Reservations.findOne({ where: { id: reservationID } })

                if (context.user.role === 'admin' || context.user.id == reservation.userId) {
                    reservation.description = JSON.parse(reservation.description);
                    return reservation
                }
            } catch (err) {
                console.error(err);
                throw new Error(statusName.INTERNALERROR)
            }
        },
        getReservationsByLocation: async (_, { locationID }, context) => {
            try {
                if (context.user.role === 'admin') {
                    const reservation = await Reservations.findAll({
                        where: {
                            locationId: locationID
                        }
                    })
                    reservation.description = JSON.parse(reservation.description);
                    return reservation
                }
            } catch (err) {
                console.error(err);
                throw new Error(statusName.INTERNALERROR)
            }
        }
    },
    Mutation: {
        registerReservation: async (_, { reservationID, description, locationID }, context) => {
            try {
                if (reservationID && description && locationID) {

                    description = JSON.stringify(description);

                    const reservation = {
                        description: description,
                        locationId: locationID,
                        reservation: reservationID,
                        userId: context.user.id
                    }

                    await Reservations.create(reservation)

                    return statusName.CREATED
                }
                return statusName.BADREQUEST
            } catch (err) {
                console.error(err);
                throw new Error(statusName.INTERNALERROR)
            }
        },
        deleteReservation: async (_, { reservationID }, context) => {
            try {
                const reservation = await Reservations.findOne({ where: { id: reservationID } })
                if (context.user.id == reservation.userId || context.user.role == 'admin') {
                    await Reservations.destroy({ where: { id: reservationID } })
                    return statusName.DONE;
                }
                return statusName.UNAUTHORIZED;
            } catch (err) {
                console.error(err);
                throw new Error(statusName.INTERNALERROR)
            }
        }
    },
    Reservation: {
        location: async reservation => {
            try {
                return db.location.findOne({ where: { id: reservation.locationId } })
            } catch (err) {
                console.error(err);
            }
        },
        user: async reservation => {
            try {
                return db.user.findOne({ where: { id: reservation.userId } })
            } catch (err) {
                console.error(err);
            }
        },
    }
}

module.exports = reservationResolvers;