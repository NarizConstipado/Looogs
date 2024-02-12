module.exports = (sequelize, DataTypes) => {
    const badge = sequelize.define('badges', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide a name!` }
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide an image!` }
            }
        },
        condition: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide a condition!` }
            }
        },
        descBadge: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide a description for the badge!` }
            }
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide a value!` }
            }
        }
    });
    return badge
}