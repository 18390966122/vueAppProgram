import {baseURL, errors} from '@/assets/service/config/config.js'
import axios from 'axios'
import qs from 'qs'
import { Dialog } from 'vant'

axios.interceptors.request.use(config => {
//   store.commit('UPDATE_LOADING',true) //显示loading
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})
async function errorState (response) {
  // store.commit('UPDATE_LOADING',false)  //隐藏loading
  console.log(response)
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  } else if (response.status === 500) {
    Dialog.alert({
      title: '提示',
      message: errors.serverError.text
    }).then(() => {
      // on close
    })
  } else if (response.status === 401) {
    Dialog.alert({
      title: '提示',
      message: errors.systemError.text
    }).then(() => {
      // on close
    })
  } else if (response.status > 500 || response.status === 400) {
    Dialog.alert({
      title: '提示',
      message: errors.systemError.text
    }).then(() => {
      // on close
    })
  } else {
    Dialog.alert({
      title: '提示',
      message: errors.netError.text
    }).then(() => {
      // on close
    })
  }
}
async function successState (res) {
// store.commit('UPDATE_LOADING',false) //隐藏loading
// 统一判断后端返回的错误码
  if (res.data.errCode === '000002') {
    Dialog.alert({
      title: '提示',
      message: errors.netError
    }).then(() => {
      // on close
    })
  }
}
const httpServer = async (opts, data) => {
  let Public = {}// 公共参数
  let httpDefaultOpts = {// http默认配置
    method: opts.method,
    baseURL: baseURL,
    url: opts.url,
    timeout: 10000,
    params: Object.assign(Public, data),
    data: qs.stringify(Object.assign(Public, data)),
    headers: opts.method === 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    } : {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  if (opts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }
  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        successState(res)
        resolve(res)
      }
    ).catch(
      (err) => {
        errorState(err)
        reject(err)
      }
    )
  })
  return promise
}
export default httpServer
