//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
//Vuex 中的 mutation 非常类似于事件：
//每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
//这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
const USERID = 'USERID'
const USERNAME = 'USERNAME'
const BANNER = 'BANNER'
const MUSIC_DETAIL = 'MUSIC_DETAIL'
const MUSIC_URL = 'MUSIC_URL'

export default {
  [USERID](state, data) {
    state.id = data;
  },
  [USERNAME](state, data) {
    state.userName = data;
  },
  viewDirection(state, data) {
    state.viewDirection = data;
  },
  navIndex(state, data) {
    state.navIndex = data;
  },
  [BANNER](state, data) {
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
  [MUSIC_DETAIL](state, data) {
    state.musicDetail = data
  },
  [MUSIC_URL](state, data) {
    state.musicUrl = data
  }
}
