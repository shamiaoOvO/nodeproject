const adminModel = require('../../models/admin/AdminModel')

module.exports = {
    showAdminPage: async (req, res) => {
        let ret = await adminModel.searchAdmin({})
        if (ret) {
            res.render('administrator/adminshow', {
                ret
            })
            return true
        }
    },

    adminAction: async (req, res) => {
        let info = {
            time: 3,
            message: '删除成功',
            url: '/admin/adminshow'
        }
        let {
            name
        } = req.body
        await adminModel.deleteAdmin({
            name: name
        }, err => {})
        res.render('redirect', info)
    },

    showUpdatePage: async (req, res) => {
        let {
            name
        } = req.query
        let ret = await adminModel.searchAdmin({
            name: name
        })
        if (ret) {
            res.render('administrator/adminupdate', {
                ret
            })
            return true
        }
    },

    updateAction: async (req, res) => {
        let {
            name,
            age,
            gender
        } = req.body
        age = age - 0
        let info = {
            time: 3,
            message: '修改成功',
            url: '/admin/adminshow'
        }
        let ret = await adminModel.searchAlready({
            name
        })
        if (ret) {
            info.message = "该管理员已存在"
            res.render('redirect', info)
            return true
        }

        let rets = await adminModel.updateAdmin({
            name,
            age,
            gender
        })
        if (rets) {
            res.render('redirect', info)
            return true
        }
    },

    showAddPage: (req, res) => {
        res.render('administrator/adminadd')
    },

    addAction: async (req, res) => {
        let {
            name,
            age,
            gender
        } = req.body
        age = age - 0
        let info = {
            time: 3,
            message: '添加成功',
            url: '/admin/adminadd'
        }
        let ret = await adminModel.searchAlready({
            name
        })
        if (ret) {
            info.message = "该管理员已存在"
            res.render('redirect', info)
            return true
        }

        let rets = await adminModel.addAdmin({
            name,
            age,
            gender
        })
        if (rets) {
            res.render('redirect', info)
            return true
        }
    },
}