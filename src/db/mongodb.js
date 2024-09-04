const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';
const dbName = 'myblog';
const mongoURI = `${url}/${dbName}`; 

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB 连接错误:', error));
// db.once('open', () => console.log('MongoDB 连接成功'));

module.exports = mongoose;