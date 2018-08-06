const mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let bcrypt = require('bcrypt')
// 定义加密密码计算强度
var SALT_WORK_FACTOR = 10;

let userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  userId: ObjectId,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: String, default: Date.now() }
}, {
    collection: 'user'
  })
//使用pre中间件在用户信息存储前进行密码加密
userSchema.pre('save', function (next) {
  let user = this
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

userSchema.methods = {
  comparePassword (_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (error, isMatch) => {
        if (!isMatch) {
          resolve(false)
        } else {
          reject(true)
        }
      })
    })
  }
}
mongoose.model("User", userSchema)

