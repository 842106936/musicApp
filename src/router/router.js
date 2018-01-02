import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../components/Main.vue'
import Login from '../components/Login.vue'
import List from '../components/List.vue'

import Search from '../components/SearchMusic/Search.vue'
import SearchHistory from '../components/SearchMusic/SearchHistory.vue'
import SearchList from '../components/SearchMusic/SearchList.vue'

import PlayList from '../components/PlayList.vue'
import RankList from '../components/RankList.vue'
import DJList from '../components/DJList.vue'

import Mine from '../components/main/Mine.vue'
import Music from '../components/main/Music.vue'
import Dynamic from '../components/main/Dynamic.vue'

import recommend from '../components/main/MusicPart/recommend.vue'
import sheet from '../components/main/MusicPart/sheet.vue'
import radio from '../components/main/MusicPart/radio.vue'
import rank from '../components/main/MusicPart/rank.vue'

import historyList from '../components/main/MinePart/HistoryList.vue'

import player from '../components/musicPlayer/Player.vue'
import comment from '../components/comment/comment.vue'

import mvPlayer from '../components/mvPlayer/mvPlayer.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
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
    name: 'List',
    path: '/List',
    component: List
  },
  {
    name: 'PlayList',
    path: '/PlayList/:id',
    component: PlayList
  },
  {
    name: 'RankList',
    path: '/RankList/:idx',
    component: RankList
  },
  {
    name: 'DJList',
    path: '/DJList/:id',
    component: DJList
  },
  {
    name: 'historyList',
    path: '/HistoryList',
    component: historyList
  },
  {
    name: 'player',
    path: '/player',
    component: player
  },
  {
    name: 'comment',
    path: '/comment/:id/:type',
    component: comment
  },{
    name: 'mvPlayer',
    path: '/mvPlayer',
    component: mvPlayer
  }],
  //让页面滚动到顶部,第三个参数(history模式下) savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
