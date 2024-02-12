module.exports = (sequelize, DataTypes) => {
    const reservation = sequelize.define('reservations', 
    {
       descReservation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide a description for the reservation!` }
            }
       }
    });
    return reservation
}