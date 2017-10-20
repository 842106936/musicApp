//    Action 提交的是 mutation，而不是直接变更状态。 this.$store.dispatch()
//    Action 可以包含任意异步操作。
import axios from 'axios'
export default {
  viewDirection({state, commit}, data) {
      commit('viewDirection', data);
  },
  navIndex({state, commit}, data) {
      commit('navIndex', data);
  },
  allSheets({state, commit}, data) {
      commit('allSheets', data);
  },
  radioCategorys({state, commit}, data) {
      commit('radioCategorys', data);
  },
  musics({state, commit}, data) {
      commit('musics', data);
  },
  musicPlay({state, commit}, data) {
      commit('musicPlay', data);
  },
  searchTxt({state, commit}, data) {
      commit('searchTxt', data);
  },
  historys({state, commit}, data) {
      commit('historys', data);
  },
  searchList({state, commit}, data) {
      commit('searchList', data);
  },
  musicInfo({state,commit}, data) {
    commit('musicInfo', data)
  },
  autoNextMusic({state, commit, dispatch}) {
    if(state.songIndex < state.playerList.List.length-1){
      state.songIndex += 1
    }else{
      state.songIndex = 0;
    }
    commit('musicInfo', state.playerList.List[state.songIndex]);
  },
  tracksPlayerList({state,commit}, id) {
    const params = {
      op:add,
      pid:state.pid,
      tracks:id
    }
    const url = "/api/music/url";
    axios.get(url,{params}).then(res => {

    })
  }
}
