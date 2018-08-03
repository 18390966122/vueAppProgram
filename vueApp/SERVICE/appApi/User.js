const Router = require('koa-router')
let mongoose = require('mongoose')

let router = new Router()
router.get('/', async(ctx) => {
    ctx.body = '这是用户操作首页'
})
router.post('/register', async (ctx) => {
    let User = mongoose.model('User')
    let singerUser = new User(ctx.request.body)
    await singerUser.save().then(response => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
        console.log(ctx.body)
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
        console.log(ctx.body)
    })
})
module.exports = router
