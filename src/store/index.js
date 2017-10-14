import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  //Login 用户ID，登录名
  id:'',
  userName:'',
  //Main 跳转方向
  viewDirection:'',
  //Music二级导航
  navIndex:'',
  //recommend
  banners:[],
  sheets:[],
  soles:[],
  newmusics:[],
  mvs:[],
  columns:[],
  radios:[],
  //sheet
  allSheets:[],
  //radios
  radioCategorys:[],
  //List
  musics:[],
  //aplayer
  musicDetail:[],
  musicUrl:[],
  //search
  searchTxt:'',
  historys:[],
  searchList:[]
}


export default new Vuex.Store({
  state,
  mutations,
  actions
})
