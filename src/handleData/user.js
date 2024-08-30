const loginCheck = (usrname, password) => {
    if (usrname === 'admin' && password === '123') {
        return true;
    }
    return false;
}

module.exports = {  
    loginCheck
}