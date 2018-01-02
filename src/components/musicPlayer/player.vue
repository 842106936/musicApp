<template>
  <div class="player" :style="{'height': screenHeigth}">
    <img class="backgroundImg" :src="musicInfo.pic"/>
    <div class="player-main">
      <div class="player-head">
        <a><i class="fa-angle-left" @click="$router.back(-1)"></i></a>
        <p>
          <b>{{musicInfo.title}}</b>
          <em>{{musicInfo.author}}</em>
        </p>
        <a><i class="fa-share-alt"></i></a>
      </div>

      <div class="player-box">
        <transition-group name="fade">
          <div v-show="!playerLyricShow" @click="playerLyricShow = true" class="player-animation" :style="screenHeight" v-cloak key="1">
            <div class="player-picshow">
              <div class="player-animation-gan" :class="{'pausing':!playStatus}"></div>
              <div class="player-animation-pan" :class="{'pausing':!playStatus}">
                <img :src="musicInfo.pic"/>
              </div>
            </div>
            <div class="songsInfo">
              <el-row :gutter="5">
                <el-col :span="6">
                  <i class="fa-heart" :style="{'color': fontcolor}" @click="likeSong"></i>
                </el-col>
                <el-col :span="6">
                  <a :href="musicURL" :download="musicInfo.title"><i class="fa-download"></i></a>
                </el-col>
                <el-col :span="6">
                  <router-link :to="{ name: 'comment', params: {id: musicInfo.id, type: commentType}}">
                    <el-badge :value="comment.commentsTotal" :max="999">
                      <i class="fa-comments-o"></i>
                    </el-badge>
                  </router-link>
                </el-col>
                <el-col :span="6">
                  <i class="fa-ellipsis-v"></i>
                </el-col>
              </el-row>
            </div>
          </div>
          <Lyric @closeLyric="closeLyric" v-show="playerLyricShow" key="2"></Lyric>
        </transition-group>
      </div>


      <div class="player-control">
        <div class="player-process">
          <b>{{currentTime | transformTime}}</b>
          <div class="player-progress">
            <!-- <div class="player-progress-download"></div> -->
            <!-- <div id="program" class="player-progress-play" :style="{'width': playRange + '%'}">
              <div v-if="isBuffering" class="player-progress-loading"></div>
              <div v-if="!isBuffering" class="play-progress-btn"></div>
            </div> -->
            <mu-slider class="player-progress-play" @change="changeTime" v-model="rangeValue"/>
            <!-- <mt-range @change="changeTime" v-model="rangeValue"></mt-range> -->
          </div>
          <b>{{durationTime | transformTime}}</b>
        </div>
        <div class="play-control">
          <div class="play-control-btn">
            <i @click="changePlayerMode" :class="{'fa-random' : playerMode == 'Random','fa-recycle' : playerMode == 'Recycle','fa-refresh' : playerMode == 'Single'}"></i>
          </div>
          <div class="play-control-main">
            <i class="play-prev fa-step-backward" @click="btnPrev"></i>
            <i class="play-btn" :class="playStatus ? 'fa-pause-circle' : 'fa-play-circle'" @click="btnPlay"></i>
            <i class="play-next fa-step-forward" @click="btnNext"></i>
          </div>
          <div class="play-control-btn">
            <i class="fa-indent" @click="showPlayerList = true"></i>
          </div>
        </div>
      </div>
    </div>
    <player-list :showPlayerList="showPlayerList" @close="close"></player-list>
  </div>
</template>

<script>
import { Range } from 'mint-ui';
import {mapState ,mapMutations ,mapGetters} from 'vuex';
import playerList from './MusicPlayerList.vue';
import Lyric from './lyric.vue';

export default{
  name:'player',
  data() {
    return {
      fontcolor:'#fff',
      showPlayerList:false,
      playerLyricShow:false,
      screenHeight:{
        height: window.screen.availHeight - 180 + 'px'
      }
    }
  },
  created() {
    this.getComment();
  },
  watch: {
    musicInfo() {
      this.getComment();
    }
  },
  computed: {
    ...mapState([
      "musicInfo","musicURL","isBuffering","playerMode","playStatus","comment","commentType"
    ]),
    ...mapGetters([
      'currentTime','durationTime',"tmpCurrentTime"
    ]),
    rangeValue: {
      get() {
        return this.currentTime / this.durationTime * 100;
      },
      set(val) {
        //this.$store.commit('setRangeValue', val)
      }
    },
    screenHeigth() {
      return window.screen.availHeight + 'px';
    }
  },
  filters: {
    transformTime(time) {
      if (!time) return '00:00' //  避免传入undefined引发的错误
      var min = parseInt(time / 60)
      var sec = parseInt(time % 60)
      return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
    }
  },
  components:{
    'player-list': playerList,
    'Lyric': Lyric
  },
  methods: {
    ...mapMutations([
      "changePlayerMode"
    ]),
    btnPrev() {
      this.$store.dispatch("prevMusic");
    },
    btnPlay() {
      this.playStatus ? this.$store.commit("playStatus", false) : this.$store.commit("playStatus", true);
    },
    btnNext() {
      this.$store.dispatch("autoNextMusic");
    },
    close() {
      this.showPlayerList=false;
    },
    likeSong() {
      let params = {
        id: this.musicInfo.id
      }
      let url = this.HOST + '/like'
      this.axios.get(url,{params}).then(res => {
        if(res.code == 200){
          this.fontcolor = '#d7141e'
        }
      })
    },
    getComment() {
      let params = {
        id: this.musicInfo.id,
        limit: 20,
        offset: 0
      }
      let url = this.HOST + '/comment/' + this.commentType;
      this.axios.get(url,{params}).then(res => {
        this.$store.commit("addCommentsTotal",res.data.total);
        this.$store.commit("addHotComments",res.data.hotComments);
        this.$store.commit("addComments",res.data.comments);
      })
    },
    changeTime(value) {
      var time = (value * this.durationTime) / 100
      this.$store.commit('changeTime', time)
      this.$store.commit('setChange', true)
    },
    closeLyric() {
      this.playerLyricShow = false
    }
  }
}
</script>

<style>
.player-animation-pan{
  -webkit-animation: rotate 20s linear infinite;
  -moz-animation: rotate 20s linear infinite;
  -o-animation: rotate 20s linear infinite;
  animation: rotate 20s linear infinite;
}
@-webkit-keyframes rotate {
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
@keyframes rotate {
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
.player .el-badge__content{background-color:inherit !important; border:0px !important;}

.mu-slider-track,.mu-slider-fill {
  position: absolute;
  height: 100%;
  left: 0;
  background-color: #d43c33;
}
.mu-slider-thumb {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    background-color: #fff;
    color: #fff;
    border-radius: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    -webkit-transition: background .45s cubic-bezier(.23,1,.32,1),border-color .45s cubic-bezier(.23,1,.32,1),width .45s cubic-bezier(.23,1,.32,1),height .45s cubic-bezier(.23,1,.32,1);
    transition: background .45s cubic-bezier(.23,1,.32,1),border-color .45s cubic-bezier(.23,1,.32,1),width .45s cubic-bezier(.23,1,.32,1),height .45s cubic-bezier(.23,1,.32,1);
    cursor: pointer;
}
.mu-slider.zero .mu-slider-thumb {
    border: 2px solid #bdbdbd;
    color: #bdbdbd;
    background-color: #fff;
}
.mu-slider.active .mu-slider-thumb {
	width:20px;
	height:20px
}
</style>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/css/public.less';

.rotate(@name){
  @-webkit-keyframes @name {
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
  @keyframes @name {
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
}
.rotate(rotate);
.animation(@animation-name,@animation-duration,@animation-timing-function,@animation-iteration-count){
  -webkit-animation: @arguments;
  -moz-animation: @arguments;
  -ms-animation: @arguments;
  -o-animation:  @arguments;
  animation: @arguments;
}


.player{
  width:100%;
  overflow:hidden;
  position: absolute;
  top: 0;
  left:0;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  .backgroundImg{
    width:100%;
    height:100%;
    -o-filter:blur(100px) brightness(.8);-moz-filter:blur(100px) brightness(.8);-webkit-filter:blur(100px) brightness(.8);-ms-filter:blur(100px) brightness(.8);filter:blur(100px) brightness(.8);
    position: absolute;
    left:0px;
    top:0px;
  }
  .player-main{
    width:100%;
    height:100%;
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
    .player-box{
      width:100%;
      height:calc(~"100% - 180px");
      overflow:hidden;
      position: relative;
    }
    .player-animation{
      width:100%;
      height:100%;
      position: absolute;
      left:0;
      top:0;
      .player-picshow{
        width:100%;
        height:calc(~"100% - 40px");
        position: relative;
        overflow: hidden;
        transform-style:preserve-3d;
        perspective:800px;
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
          transform-origin: 0 0;
          &.pausing {
            transform: rotate(-25deg);
          }
        }
        .player-animation-pan{
          width:280px;
          height:280px;
          background:url("../../assets/image/pan.png") no-repeat center center;
          background-size: 101% 101%;
          border-radius:50%;
          overflow:hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          position:absolute;
          top:calc(~"50% - 130px");
          left:calc(~"50% - 140px");
          //.animation(rotate,20s,linear,infinite);
          -webkit-animation-play-state: running;
          -moz-animation-play-state: running;
          -o-animation-play-state: running;
          animation-play-state: running;
          &.pausing{
            -webkit-animation-play-state: paused;
            -moz-animation-play-state: paused;
            -o-animation-play-state: paused;
            animation-play-state: paused;
          }
          img{
            width:210px;
            height:210px;
            border-radius:50%;
            overflow:hidden;
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
    .player-control{
      width:100%;
      height:120px;
      .player-process{
        width:100%;
        height:50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        b{
          width:55px;
          height:100%;
          font-size:@font-size*0.8;
          font-style:normal;
          line-height:50px;
          text-align: center;
          color:#FFF;
        }
        .player-progress{
          width:calc(~"100% - 110px");
          height:6px;
          background:#eee;
          border-radius:3px;
          position:relative;
          .player-progress-download{
            width:100%;
            height:6px;
            background-color:#fff;
            border-radius:3px;
            position: absolute;
          }
          .player-progress-play{
            width:100%;
            padding:0 5px;
            box-sizing: border-box;
            height:6px;
            border-radius:3px;
            position: absolute;
            left:0px;
            top:0px;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            cursor: default;
            .player-progress-loading{
              position: absolute;
              right:0px;
              top:-5px;
              width:16px;
              height:16px;
              border-radius:50%;
              background:url("../../assets/image/loading.gif") no-repeat center center;
              background-size: 100% 100%;
            }
            .play-progress-btn{
              position: absolute;
              right:0px;
              top:-5px;
              width:16px;
              height:16px;
              border-radius:50%;
              background-color:#fff;
            }
          }
        }
      }
      .play-control{
        width:100%;
        height:70px;
        display: flex;
        .play-control-btn{
          width:60px;
          height:100%;
          display: flex;
          justify-content: center;
          align-items: center;
          i{
            font-size:@font-size*1.5;
            color:#fff;
          }
        }
        .play-control-main{
          width:calc(~"100% - 120px");
          height:100%;
          display: flex;
          justify-content:space-around;
          align-items: center;
          .play-prev{
            font-size:@font-size*2;
            color:#FFF;
          }
          .play-next{
            .play-prev
          }
          .play-btn{
            font-size:@font-size*2.5;
            color:#FFF;
          }
        }
      }
    }
  }
}
</style>
