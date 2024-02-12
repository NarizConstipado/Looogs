module.exports = (sequelize, DataTypes) => {
    const component = sequelize.define('components', 
    {
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg:  `Please provide a description for the component!` }
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide a type!`}
            }
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });
    return component
}