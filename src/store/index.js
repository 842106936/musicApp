import Vue from 'vue'
import Vuex from 'vuex'
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
  musicPlay:false,
  //search
  searchTxt:'',
  historys:[],
  searchList:[]
}

const mutations = {
  id: function (state, data) {
    state.id = data;
  },
  userName: function (state, data) {
    state.userName = data;
  },
  viewDirection: function (state, data) {
    state.viewDirection = data;
  },
  navIndex: function (state, data) {
    state.navIndex = data;
  },
  banners: function (state, data) {
    state.banners = data;
  },
  sheets: function (state, data) {
    state.sheets = data;
  },
  soles: function (state, data) {
    state.soles = data;
  },
  newmusics: function (state, data) {
    state.newmusics = data;
  },
  mvs: function (state, data) {
    state.mvs = data;
  },
  columns: function (state, data) {
    state.columns = data;
  },
  radios: function (state, data) {
    state.radios = data;
  },
  allSheets: function (state, data) {
    state.allSheets = data;
  },
  radioCategorys: function (state, data) {
    state.radioCategorys = data;
  },
  musics: function (state, data) {
    state.musics = data;
  },
  musicDetail: function (state, data) {
    state.musicDetail = data;
  },
  musicUrl: function (state, data) {
    state.musicUrl = data;
  },
  musicPlay: function (state, data) {
    state.musicPlay = data;
  },
  searchTxt: function (state, data) {
    state.searchTxt = data;
  },
  historys: function (state, data) {
    state.historys = data;
  },
  searchList: function (state, data) {
    state.searchList = data;
  }
}

const actions = {
  id: function (state, data) {
      state.commit('id', data);
  },
  userName: function (state, data) {
      state.commit('userName', data);
  },
  viewDirection: function (state, data) {
      state.commit('viewDirection', data);
  },
  navIndex: function (state, data) {
      state.commit('navIndex', data);
  },
  banners: function (state, data) {
      state.commit('banners', data);
  },
  sheets: function (state, data) {
      state.commit('sheets', data);
  },
  soles: function (state, data) {
      state.commit('soles', data);
  },
  newmusics: function (state, data) {
      state.commit('newmusics', data);
  },
  mvs: function (state, data) {
      state.commit('mvs', data);
  },
  columns: function (state, data) {
      state.commit('columns', data);
  },
  radios: function (state, data) {
      state.commit('radios', data);
  },
  allSheets: function (state, data) {
      state.commit('allSheets', data);
  },
  radioCategorys: function (state, data) {
      state.commit('radioCategorys', data);
  },
  musics: function (state, data) {
      state.commit('musics', data);
  },
  musicDetail: function (state, data) {
      state.commit('musicDetail', data);
  },
  musicUrl: function (state, data) {
      state.commit('musicUrl', data);
  },
  musicPlay: function (state, data) {
      state.commit('musicPlay', data);
  },
  searchTxt: function (state, data) {
      state.commit('searchTxt', data);
  },
  historys: function (state, data) {
      state.commit('historys', data);
  },
  searchList: function (state, data) {
      state.commit('searchList', data);
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
