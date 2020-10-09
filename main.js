//1.引入外部文件
const express = require('express')
const session = require('cookie-session')
const path = require('path')
const app = express()
const body = require('body-parser')

//6.注册session中间件
app.use(session({
    name: "sessionId",
    secret: "candy",
    maxAge: 24 * 60 * 1000
}))

//使用body-parser中间件
app.use(body.urlencoded({
    extended: false
}))

//7.配置art-template
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

//2.静态资源托管
app.use(express.static('./public'))

//9.使用封装好的中间件
app.use(require('./middlewares/cs-access-log'))

//5.注册路由模块
app.use('/admin', require('./router/admin'))

//8.配置错误中间件
app.use((req, res, next) => {
    res.status(404).render('./404.html')
})

//4.监听端口号
//获取IPV4形式的ip地址
app.listen(8080, '0.0.0.0', () => {
    console.log('running at http://127.0.0.1:8080');
})