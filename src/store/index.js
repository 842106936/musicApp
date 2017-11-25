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
  //排行榜详情列表
  rankList:{
    ranksID:'',
    ranks:[]
  },
  //歌单详情列表
  playList:{
    listsID:'',
    lists:[]
  },
  //电台详情列表
  djInfo:{
    djID:'',
    djRadio:[],
    djList:[]
  },
  searchTxt:'', //检索词
  historys:[], //搜索历史
  searchList:[], //热门搜索
  //播放器
  playerShow:true,
  isBuffering:false, //音频是否在缓冲状态
  change: false,  // 判断是更改的时间还是播放的时间
  currentTime: 0, //当前正在播放音频的播放时间
  tmpCurrentTime: 0,
  durationTime: 0, //当前正在播放音频的总时长
  playStatus:false, //音频是否播放
  musicInfo:[], //当前播放音乐信息
  musicURL:'',
  playerMode:'Recycle', //播放模式 Recycle循环播放，Random随机播放，Single单曲循环
  songIndex: 0, //当前播放歌曲在播放列表中的索引
  playerList:{
    id:[], //已加入播放列表的歌单id
    List:[] //播放列表
  },
  commentType:'', //评论类型
  //评论
  comment:{
    commentsTotal:'', //评论数
    hotComments:[], //热门评论
    comments:[] //最新评论
  }
}
const getters = {
  change: state => state.change,
  currentTime: state => state.currentTime,
  durationTime: state => state.durationTime,
  tmpCurrentTime: state => state.tmpCurrentTime,
  rangeValue: state => {
    return state.currentTime / state.durationTime * 100;
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
