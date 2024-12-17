const mongoose = require('../mongodb');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:String,
    author:{
        type: String,
        required: true
    },
},{ timestamps: true });

const Blog = mongoose.model('blogs', blogSchema);

module.exports = Blog;