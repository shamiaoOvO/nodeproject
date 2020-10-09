//产生router实例
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path');
const AdminController = require('../app/controllers/admin/AdminController');

//multer初始化配置
const upLoader = multer({
    // 指定文件上传成功后所在的路径
    dest: path.join(__dirname, '../', "public", "uploads"),
});

//引入控制器
const AuthController = require('../app/controllers/admin/AuthController')
const IndexController = require('../app/controllers/admin/IndexController')
const MovieController = require('../app/controllers/admin/MovieController');

//防翻墙
router.use(IndexController.isLogin)

//路由规则
//注册页面展示
router.get('/register', AuthController.showRegisterPage)
//注册提交处理
router.post('/register', AuthController.registerAction)
//登录页面展示
router.get('/login', AuthController.showLoginPage)

router.post('/login', AuthController.loginAction)

router.get('/index', IndexController.showIndexPage)

router.get('/welcome', IndexController.showWelcomePage)

router.get('/movie/add', MovieController.showMovieAddPage)

router.post('/movie/add', upLoader.single("pic"), MovieController.movieAddAction)

router.get('/movie/movieshow', MovieController.showMoviePage)

router.post('/movie/movieshow', MovieController.movieAction)

router.get('/movie/movieshowdetail', MovieController.showMovieDetailPage)

router.post('/movie/movieshowdetail', MovieController.movieDetailAction)

router.get('/movie/amend', MovieController.showMovieAmendPage)

router.post('/movie/amend', upLoader.single("pic"), MovieController.movieAmendActino)

router.get('/adminshow', AdminController.showAdminPage)

router.post('/adminshow', AdminController.adminAction)

router.get('/adminupdate', AdminController.showUpdatePage)

router.post('/adminupdate', AdminController.updateAction)

router.get('/adminadd', AdminController.showAddPage)

router.post('/adminadd', AdminController.addAction)
//导出路由
module.exports = router