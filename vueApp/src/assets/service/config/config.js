const errors = {
  netError: { errorType: 1, text: '网络错误，请稍后重试' },
  systemError: { errorType: 2, text: '系统错误，请联系管理员' },
  loginTimeout: { errorType: 3, text: '登录超时，请重新登录' },
  serverError: { errorType: 4, text: '服务器错误，请联系管理员' }
}

const baseURL = ' https://www.easy-mock.com/mock/5b1be26d403771427cce08bb/demoApp'

export {
  errors,
  baseURL
}
