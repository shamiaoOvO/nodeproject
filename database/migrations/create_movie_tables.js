//引入mongoose
const {
    Schema
} = require('../conn_mongodb')

const movie_schema = new Schema({
    //电影名
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    // 海报
    pic: String,
    // 热度
    hot: Number,
    // 上映时间 年月日
    dt: String,
    // 导演
    director: String,
})

module.exports = movie_schema