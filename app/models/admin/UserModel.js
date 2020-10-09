const {
    model
} = require('../../../database/conn_mongodb')
const user_schema = require('../../../database/migrations/create_users_tables')

class userModel {
    //构造
    constructor() {
        this.model = model('User', user_schema, 'users')
    }

    //查询单个用户
    findUser(data) {
        return this.model.findOne(data)
    }

    //新增用户
    addUser(data) {
        return this.model.insertMany(data)
    }
}

module.exports = new userModel