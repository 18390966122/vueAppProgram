const Router = require('koa-router')
let mongoose = require('mongoose')

let router = new Router()
router.get('/', async (ctx) => {
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
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})
router.post('/login', async (ctx) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  let User = mongoose.model('User')
  await User.findOne({ username: username }).exec().then(async (result) => {
    if (result) {
      // ctx.body = { code: 200, message: '用户名存在' }
      let loginUser = new User()
      await loginUser.comparePassword(password, result.password).then(isMatch => {
        ctx.body = { code: 200, message: '登录成功' }
      }).catch(error => {
        ctx.body = { code: 200, message: '密码错误' }
      })
    } else {
      ctx.body = { code: 200, message: '用户名不存在' }
    }
  }).catch(error => {
    console.log(error)
  })
})
module.exports = router
