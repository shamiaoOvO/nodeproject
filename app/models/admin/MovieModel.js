const {
    model
} = require('../../../database/conn_mongodb')
const movie_schema = require('../../../database/migrations/create_movie_tables')

class movieModel {
    //构造
    constructor() {
        this.model = model('Movie', movie_schema, 'movies')
    }

    //新增影片
    addMovie(data) {
        return this.model.insertMany(data)
    }

    //搜索影片
    searchMovie(data) {
        return this.model.find(data)
    }

    //下架影片
    deleteMovie(data) {
        return this.model.deleteOne(data)
    }

    //修改影片
    updateMovie(data) {
        return this.model.updateOne(data)
    }
}

module.exports = new movieModel