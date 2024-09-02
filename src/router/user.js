const { login } = require('../handleData/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toUTCString();
}

const handleUserRouter = (req, res) => {
    const method = req.method;
    
    // Login
    if (method === 'GET' && req.path === '/api/user/login') {
        // const { username, password } = req.body;
        // const result = login(username, password);
        const { username, password } = req.query;
        const result = login(username, password);
        return result.then(data => {
            if (data.username) {
                res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`);
                return new SuccessModel();
            }
            return new ErrorModel('Login failed');
        });
    }

    // Test
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel({
                username: req.cookie.username
            }));
        }
        return Promise.resolve(new ErrorModel('Not logged in'));
    }
}
module.exports = handleUserRouter;