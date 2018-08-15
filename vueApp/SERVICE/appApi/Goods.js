const mongoose = require('mongoose')
let Router = require('koa-router')
let router = new Router()
let fs = require('fs')
router.get('/allGoods', async (ctx) => {
  fs.readFile('./dataJson/goods.json', 'utf8', (err, data) => {
    if (!err) {
      let i = 0
      let newData = JSON.parse(data)
      let GoodsModel = mongoose.model('Goods')
      newData.forEach((item, index) => {
        let batchData = new GoodsModel(item)
        batchData.save().then(() => {
          i++
          console.log(i)
        }).catch(error => {
          console.log(error)
        })
      })
    } else {
      console.log('读取数据文件goods.json失败')
    }
    ctx.body = '插入数据成功'
  })
})

router.get('/home', async (ctx) => {
  try {
    let info = await fs.readFileSync('./dataJson/source.json', 'utf8')
    ctx.body = {
      code: 200,
      message: JSON.parse(info)
    }
  } catch (err) {
    ctx.body = {code: 500, message: 'failed'}
  }
})

router.get('/categorySub', async (ctx) => {
  fs.readFile('./dataJson/category_sub.json', 'utf8', function (err, data) {
    if (!err) {
      let num = 0
      let newData = JSON.parse(data).RECORDS
      newData.forEach((value) => {
        let CategorySub = mongoose.model('CategorySub')
        let categorySubData = new CategorySub(value)
        categorySubData.save().then(res => {
          num++
          console.log(num)
        }).catch(err => {
          console.log('插入数据库失败')
        })
      })
    } else {
      console.log('数据请求失败')
    }
    ctx.body = '请求成功'
  })
})

router.post('/goodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    let GoodsDetails = mongoose.model('Goods')
    let result = await GoodsDetails.findOne({GOODS_ID:goodsId}).exec()
    ctx.body = {code: 200, data: result, message: 'ok'}
  } catch (err) {
    ctx.body = {code: 500, message: '请求错误', data: {}}
  }
})

router.get('/category',async (ctx) => {
  try {
    let Goods = mongoose.model('Goods')
    let result = await Goods.find({}).exec()
    ctx.body = {code: 200, data: result, message: 'ok'}
  } catch (err) {
    ctx.body = {code: 500, message: '请求错误', data: {}}
  }
})
module.exports = router
