const mongoose = require('mongoose')
const Schema = mongoose.Schema

let categorySubs = new Schema({
  ID: { type: String, unique: true },
  MALL_CATEGORY_ID: Number,
  MALL_SUB_NAME: String,
  COMMENTS: String,
  SORT: Number
}, {
    collection: 'categorySub'
  })

module.exports = mongoose.model('CategorySub', categorySubs)
