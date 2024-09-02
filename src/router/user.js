const { login } = require('../handleData/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set } = require('../db/redis');


const handleUserRouter = (req, res) => {
    const method = req.method;
    
    // Login
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        // const result = login(username, password);
        // const { username, password } = req.query;
        const result = login(username, password);
        return result.then(data => {
            if (data.username) {
                // Set session  
                req.session.username = data.username;
                req.session.realname = data.realname;
                // Sync to redis
                set(req.sessionId, req.session);
                
                return new SuccessModel();
            }
            return new ErrorModel('Login failed');
        });
    }

    // Test
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel({
    //             session: req.session
    //         }));
    //     }
    //     return Promise.resolve(new ErrorModel('Not logged in'));
    // }
}
module.exports = handleUserRouter;