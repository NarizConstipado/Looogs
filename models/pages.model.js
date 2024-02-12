module.exports = (sequelize, DataTypes) => {
    const page = sequelize.define('pages', 
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg:  `Please provide a description for the page!` }
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide an image!`}
            }
        }
    });
    return page
}