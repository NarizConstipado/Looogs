module.exports = (sequelize, DataTypes) => {
    const chapter = sequelize.define('chapters', 
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide a title!`}
            }
        },
        color: {
            type: DataTypes.STRING,
        }
    });
    return chapter
}