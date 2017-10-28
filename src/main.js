// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueLazyLoad from 'vue-lazyload'
import NProgress from 'nprogress'
import BScroll from 'better-scroll'
import './assets/font/iconfont.css'
import './assets/font/lyicon.css'

import Main from './components/Main.vue'
import Login from './components/Login.vue'
import Show from './components/Show.vue'
import List from './components/List.vue'

import Search from './components/SearchMusic/Search.vue'
import SearchHistory from './components/SearchMusic/SearchHistory.vue'
import SearchList from './components/SearchMusic/SearchList.vue'

import PlayList from './components/PlayList.vue'
import RankList from './components/RankList.vue'

import Mine from './components/main/Mine.vue'
import Music from './components/main/Music.vue'
import Dynamic from './components/main/Dynamic.vue'

import recommend from './components/main/MusicPart/recommend.vue'
import sheet from './components/main/MusicPart/sheet.vue'
import radio from './components/main/MusicPart/radio.vue'
import rank from './components/main/MusicPart/rank.vue'

import historyList from './components/main/MinePart/HistoryList.vue'

import player from './components/musicPlayer/Player.vue'
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

Vue.use(Router)
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(Mint)

/*进度条*/
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

const router = new Router({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',
  routes: [
  {
    name:'Main',
    path: '/Main',
    alias:'/',
    component: Main,
    children:[
      {
        name:'Mine',
        path: '/Mine',
        component: Mine
      },{
        name:'Music',
        path: '/Music',
        alias:'/',
        component: Music,
        children: [
          {path: '/Music/recommend', alias:'/', component: recommend},
          {path: '/Music/sheet', component: sheet},
          {path: '/Music/radio', component: radio},
          {path: '/Music/rank', component: rank}
        ]
      },{
        name:'Dynamic',
        path: '/Dynamic',
        component: Dynamic
      }
    ]
  },
  {
    name:'Login',
    path:'/Login',
    component: Login
  },
  {
    name:'Search',
    path:'/Search',
    component: Search,
    children: [
      {path:'/Search/SearchHistory', alias:'/', component: SearchHistory},
      {path:'/Search/SearchList', component: SearchList}
    ]
  },
  {
    name:'Show',
    path: '/Show',
    component: Show
  },{
    name:'List',
    path: '/List',
    component: List
  },
  {
    name:'PlayList',
    path: '/PlayList/:id',
    component: PlayList
  },
  {
    name:'RankList',
    path: '/RankList/:idx',
    component: RankList
  },
  {
    name:'historyList',
    path: '/HistoryList',
    component: historyList
  },
  {
    name:'player',
    path: '/player',
    component: player
  }]
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
    if (toIndex < fromIndex) {          // 如果进入的下标小于离开的下标，那么是左滑
      direction = 'left'
    } else {
      direction = 'right'         // 如果进入的下标大于离开的下标，那么是右滑
    }
    store.commit("playerShow",true);
  }else if (toName == '/player' || from == '/player') {
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

Vue.prototype.HOST = '/api'

// Vue.prototype.MusicPlay = function(id) {
//   let getMusicDetail = (id) =>  {
//     var params = {
//       ids : id
//     };
//     var url = '/api/song/detail';
//     return axios.get(url,{params});
//   };
//   let getMusicUrl = (id) => {
//     var params = {
//       id : id
//     };
//     var url = '/api/music/url';
//     return axios.get(url,{params});
//   };
//   axios.all([getMusicDetail(id),getMusicUrl(id)]).then(axios.spread((Detail, Url) => {
//      this.$store.dispatch('musicDetail', Detail.data);
//      this.$store.dispatch('musicUrl', Url.data.data[0].url);
//     // store.dispatch('MusicPlay')
//   })).catch(error => {
//     console.log(error);
//   });
// }

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
