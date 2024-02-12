module.exports = (sequelize, DataTypes) => {
    const tools = sequelize.define('tools', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide a name!`}
            }
        },
        image: {
            type: DataTypes.STRING,
        }
    });
    return tools
}