//1.引入外部文件
const express = require('express')
const session = require('cookie-session')
const path = require('path')
const app = express()

//9.使用封装好的中间件
app.use(require('./modules/cs-access-log'))

//6.注册session中间件
app.use(session({
    name: "sessionId",
    secret: "candy",
    maxAge: 24 * 60 * 1000
}))

//7.配置art-template
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

//2.静态资源托管
app.use(express.static('./public'))

//5.注册路由模块
// app.use('/admin', require('./router/admin'))

//3.创建测试'/'路由,用于测试可否正常启动
app.get('/', (req, res) => {
    res.send('<h1>It\'s works</h1>')
})

//8.配置错误中间件
app.use((req, res, next) => {
    res.status(404).render('./404.html')
})

//4.监听端口号
//获取IPV4形式的ip地址
app.listen(8080, '0.0.0.0', () => {
    console.log('running at http://127.0.0.1:8080');
})