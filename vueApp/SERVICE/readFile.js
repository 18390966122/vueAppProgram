const fs = require('fs')

fs.readFile('./dataJson/source.json', 'utf8', function (err, data) {
  let newData = JSON.parse(data)
  let category = null
  let hotGoods = null
  let recommend = null
  for (let k in newData.data) {
    switch (k) {
      case 'category':
        category = newData.data[k]
        break
      case 'hotGoods':
        hotGoods = newData.data[k]
        break
      case 'recommend':
        recommend = newData.data[k]
        break
    }
  }
  fs.writeFile('./dataJson/category.json', JSON.stringify(category), function (err) {
    if (err) {
      console.log('插入文件失败')
    } else {
      console.log('插入文件成功')
    }
  })
  fs.writeFile('./dataJson/hotGoods.json', JSON.stringify(hotGoods), (err) => {
    if (err) {
      console.log('插入失败')
    } else {
      console.log('插入文件成功')
    }
  })
  fs.writeFile('./dataJson/recommend.json', JSON.stringify(recommend), (err) => {
    if (err) {
      console.log('插入失败')
    } else {
      console.log('插入文件成功')
    }
  })
})

fs.readFile('./dataJson/fsJson.json', 'utf8', function (err, data) {
  let newData = JSON.parse(data)
  let pushData = []
  if(!err) {
    newData.RECORDS.map((value, index) => {
      if(value.IMAGE1 !== null) {
        pushData.push(value)
      }
    })
    fs.writeFile('./dataJson/goods.json', JSON.stringify(pushData), (err) => {
      if (!err) {
        console.log('写入数据成功')
      } else {
        console.log('写入数据失败')
      }
    })
  } else {
    console.log('读取数据错误')
  }
})
