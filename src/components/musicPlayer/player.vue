<template>
  <div class="player">
    <img class="backgroundImg" :src="musicInfo.pic"/>
    <div class="player-main">
      <div class="player-head">
        <a><i class="fa-angle-left" @click="goBack"></i></a>
        <p>
          <b>{{musicInfo.title}}</b>
          <em>{{musicInfo.author}}</em>
        </p>
        <a><i class="fa-share-alt"></i></a>
      </div>

      <transition name="fade">
        <div v-if="!playerLyricShow" class="player-animation" :style="screenHeight">
          <div class="player-picshow">
            <div class="player-animation-gan"></div>
            <div class="player-animation-pan">
              <img :src="musicInfo.pic"/>
            </div>
          </div>
          <div class="songsInfo">
            <el-row :gutter="5">
              <el-col :span="6">
                <i class="fa-heart" @click="likeSong"></i>
              </el-col>
              <el-col :span="6">
                <a :href="musicInfo.url"><i class="fa-download"></i></a>
              </el-col>
              <el-col :span="6">
                <router-link to="/"><i class="fa-comments-o"></i></router-link>
              </el-col>
              <el-col :span="6">
                <i class="fa-ellipsis-v"></i>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- <Lyric></Lyric> -->
      </transition>

      <div class="player-control">
        <div class="player-process">
          <b>{{songCurrentTime}}</b>
          <div class="player-progress">
            <div class="player-progress-download"></div>
            <div class="player-progress-play"></div>
            <div v-if="isBuffering" class="player-progress-loading"></div>
            <div v-if="!isBuffering" class="play-progress-btn"></div>
          </div>
          <b>{{songDuration}}</b>
        </div>
        <div class="player-control">
          <i :class="{'fa-random' : playerMode == 'Random','fa-recycle' : playerMode == 'Recycle','fa-refresh' : playerMode == 'Single'}"></i>
          <div class="play-control-main">
            <a @click="btnPrev"><i class="fa-step-backward"></i></a>
            <a @click="btnPlay"><i :class="playStatus ? 'fa-pause-circle' : 'fa-play-circle'"></i></a>
            <a @click="btnNext"><i class="fa-step-forward"></i></a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';
export default{
  data() {
    return {
      playerLyricShow:false,
      screenHeight:{
        height: window.screen.height - 60 + 'px'
      }
    }
  },
  created() {
    this.$store.commit("playerShow",false);
  },
  computed: {
    ...mapState([
      "musicInfo","isBuffering","playerMode","playStatus","songCurrentTime","songDuration"
    ])
  },
  methods: {
    btnPrev() {

    },
    btnPlay() {

    },
    btnNext() {

    },
    likeSong() {

    },
    goBack() {
      this.$router.back(-1);
      this.$store.commit("playerShow",true);
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/css/public.less';

.player{
  width:100%;
  height:100%;
  position: relative;
  z-index:10000;
  .backgroundImg{
    width:100%;
    height:100%;
    -o-filter:blur(100px);-moz-filter:blur(100px);-webkit-filter:blur(100px);-ms-filter:blur(100px);filter:blur(100px);
    position: absolute;
    z-index:10000;
  }
  .player-main{
    width:100%;
    height:100%;
    z-index:10001;
    position: relative;
    .player-head{
      width:100%;
      height:60px;
      background:url("../../assets/image/line.png") no-repeat 0 bottom;
      a{
        width:50px;
        height:100%;
        float:left;
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          font-size:18px;
          color:#FFF;
        }
      }
      p{
        width:calc(~"100% - 100px");
        height:100%;
        float:left;
        display: flex;
        flex-direction:column;
        justify-content: center;
        b{
          width:100%;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          font-size:@font-size;
          color:#FFF;
          line-height:24px;
        }
        em{
          width:100%;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          font-size:@font-size - 2px;
          font-style: normal;
          color:#f2f2f2;
          line-height:20px;
        }
      }
    }
    .player-animation{
      width:100%;
      position: relative;
      .player-picshow{
        width:100%;
        height:calc(~"100% - 170px");
        position: relative;
        overflow: hidden;
        .player-animation-gan{
          width:63px*1.4;
          height:97px*1.4;
          background:url("../../assets/image/gan.png") no-repeat;
          position: absolute;
          top:-10px;
          left:calc(~"50% - 15px");
          z-index:999;
          background-size: 100% 100%;
          position:absolute;
          -webkit-transition: transform .5s;
          -moz-transition: transform .5s ;
          -ms-transition: transform .5s ;
          -o-transition: transform .5s ;
          transition: transform .5s ;
          transform-origin: 0.8125rem 0.8125rem;
        }
        .player-animation-gan.pausing {
          transform: rotate(-25deg);
        }
        .player-animation-gan.pausing {
          -webkit-animation-play-state: paused;
          -moz-animation-play-state: paused;
          -o-animation-play-state: paused;
          animation-play-state: paused;
        }
        .player-animation-pan{
          width:280px;
          height:280px;
          background:url("../../assets/image/pan.png") no-repeat;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position:absolute;
          top:calc(~"50% - 140px");
          left:calc(~"50% - 140px");
          -webkit-animation: disketteRotate 20s linear infinite;
          -o-animation: disketteRotate 20s linear infinite;
          animation: disketteRotate 20s linear infinite;
          -webkit-animation-play-state: running;
          -moz-animation-play-state: running;
          -o-animation-play-state: running;
          animation-play-state: running;
          img{
            width:200px;
            height:200px;
            border-radius:50%;
            overflow:hidden;
            position: absolute;
          }
        }
      }
      .songsInfo{
        width:80%;
        padding:0 10%;
        height:40px;
        .el-col{
          display: flex;
          justify-content: center;
          align-items: center;
          i{
            color:#FFF;
            font-size:@font-size*1.5;
          }
        }
      }
    }
  }
}

@-webkit-keyframes disketteRotate {
    from {
      -webkit-transform: rotate3d(0, 0, 1, 0deg);
      -moz-transform: rotate3d(0, 0, 1, 0deg);
      -ms-transform: rotate3d(0, 0, 1, 0deg);
      -o-transform: rotate3d(0, 0, 1, 0deg);
      transform: rotate3d(0, 0, 1, 0deg);
    }
    to {
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
      -moz-transform: rotate3d(0, 0, 1, 360deg);
      -ms-transform: rotate3d(0, 0, 1, 360deg);
      -o-transform: rotate3d(0, 0, 1, 360deg);
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
  @keyframes disketteRotate {
    from {
      -webkit-transform: rotate3d(0, 0, 1, 0deg);
      -moz-transform: rotate3d(0, 0, 1, 0deg);
      -ms-transform: rotate3d(0, 0, 1, 0deg);
      -o-transform: rotate3d(0, 0, 1, 0deg);
      transform: rotate3d(0, 0, 1, 0deg);
    }
    to {
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
      -moz-transform: rotate3d(0, 0, 1, 360deg);
      -ms-transform: rotate3d(0, 0, 1, 360deg);
      -o-transform: rotate3d(0, 0, 1, 360deg);
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
</style>
