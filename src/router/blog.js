const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../handleData/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlogRouter = (req, res) => {
    const method = req.method;

    // Get blog list
    if (method === 'GET' && req.path === '/api/blog/list') {

        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);
         
        return new SuccessModel(listData);
    }

    // Get blog detail
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id;
        const data = getDetail(id);
        return new SuccessModel(data); 
    }

    // Create a new blog
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body;
        const data = newBlog(blogData);
        return new SuccessModel(data);
    }

    // Update a blog
    if (method === 'POST' && req.path === '/api/blog/update') {
        const id = req.query.id;
        const blogData = req.body;
        const data = updateBlog(id, blogData);
        if (data) {
            return new SuccessModel();
        } else {
            return new ErrorModel('Failed to update blog');
        }
    }

    // Delete a blog
    if (method === 'POST' && req.path === '/api/blog/del') {
        const id = req.query.id;
        const data = delBlog(id);
        if (data) {
            return new SuccessModel(data);
        } else {
            return new ErrorModel('Failed to delete blog');
        }
    }
}

module.exports = handleBlogRouter;  