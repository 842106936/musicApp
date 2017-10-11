<template>
  <div v-if="flag" class="MusicPlayer">
    <router-link class="img" to="/">
      <img :src="songs.pic">
    </router-link>
    <div class="info">
      <p class="title">{{songs.title}}</p>
      <p class="author">{{songs.author}}</p>
    </div>
    <div class="btn">
      <a @click="btnPlay"><i :class="play ? 'fa-pause-circle' : 'fa-play-circle'"></i></a>
      <a><i class="fa-indent"></i></a>
    </div>

    <audio id="audio" :src="songs.url" controls="controls"></audio>
  </div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';

export default{
  data() {
    return {
      songs:[],
      musicPlay:this.$store.state.musicPlay,
      play:false
    }
  },
  computed: {
    ...mapState([
      "musicDetail","musicUrl"
    ]),
    audio () {
      return document.querySelector('#audio');
    },
    flag() {
      if(this.musicDetail != '' && this.musicUrl != ''){
        return true;
      }else{
        return false;
      }
    }
  },
  watch: {
    musicUrl() {
      this.init();
      this.play = false;
    }
  },
  methods: {
    init() {
      if(this.musicDetail != '' && this.musicUrl != ''){
        this.songs = {
          title: this.musicDetail.songs[0].name,
          author: this.musicDetail.songs[0].ar[0].name,
          url: this.musicUrl,
          pic: this.musicDetail.songs[0].al.picUrl
        }
      }
    },
    btnPlay() {
      if(this.play){
        this.play = false;
        this.audio.pause();
      }else{
        this.play = true;
        this.audio.play();
      }
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
  z-index:99999999999999;
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
  audio{

  }
</style>
