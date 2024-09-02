const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../handleData/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

//
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('Not logged in')
        );
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method;

    // Get blog list
    if (method === 'GET' && req.path === '/api/blog/list') {

        let author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // const listData = getList(author, keyword);

        if (req.query.isadmin) {
            const loginCheckResult = loginCheck(req);
            if (loginCheckResult) {
                return loginCheckResult;
            }
            author = req.session.username;
        }

        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        });
    }

    // Get blog detail
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id;
        // const data = getDetail(id);
        const result = getDetail(id);
        return result.then(data => {
            return new SuccessModel(data);
        });
    }

    // Create a new blog
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const blogData = req.body;
        // const data = newBlog(blogData);

        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }

        req.body.author = req.session.username;
        // req.body.author = 'zhangsan'; // Fake author
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data);
        });
    }

    // Update a blog
    if (method === 'POST' && req.path === '/api/blog/update') {
        const id = req.query.id;
        // const blogData = req.body;

        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }

        // req.body.author = 'zhangsan'; // Fake author
        req.body.author = req.session.username;
        // const data = updateBlog(id, blogData);
        const result = updateBlog(id, req.body);
        return result.then(val => {
            if (val) {
                return new SuccessModel();
            } else {
                return new ErrorModel('Failed to update blog');
            }
        });
    }

    // Delete a blog
    if (method === 'POST' && req.path === '/api/blog/del') {
        const id = req.query.id;
        // const data = delBlog(id);

        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }

        // const author = 'zhangsan'; // Fake author
        const author = req.session.username;
        const result = delBlog(id, author);
        return result.then(val => {
            if (val) {
                return new SuccessModel();
            } else {
                return new ErrorModel('Failed to delete blog');
            }
        });
    }
}

module.exports = handleBlogRouter;  