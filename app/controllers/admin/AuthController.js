//引入模型
const userModel = require('../../models/admin/UserModel')


//用于归档当前模块的路由处理回调方法
module.exports = {
    showRegisterPage: (req, res) => {
        res.render('auth/register')
    },
    registerAction: async (req, res) => {
        let {
            username,
            password,
            repassword,
            agree
        } = req.body;
        //视图数据
        let info = {
            time: 3,
            url: '/admin/register',
            message: '',
        }
        //数据验证
        //是否同意协议
        if (!agree) {
            info.message = "请先同意许可协议"
            res.render('redirect', info);
            return true
        }

        //数据长度问题
        if (username.length < 5) {
            info.message = "用户名至少5个字符"
            res.render('redirect', info);
            return true
        }
        if (password.length < 6) {
            info.message = "密码至少6个字符"
            res.render('redirect', info);
            return true
        }

        //密码是否一致问题
        if (password != repassword) {
            info.message = "密码不一致"
            res.render('redirect', info);
            return true
        }

        //用户名是否被占用
        let result = await userModel.findUser({
            username
        })
        if (result) {
            info.message = "用户名已存在"
            res.render('redirect', info);
            return true
        }

        let ret = await userModel.addUser({
            username,
            password
        })
        if (ret) {
            info.message = "注册成功"
            info.url = '/admin/login'
            res.render('redirect', info);
            return true
        } else {
            info.message = "请联系管理员"
            res.render('redirect', info);
            return true
        }
    },
    showLoginPage: (req, res) => {
        let {
            exit
        } = req.query
        if (exit) {
            req.session = null
        }
        res.render('auth/login')
    },
    loginAction: async (req, res) => {
        let {
            username,
            password
        } = req.body
        let info = {
            time: 3,
            message: '反正你没有输对',
            url: '/admin/login'
        }
        let result = await userModel.findUser({
            username,
            password
        })
        if (result) {
            info.message = '登陆成功'
            info.url = '/admin/index'
            //保存用户信息到session
            req.session.username = result.username
            res.render('redirect', info)
            return true
        } else {
            res.render('redirect', info)
            return true
        }
    }
}