//引入mongoose
const {
    Schema
} = require('../conn_mongodb')

const user_schema = new Schema({
    username: {
        type: String,
        minlength: 5,
    },
    password: {
        type: String,
        minlength: 6,
    },
})

module.exports = user_schema