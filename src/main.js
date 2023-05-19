import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import vant 组件
import Vant from 'vant'
import 'vant/lib/index.css';

// import iconfont 图标
import '@/assets/iconfont/iconfont.css'
import '@/permission' // 权限控制







Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
