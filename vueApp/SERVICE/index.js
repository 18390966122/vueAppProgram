const Koa = require('koa')
let app = new Koa()
app.use(ctx => {
    ctx.body = 'hello'
})
app.listen(3000,() => {
    console.log('port 3000')
})