const bcrypt = require("bcryptjs"); //password encryption

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('users', 
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: { msg: `Please provide a username!` }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide a name!` }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: { msg: `Please provide an email!` }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Please provide a password!`}
            }
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            },
            isNumeric: { msg: `Please provide a Phone Number!` }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        image: {
            type: DataTypes.STRING,
        }
    });
    user.prototype.verifyPassword = function (password, hash) {
        return bcrypt.compareSync(password, hash);
    }
    return user
}