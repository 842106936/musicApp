//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。 this.$store.commit()
//Vuex 中的 mutation 非常类似于事件：
//每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
//这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
const MUSICINFO = 'MUSICINFO'

export default {
  viewDirection(state, data) {
    state.viewDirection = data;
  },
  navIndex(state, data) {
    state.navIndex = data;
  },
  banners(state, data) {
    state.banners = data;
  },
  sheets(state, data) {
    state.sheets = data;
  },
  soles(state, data) {
    state.soles = data;
  },
  newmusics(state, data) {
    state.newmusics = data;
  },
  mvs(state, data) {
    state.mvs = data;
  },
  columns(state, data) {
    state.columns = data;
  },
  radios(state, data) {
    state.radios = data;
  },
  allSheets(state, data) {
    state.allSheets = data;
  },
  radioCategorys(state, data) {
    state.radioCategorys = data;
  },
  musics(state, data) {
    state.musics = data;
  },
  musicPlay(state, data) {
    state.musicPlay = data;
  },
  searchTxt(state, data) {
    state.searchTxt = data;
  },
  historys(state, data) {
    state.historys = data;
  },
  searchList(state, data) {
    state.searchList = data;
  },
  //排行存储
  setRanks(state, data) {
    state.rankList.ranksID = data.ranksID;
    state.rankList.ranks = data.ranks;
  },
  //歌单存储
  setPlayLists(state, data) {
    state.playList.listsID = data.listsID;
    state.playList.lists = data.lists;
  },
  //底部播放器是否显示
  playerShow(state, data) {
    state.playerShow = data;
  },
  //当前正在播放音频的总时长
  songDuration(state, data) {
    state.songDuration = data;
  },
  //当前正在播放音频的播放时间
  songCurrentTime(state, data) {
    state.songCurrentTime = data;
  },
  //音频是否在缓冲状态
  isBuffering(state, data) {
    state.isBuffering = data;
  },
  //当前播放歌曲信息
  musicInfo(state, data) {
    state.musicInfo = data
  },
  //当前播放url
  musicURL(state, data) {
    state.musicURL = data
  },
  //音频是否播放
  playStatus(state, data) {
    state.playStatus = data;
  },
  //将单曲加入播放列表
  addItemToPlayList(state, songs) {
    state.playerList.List.unshift(songs)
  },
  //将单曲加入播放列表（如果播放列表中含有该歌曲，将该歌曲的索引变为0）
  sortItemToPlayList(state, i) {
    // return new Promise((resolve, reject) => {
    //   state.playerList.List.unshift(state.playerList.List[i]);
    //   resolve();
    // })
    // .then(() => {
    //   state.playerList.List.splice(i+1, 1);
    // })
    state.songIndex = i;
  },
  //将单曲从播放列表移除
  removeItemFromPlayList(state, index) {
    state.playerList.List.splice(index, 1);
  },
  //清空播放列表
  trashPlayerList(state) {
    state.playerList = {
      id:[],
      List:[]
    };
  },
  //存储加入播放列表歌单的Id，以判断歌单是否重复
  addListID(state,id) {
    state.playerList.id.push(id);
  },
  //将歌单加入播放列表
  addListToPlayerList(state, Lists) {
    state.playerList.List = Lists.concat(state.playerList.List);
  },
  //播放器播放列表的播放模式
  changePlayerMode(state) {
    if(state.playerMode == 'Recycle'){
      state.playerMode = 'Random';
    }else if(state.playerMode == 'Random'){
      state.playerMode = 'Single';
    }else if(state.playerMode == 'Single'){
      state.playerMode = 'Recycle';
    }
  },
  //评论分页的当前页
  commentOffset(state, data) {
    state.commentOffset = data;
  },
  //评论
  commentOffset(state, data) {
    state.commentOffset = data;
  }
}
