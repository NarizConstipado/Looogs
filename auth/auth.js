const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

exports.decode = (token) => {
    try {
        return jwt.verify(token, config.SECRET);
    } catch (err) {
        return console.error(err);
    }
};

exports.createToken = (user) => {
    try {
        return jwt.sign({ id: user.id, role: user.role },
            config.SECRET,
            { expiresIn: '30d' }
        );
    } catch (err) {
        return console.error(err);
    }
};