//    Action 提交的是 mutation，而不是直接变更状态。
//    Action 可以包含任意异步操作。
import axios from 'axios'
export default {
  id({state, commit}, data) {
      commit('USERID', data);
  },
  userName({state, commit}, data) {
      commit('USERNAME', data);
  },
  viewDirection({state, commit}, data) {
      commit('viewDirection', data);
  },
  navIndex({state, commit}, data) {
      commit('navIndex', data);
  },
  banners({state, commit}, data) {
      commit('BANNER', data);
  },
  sheets({state, commit}, data) {
      commit('sheets', data);
  },
  soles({state, commit}, data) {
      commit('soles', data);
  },
  newmusics({state, commit}, data) {
      commit('newmusics', data);
  },
  mvs({state, commit}, data) {
      commit('mvs', data);
  },
  columns({state, commit}, data) {
      commit('columns', data);
  },
  radios({state, commit}, data) {
      commit('radios', data);
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
  MusicPlay({store,commit}, id) {
    let getMusicDetail = (id) =>  {
      var params = {
        ids : id
      };
      var url = '/api/song/detail';
      return axios.get(url,{params});
    };
    let getMusicUrl = (id) => {
      var params = {
        id : id
      };
      var url = '/api/music/url';
      return axios.get(url,{params});
    };
    axios.all([getMusicDetail(id),getMusicUrl(id)]).then(axios.spread((Detail, Url) => {
      //store.dispatch('MUSIC_DETAIL', Detail.data);
      commit('MUSIC_DETAIL', Detail.data);
      //store.dispatch('MUSIC_URL', Url.data.data[0].url);
      commit('MUSIC_URL', Url.data.data[0].url);
    })).catch(error => {
      console.log(error);
    });
  }
}
