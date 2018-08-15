const Koa = require('koa')
let app = new Koa()
const { connect, initSchema} = require ('./database/init.js')
let Router = require('koa-router') // 引入router中间件
let bodyparser = require('koa-bodyparser')
let cors = require('koa2-cors')

// 加载路由
let user = require('./appApi/User.js')
let goods = require('./appApi/Goods.js')
// 装载所有的子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())

app.use(bodyparser()) // 在post请求的时候，格式化接收的参数
app.use(cors()) // 解决跨域问题，允许跨域

// 加载路由中间件
app.use(router.routes()) // 加载所有的路由
app.use(router.allowedMethods()) // 加载中间件中所有的方法
;(async () => {
    await connect()
    initSchema()
})()

app.use((ctx) => {
    ctx.body = 'hello'
})
app.listen(3000,() => {
    console.log('port 3000')
})