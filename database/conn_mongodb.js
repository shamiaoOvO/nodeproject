//引入配置
const {
    host,
    options
} = require('../config/mongodb.js')

//链接MongoDB
const mongoose = require('mongoose')
mongoose.connect(host, {
    options
});

module.exports = mongoose