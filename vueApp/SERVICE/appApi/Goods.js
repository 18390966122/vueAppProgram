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

router.get('/category', async (ctx) => {
  try {
    let Category = mongoose.model('Category')
    await fs.readFile('./dataJson/category.json', 'utf8', function (err, result) {
      if (err) {
        console.log(err)
        return
      }
      let categoryData = JSON.parse(result).RECORDS
      // console.log(categoryData)
      categoryData.forEach(item => {
        let singerData = new Category(item)
        singerData.save().then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      })
    })
    let result = await Goods.find({}).exec()
    ctx.body = {code: 200, data: result, message: 'ok'}
  } catch (err) {
    ctx.body = {code: 500, message: '请求错误', data: {}}
  }
})
/* 获取商品子类别的分类*/
router.get('/getCategorySub', async (ctx) => {
  try {
    let categorySubData = mongoose.model('CategorySub')
    let result = await categorySubData.find().exec()
    ctx.body = {
      code: 200,
      data: result,
      message: 'ok'
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      data: null,
      message: err
    }
  }
})
router.get('/getCategory', async (ctx) => {
  try {
    let categoryModel = mongoose.model('Category')
    let categoryData = await categoryModel.find().exec()
    ctx.body = {
      code: 200,
      data: categoryData,
      message: 'ok'
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      data: null,
      message: err
    }
  }
})
/* 获取小类的数据*/
router.post('/getCategorySubList', async (ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId
    let categorySub = mongoose.model('CategorySub')
    let result = await categorySub.find({MALL_CATEGORY_ID: categoryId}).exec()
    ctx.body = {
      code: 200,
      data: result,
      message: 'ok'
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      data: null,
      message: err
    }
  }
})

/* 获取商品类别的ID获取商品*/
router.post('/getCategorySubGoodsById', async (ctx) => {
  try {
    let subId = ctx.request.body.subId
    let page = ctx.request.body.page
    let num = ctx.request.body.num
    let start = (page - 1) * num
    let categorySubGoods = mongoose.model('Goods')
    let result = await categorySubGoods.find({SUB_ID: subId}).skip(start).limit(num).exec()
    console.log(page)
    ctx.body = {
      code: 200,
      data: result,
      message: 'ok'
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      data: null,
      message: err
    }
  }
})

module.exports = router
