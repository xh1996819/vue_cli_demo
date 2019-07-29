import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)

var cart = JSON.parse(localStorage.getItem('cart') || '[]')

const store = new Vuex.Store({
  state: {
    cart: cart
  },
  mutations: {
    addCart(state, proO) {
      let flag = false;
      state.cart.some(item => {
        if (item.id == proO.id) {
          item.count += parseInt(proO.count)
          flag = true
          return true
        }
      })
      if (!flag) state.cart.push(proO)

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateGoodsInfo(state, goods) {
      state.cart.some(item => {
        if (parseInt(item.id) === goods.id) {
          item.count = parseInt(goods.count)
          return true
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeCart(state, id) {
      state.cart.some((item, i) => {
        if (item.id == id) {
          state.cart.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateGoodSelected(state, info) {
      state.cart.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  getters: {
    getAllCount(state) {
      let count = 0
      state.cart.forEach(item => {
        count += item.count
      })
      return count
    },
    getGoodsCount(state) {
      var o = {}
      state.cart.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.cart.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0, //勾选数量
        amount: 0 //总价格
      }
      state.cart.forEach(item => {
        if (item.selected) {
          o.count += item.count,
            o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})

// import { Header, Button, Swipe, SwipeItem, Lazyload } from 'mint-ui';

// Vue.component(Header.name, Header);
// Vue.component(Button.name, Button);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.use(Lazyload);

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

//使用图片预览插件
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)

import './assets/mui-master/dist/css/mui.css'
import './assets/download/font_1268971_93r6kqdx1hj/iconfont.css'
Vue.config.productionTip = false

//导入格式化时间插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
