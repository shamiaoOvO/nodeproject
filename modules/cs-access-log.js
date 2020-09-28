const path = require('path')
const moment = require('moment')
const fs = require('fs')

//访问日志中间件
var logAccessInfo = (req, res, next) => {
    let ip = req.ip
    let time = moment().format('YYYY-MM-DD HH:mm:ss')
    //获取请求类型
    let type = req.method
    let uri = req.url
    let userAgent = req.headers['user-agent']
    let record = `${ip} - ${time} - ${type} - ${uri} - ${userAgent} \n`
    let filename = path.join(__dirname, '../', 'logs', moment().format('YYYYMMDD') + '.log')
    if (fs.existsSync(filename)) {
        //追加写
        fs.appendFileSync(filename, record)
    } else {
        // 创建写
        fs.writeFileSync(filename, record)
    }
    next()
}

module.exports = logAccessInfo