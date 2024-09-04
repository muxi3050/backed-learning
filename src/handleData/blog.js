// const { exec,escape } = require('../db/mysql')
const xss = require('xss')
const Blog = require('../db/models/Blog')
const getList = async (author, keyword) => {

    // let sql = `select * from blogs where 1=1 `
    // if (author) {
    //     sql += `and author='${author}' `
    // }
    // if (keyword) {
    //     sql += `and title like '%${keyword}%' `
    // }
    // sql += `order by createTime desc;`

    // // 返回 promise
    // return exec(sql)

    const whereOpt = {}
    if(author) {whereOpt.author = author}
    if(keyword) {whereOpt.title = new RegExp(keyword)}
    const list = await Blog.find(whereOpt).sort({createTime: -1})
    return list

}

const getDetail = async (id) => {
    // const sql = `select * from blogs where id='${id}'`
    // return exec(sql).then(rows => {
    //     return rows[0]
    // })
    const blog = await Blog.findById(id)
    return blog
}

const newBlog = async (blogData = {}) => {
    // // blogData 是一个博客对象，包含 title content author属性
    // const title = xss(blogData.title)
    // const content = xss(blogData.content)
    // const author = blogData.author
    // const createTime = Date.now()
    // const sql = `
    //     insert into blogs (title, content, author, createtime)
    //     values ('${title}', '${content}', '${author}', ${createTime});
    // `
    // return exec(sql).then(insertData => {
    //     console.log('insertData is', insertData)
    //     return {
    //         id: insertData.insertId
    //     }
    // })

    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author

    const blog = await Blog.create({
        title,
        content,
        author
    })
    return {
        id: blog._id
    }
}

const updateBlog = async (id,blogData = {}) => { 
    // // id 就是要更新博客的 id
    // // blogData 是一个博客对象，包含 title content 属性
    // const title = xss(blogData.title)
    // const content = xss(blogData.content)
    // const author = blogData.author
    // const sql = `
    //     update blogs set title='${title}', content='${content}' where id=${id} and author='${author}';
    // `
    // return exec(sql).then(updateData => {
    //     console.log('updateData is', updateData)
    //     if(updateData.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })

    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const blog = await Blog.updateOne(
        { _id: id },
        { title, content},
        { new : true }
    )
    if (blog.modifiedCount > 0) {
        return true
    }
    return false
}

const delBlog = async (id,author) => {
    // // id 就是要删除博客的 id
    // const sql = `delete from blogs where id='${id}' and author='${author}'`
    // return exec(sql).then(delData => {
    //     if(delData.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })
    const blog = await Blog.deleteOne({ _id: id, author })
    if(blog.deletedCount > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}

