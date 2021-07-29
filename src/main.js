// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import "../settings.js";
import echarts from 'echarts'
import 'echarts/theme/dark.js'
import ElementUI from 'element-ui'

//全局变量挂载到Vue.prototype上
import global from '../src/components/global'

// 相当于在所有页面引入语音图标的iconfont
import './assets/styles/iconfont.css';
import './assets/iconfont.js';
import './assets/iconfont3.js';
import './assets/iconfont7.js';
import VueSocketIO from 'vue-socket.io';
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css';
// import gallery from 'img-vuer';
// Vue.use(gallery);
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

//将外部语音模块包引入
import Recorder from 'js-audio-recorder';

Vue.prototype.Recorder = Recorder
Vue.prototype.GLOBAL = global

Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    "inline": true,
    "button": true,
    "navbar": true,
    "title": true,
    "toolbar": true,
    "tooltip": true,
    "movable": true,
    "zoomable": true,
    "rotatable": true,
    "scalable": true,
    "transition": true,
    "fullscreen": true,
    "keyboard": true,
    "url": "data-source"
  }
});

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
axios.defaults.timeout = 8000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false


Vue.use(new VueSocketIO({
  connection: 'http://116.62.108.210:8081'
}));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
