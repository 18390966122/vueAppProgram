const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/test'
let glob = require('glob')
let {resolve} = require('path')
// 初始化schema的文件夹路径
exports.initSchema = () => {
	glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
	return new Promise((resolve, reject) => {
		mongoose.connect(db,  { useNewUrlParser: true } )
		let maxConnectNum = 0
		mongoose.connection.on('disconnect', () => {
			console.log("----数据库断开")
			if (maxConnectNum <= 3) {
				maxConnectNum++
				mongoose.connect(db,  { useNewUrlParser: true } )
			} else {
				reject()
				throw new Error('数据库重新连接了3次，仍然无法连接，请检查错误')
			}
		})
		mongoose.connection.on('error', () => {
			console.log('------数据库出错')
			if (maxConnectNum <= 3) {
				maxConnectNum++
				mongoose.connect(db,  { useNewUrlParser: true } )
			} else {
				reject()
				throw new Error('数据库重新连接了3次，任然无法连接，请检查错误')
			}
		})
		mongoose.connection.once('open', () => {
			resolve()
			console.log('successed')
		})
	})
}
