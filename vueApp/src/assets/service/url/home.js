const home = {
  index: {url: '/goods/home', method: 'GET'},
  register: {url: '/user/register', method: 'POST'},
  login: {url: '/user/login', method: 'POST'},
  goodsInfo: {url: '/goods/goodsInfo', method: 'POST'},
  category: {url: '/goods/category', method: 'GET'}
}
const category = {
  getCategory: {url: '/goods/getCategory', method: 'GET'},
  getCategorySub: {url: '/goods/getCategorySub', method: 'GET'},
  getCategorySubList: {url: '/goods/getCategorySubList', method: 'POST'},
  getCategorySubGoodsById: {url: '/goods/getCategorySubGoodsById', method: 'POST'}
}
export {
  home,
  category
}
