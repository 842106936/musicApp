import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
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
  //ranks
  ranksID:'',
  ranks:[],
  //search
  searchTxt:'', //检索词
  historys:[], //搜索历史
  searchList:[], //热门搜索
  //aplayer
  playerShow:true,
  isBuffering:false, //音频是否在缓冲状态
  songCurrentTime: 0, //当前正在播放音频的播放时间
  songDuration: 0, //当前正在播放音频的总时长
  playStatus:false, //音频是否播放
  musicInfo:[], //当前播放音乐信息
  playerMode:'Recycle', //播放模式 Recycle循环播放，Random随机播放，Single单曲循环
  songIndex: 0, //当前播放歌曲在播放列表中的索引
  playerList:{
    id:[], //已加入播放列表的歌单id
    List:[] //播放列表
  }
}


export default new Vuex.Store({
  state,
  mutations,
  actions
})
