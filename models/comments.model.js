module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define('comments', 
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide a description for the comment!` }
            }
        },
        edited: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    return comment
}