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
    commit('musicInfo', data);
  },
  //自动播放下一首
  autoNextMusic({state, commit, dispatch}) {
    if(state.playerMode == 'Recycle'){
      if(state.songIndex == state.playerList.List.length - 1){
        dispatch('musicInfo', state.playerList.List[0]);
        state.songIndex = 0;
      }else{
        dispatch('musicInfo', state.playerList.List[state.songIndex + 1]);
        state.songIndex += 1
      }
      console.log("循环播放")
    }else if(state.playerMode == 'Single'){
      dispatch('musicInfo', '');
      var timer = setTimeout(function() {
          dispatch('musicInfo', state.playerList.List[state.songIndex]);
          clearTimeout(timer);
      }, 1000)
      console.log("单曲循环")
    }else if(state.playerMode == 'Random'){
      var startRange = 0;
      var endRange = state.playerList.List.length;
      var randomNumber = Math.floor(Math.random() * (endRange - startRange) + startRange);
      console.log(randomNumber);
      if(randomNumber == state.songIndex) {
          dispatch('musicInfo', state.playerList.List[0]);
          state.songIndex = 0;
      }else{
        dispatch('musicInfo', state.playerList.List[randomNumber]);
        state.songIndex = randomNumber;
      }
      console.log("随机循环")
    }
  },
  prevMusic({state, commit, dispatch}){
    if(state.playerMode == 'Recycle'){
      if(state.songIndex == 0){
        dispatch('musicInfo', state.playerList.List[state.playerList.List.length - 1]);
        state.songIndex = 0;
      }else{
        dispatch('musicInfo', state.playerList.List[state.songIndex - 1]);
        state.songIndex -= 1
      }
      console.log("循环播放")
    }else if(state.playerMode == 'Single'){
      dispatch('musicInfo', '');
      var timer = setTimeout(function() {
          dispatch('musicInfo', state.playerList.List[state.songIndex]);
          clearTimeout(timer);
      }, 1000)
      console.log("单曲循环")
    }else if(state.playerMode == 'Random'){
      var startRange = 0;
      var endRange = state.playerList.List.length;
      var randomNumber = Math.floor(Math.random() * (endRange - startRange) + startRange);
      console.log(randomNumber);
      if(randomNumber == state.songIndex) {
          dispatch('musicInfo', state.playerList.List[0]);
          state.songIndex = 0;
      }else{
        dispatch('musicInfo', state.playerList.List[randomNumber]);
        state.songIndex = randomNumber;
      }
      console.log("随机循环")
    }
  },
  //将歌曲收藏到歌单
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
