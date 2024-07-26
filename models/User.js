const connection = require('../config/database');

const User = {};

User.findByEmail = (email, result) => {
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

User.create = (newUser, result) => {
    connection.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newUser });
    });
};

module.exports = User;
