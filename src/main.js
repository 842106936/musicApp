// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import API from './api'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import MuseUI from 'muse-ui'
import VueLazyLoad from 'vue-lazyload'
import NProgress from 'nprogress'
import BScroll from 'better-scroll'
import './assets/font/iconfont.css'
import './assets/font/lyicon.css'
import vueFeedback from 'vue-feedback'

/*开启debug模式*/
Vue.config.debug = true
/*关闭开发模式或生产模式提醒*/
Vue.config.productionTip = false

/*图片懒加载*/
import errorImg from './assets/image/error.jpg'
import loadingImg from './assets/image/loading.gif'
Vue.use(VueLazyLoad, {
  preload: 1.3,
  error: errorImg,
  loading: loadingImg,
  attempt: 1,
  listenEvents: [ 'scroll', 'mouseWheel']
});

Vue.use(ElementUI)
Vue.use(Mint)
Vue.use(MuseUI)
Vue.use(vueFeedback)

/*进度条*/
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

//鼠标点击波纹效果
Vue.directive('pop', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, e) {
      var posX = el.offsetLeft,
          posY = el.offsetTop,
          buttonWidth = el.offsetWidth,
          buttonHeight = el.offsetHeight;

      if (buttonWidth >= buttonHeight) {
          buttonHeight = buttonWidth;
      } else {
          buttonWidth = buttonHeight;
      }

      function addClass(obj, cls){
          var obj_class = obj.className;//获取 class 内容.
          var blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
          var added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
          obj.className = added;//替换原来的 class.
      }
      function removeClass(obj, cls){
        var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
        obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
        var removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
        obj.className = removed;//替换原来的 class.
      }
      //鼠标点击波纹效果
      el.onclick = function(el, event){
        var e = event || window.event;
        var x = e.pageX - posX - buttonWidth / 2;
        var y = e.pageY - posY - buttonHeight / 2;
        if(this.getElementsByClassName('ripple').length == 0){
          var newdiv=document.createElement("span");
          this.appendChild(newdiv);
          addClass(newdiv,"ripple");
          this.setAttribute('style','position:relative; overflow:hidden;');
        }
        let ripple = this.querySelector('.ripple');
        ripple.setAttribute('style','width:'+ buttonWidth + 'px;height:' + buttonHeight + 'px;top:' + y + 'px;left:' + x +'px;');
        addClass(ripple,"rippleEffect");
        setTimeout(function(){
          removeClass(ripple,"rippleEffect");
        },400)
      }
  }
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  const list = ['/Mine', '/Music', '/Dynamic'];    // 将需要切换效果的路由名称组成一个数组
  const toName = to.path;    // 即将进入的路由名字
  const fromName = from.path;    // 即将离开的路由名字
  const toIndex = list.indexOf(toName);    // 进入下标
  const fromIndex = list.indexOf(fromName);   // 离开下标
  let direction = '';
  if (toIndex > -1 && fromIndex > -1) {   // 如果下标都存在
    if (toIndex < fromIndex) {  // 如果进入的下标小于离开的下标，那么是左滑
      direction = 'left'
    } else {
      direction = 'right' // 如果进入的下标大于离开的下标，那么是右滑
    }
    store.commit("playerShow",true);
  }else if (toName == '/player') {
    direction = 'slide-bottom'
    store.commit("playerShow",false);
  }else{
    store.commit("playerShow",true);
  }

 store.state.viewDirection = direction;
 //store.dispatch('viewDirection',direction); //这里使用vuex进行赋值

 next();
})

router.afterEach(() => {
  NProgress.done();
})

//生产环境全域名
Vue.prototype.HOST = 'http://musicapi.leanapp.cn'
//开发环境服务器代理（若跨域）
// Vue.prototype.HOST = '/api'
// Vue.prototype.HOST = '/nodeApi'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
