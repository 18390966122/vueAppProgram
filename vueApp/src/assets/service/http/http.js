import {baseURL, errors} from '@/assets/service/config/config.js'
import axios from 'axios'
import { Dialog } from 'vant'
async function errorState (response) {
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
function httpDefaultOpts (opts, data) {
  let httpDefaultOpts = {// http默认配置
    method: opts.method,
    baseURL: baseURL,
    url: opts.url,
    timeout: 30000,
    params: data,
    data: data
  }
  if (opts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }
  return httpDefaultOpts
}

function httpServer (opts, data) {
  let defaultParameter = httpDefaultOpts(opts, data)
  let promise = new Promise(function (resolve, reject) {
    axios(defaultParameter).then(
      (response) => {
        resolve(response)
      }
    ).catch(
      (error) => {
        errorState(error)
        reject(error)
      }
    )
  })
  return promise
}

export default httpServer
