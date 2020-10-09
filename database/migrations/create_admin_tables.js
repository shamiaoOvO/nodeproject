//引入mongoose
const {
    Schema
} = require('../conn_mongodb')

const admin_schema = new Schema({
    //管理员姓名
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    // 年龄
    age: Number,
    // 性别
    gender: String,

})

module.exports = admin_schema