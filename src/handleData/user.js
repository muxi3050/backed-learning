// const {exec,escape} = require('../db/mysql');
const User = require('../db/models/User')

const login = async (usrname, password) => {

    // // Escape the username and password
    // usrname = escape(usrname)
    // password = escape(password)

    // const sql = `
    //     select username, realname from users where username=${usrname} and password=${password};
    // `
    // console.log('sql is', sql)

    // return exec(sql).then(rows => {
    //     return rows[0] || {}
    // })

    const userList = await User.find({
        username: usrname,
        password: password
    })
    if( userList.length === 0 ) return {}
    return userList[0]

}

module.exports = {  
    login
}