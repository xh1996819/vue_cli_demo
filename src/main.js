import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

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
  render: h => h(App)
}).$mount('#app')
