const {
    model
} = require('../../../database/conn_mongodb')
const admin_schema = require('../../../database/migrations/create_admin_tables')

class adminModel {
    //构造
    constructor() {
        this.model = model('Admin', admin_schema, 'admins')
    }

    //新增管理员
    addAdmin(data) {
        return this.model.insertMany(data)
    }

    //查询管理员
    searchAdmin(data) {
        return this.model.find(data)
    }

    //查询书否重名
    searchAlready(data) {
        return this.model.findOne(data)
    }

    //删除管理员
    deleteAdmin(data) {
        return this.model.deleteOne(data)
    }

    //修改管理员
    updateAdmin(data) {
        return this.model.updateOne(data)
    }
}

module.exports = new adminModel