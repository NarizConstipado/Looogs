module.exports = (sequelize, DataTypes) => {
    const progress = sequelize.define('progress', 
    {
        progressValue: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: { msg:  `Please provide a value for the progress!` }
            }
        }
    });
    return progress
}