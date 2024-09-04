const mysql = require('mysql2');
const { MYSQL_CONF } = require('../conf/db');

// Create a connection object
const con = mysql.createConnection(MYSQL_CONF);

// Connect to the database
con.connect();

// Execute SQL function
function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    exec
};
