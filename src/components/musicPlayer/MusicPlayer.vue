<template>
  <div v-show="flag && playerShow" class="MusicPlayer">
    <router-link class="img" :to="{ name: 'player'}">
      <img :src="songs.pic">
    </router-link>
    <div class="info">
      <p class="title">{{songs.title}}</p>
      <p class="author">{{songs.author}}</p>
    </div>
    <div class="btn">
      <a @click="btnPlay"><i :class="playStatus ? 'fa-pause-circle' : 'fa-play-circle'"></i></a>
      <a @click="showPlayerList = true"><i class="fa-indent"></i></a>
    </div>

    <player-list :showPlayerList="showPlayerList" @close="close"></player-list>

    <audio id="audio" :src="songs.url" controls="controls" ref="player" @ended="autoPlayNext" @loadedmetadata="durationTime" @timeupdate="updateTime" @waiting="bufferingTrue" @canplay="bufferingFalse"></audio>
  </div>
</template>

<script>
import {mapState ,mapGetters} from 'vuex';
import playerList from './MusicPlayerList.vue'

export default{
  data() {
    return {
      showPlayerList:false,
      songs:[],
      listID:[]
    }
  },
  computed: {
    ...mapState([
      "playStatus",
      "musicInfo",
      "playerList",
      "songIndex",
      "playerShow",
      "commentType"
    ]),
    ...mapGetters([
      "change",
      "currentTime",
      "tmpCurrentTime",
      "rangeValue"
    ]),
    // rangeValue: {
    //   get() {
    //     return this.currentTime / this.durationTime * 100;
    //   },
    //   set(val) {
    //     console.log(123)
    //     this.$store.commit('setRangeValue', val)
    //   }
    // },
    audio() {
      return document.querySelector('#audio')
    },
    flag() {
      if(this.musicInfo != ''){
        return true;
      }else{
        return false;
      }
    }
  },
  watch: {
    musicInfo() {
      if(this.musicInfo != ''){
        this.init();
      }
    },
    playStatus() {
      if(this.playStatus){
        document.querySelector('#audio').play();
      }else{
        document.querySelector('#audio').pause();
      }
    }
  },
  components:{
    'player-list':playerList
  },
  methods: {
    init() {
      //在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
      this.$nextTick(() => {
        if(!this.audio.paused){
          document.querySelector('#audio').pause();
          this.$store.commit("playStatus",false);
        }
      });
      return new Promise((resolve, reject) => {
        let audioID = '';
        if(this.commentType == 'dj'){
          audioID = this.musicInfo.dj;
        }else{
          audioID = this.musicInfo.id;
        }
        let params = {
          id : audioID
        }
        let url = this.HOST + "/music/url"
        this.axios.get(url,{params}).then(res => {
          this.songs = {
            id: this.musicInfo.id,
            title: this.musicInfo.title,
            author: this.musicInfo.author,
            url: res.data.data[0].url,
            pic: this.musicInfo.pic
          }
          resolve();
        })
      })
      .then(() => {
        this.$store.commit("musicURL",this.songs.url);
        document.querySelector('#audio').play();
        this.$store.commit("playStatus",true);
      })
      //判断播放列表中是否已经含有点击的歌曲
      .then(() => {
        let arr = new Array;
        for(var i=0;i<this.playerList.List.length;i++){
          arr.push(this.playerList.List[i].id);
        }
        this.listID = arr;
        let _index = this.listID.indexOf(this.musicInfo.id);
        console.log(this.listID);
        if(_index == -1){
          this.$store.commit("addItemToPlayList",this.songs);
        }else{
          this.$store.commit("sortItemToPlayList",_index);
        }
      })
    },
    close() {
      this.showPlayerList=false;
    },
    //播放器播放,暂停控制
    btnPlay() {
      if(this.playStatus){
        document.querySelector('#audio').pause();
        this.$store.commit("playStatus",false);
      }else{
        document.querySelector('#audio').play();
        this.$store.commit("playStatus",true);
      }
    },
    //自动播放下一首
    autoPlayNext() {
      this.$store.dispatch("autoNextMusic");
      console.log("播放结束")
    },
    //音乐总时长
    durationTime() {
      this.$store.commit("durationTime",this.audio.duration);
    },
    //当前播放时长
    updateTime() {
      var myaudio = document.querySelector('#audio');
      var time = parseInt(myaudio.currentTime);
      if (this.change) {
        myaudio.currentTime = this.tmpCurrentTime;
        this.$store.commit('setChange', false);
      } else {
        this.$store.commit("currentTime", time);
      }
    },
    //音频文件加载完成
    bufferingTrue() {
      this.$store.commit("isBuffering",true);
    },
    //音频文件加载未完成
    bufferingFalse() {
      this.$store.commit("isBuffering",false);
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/css/public.less';

.MusicPlayer{
  width:100%;
  height:50px;
  background:#FFF;
  position: fixed;
  bottom:0px;
  left:0px;
  z-index:1000;
  .img{
    width:40px;
    height:40px;
    padding:5px;
    overflow: hidden;
    display: block;
    float: left;
    img{
      width:100%;
      height: 100%;
    }
  }
  .info{
    width:calc(~"100% - 160px");
    padding:0 10px;
    height:100%;
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p{
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &.title{
        font-size:@font-size;
        font-weight:bold;
        color:#333;
        line-height:@font-size*1.2;
      }
      &.author{
        font-size:@font-size*0.8;
        color:#999;
        line-height:@font-size*1;
      }
    }
  }
  .btn{
    width:80px;
    padding:0 5px;
    height:100%;
    float: left;
    a{
      width:50%;
      height:inherit;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        font-size:@font-size*1.8;
      }
    }
  }
}

</style>
