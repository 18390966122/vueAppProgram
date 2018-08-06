let validate = {
  // 验证用户名
  isUsername (val) {
    return /^[0-9A-Za-z_]{6,15}$/.test(val)
  },
  isPassword (val) {
    return (val.length >= 8 && val.length <= 16)
  }
}

export default validate
