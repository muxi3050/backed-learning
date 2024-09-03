const {exec,escape} = require('../db/mysql');

const login = (usrname, password) => {

    // Escape the username and password
    usrname = escape(usrname)
    password = escape(password)

    const sql = `
        select username, realname from users where username=${usrname} and password=${password};
    `
    console.log('sql is', sql)

    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {  
    login
}