module.exports = {
    showIndexPage: (req, res) => {
        res.render('index/index')
    },
    showWelcomePage: (req, res) => {
        res.render('index/welcome')
    },
    isLogin: ((req, res, next) => {
        if (!req.session.username && req.url != '/login' && req.url != '/register') {
            let info = {
                time: 3,
                message: '请先登录',
                url: '/admin/login'
            }
            res.render('redirect', info)
            return true
        } else {
            next()
        }
    }),
}