module.exports = (sequelize, DataTypes) => {
    const lesson = sequelize.define('lessons', 
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg:  `Please provide a description for the lesson!` }
            }
        },
        title: {
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
    return lesson
}