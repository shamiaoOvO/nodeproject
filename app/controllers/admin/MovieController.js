const movieModel = require('../../models/admin/MovieModel')
const path = require('path')
const fs = require('fs')

module.exports = {
    showMovieAddPage: (req, res) => {
        res.render('movie/add')
    },
    movieAddAction: async (req, res) => {
        const file = req.file
        const post = req.body
        let info = {
            time: 3,
            message: '',
            url: '/admin/movie/add'
        }
        if (!file) {
            info.message = '请上传电影图片'
            res.render('redirect', info)
            return true
        } else {
            //找回文件的原始后缀
            const ext = path.extname(file.originalname)
            const newfilename = file.filename + ext
            fs.rename(file.path, path.join(path.dirname(file.path), newfilename), async (err) => {
                //判断改名是否出错
                if (err) {
                    info.message = '改名失败'
                } else {
                    //将数据保存至数据表中
                    post.pic = '/uploads/' + newfilename
                    let ret = await movieModel.addMovie(post)
                    if (ret.length) {
                        info.message = '电影添加成功'
                    } else {
                        info.message = '电影添加失败'
                    }
                }
                res.render('redirect', info)
            })
        }
    },
    showMoviePage: async (req, res) => {
        let ret = await movieModel.searchMovie({})
        if (ret) {
            res.render('movie/movieshow', {
                ret
            })
            return true
        }
    },
    movieAction: async (req, res) => {
        let info = {
            time: 3,
            message: '下架成功',
            url: '/admin/movie/movieshow'
        }
        let {
            moviename
        } = req.body
        await movieModel.deleteMovie({
            name: moviename
        }, err => {})
        res.render('redirect', info)
    },

    showMovieDetailPage: (req, res) => {
        res.render('movie/movieshowdetail')
    },
    movieDetailAction: (req, res) => {
        res.send('hi')
    },
    showMovieAmendPage: async (req, res) => {
        let {
            name
        } = req.query
        let ret = await movieModel.searchMovie({
            name: name
        })
        if (ret) {
            res.render('movie/amend', {
                ret
            })
            return true
        }
    },
    movieAmendActino: async (req, res) => {
        const file = req.file
        const post = req.body
        let info = {
            time: 3,
            message: '',
            url: '/admin/movie/movieshow'
        }
        if (!file) {
            info.message = '请上传电影图片'
            res.render('redirect', info)
            return true
        } else {
            //找回文件的原始后缀
            const ext = path.extname(file.originalname)
            const newfilename = file.filename + ext
            fs.rename(file.path, path.join(path.dirname(file.path), newfilename), async (err) => {
                //判断改名是否出错
                if (err) {
                    info.message = '改名失败'
                } else {
                    //将数据保存至数据表中
                    post.pic = '/uploads/' + newfilename
                    let ret = await movieModel.updateMovie(post, res => {})
                    info.message = '电影修改成功'
                }
                res.render('redirect', info)
            })
        }

    }
}