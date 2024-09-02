const {exec} = require('../db/mysql');

const login = (usrname, password) => {
    const sql = `
        select username, realname from users where username='${usrname}' and password='${password}';
    `
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {  
    login
}