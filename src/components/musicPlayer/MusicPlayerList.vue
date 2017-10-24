<template>
  <div class="music-player-list">
    <transition name="fade">
      <div v-if="showPlayerList" class="dialog" @click="close"></div>
    </transition>
    <transition name="up">
      <div v-if="showPlayerList" class="player-list">
        <div class="player-list-head">
          <div class="player-list-head-left" @click="changePlayerMode">
            <i :class="{'fa-random' : playerMode == 'Random','fa-recycle' : playerMode == 'Recycle','fa-refresh' : playerMode == 'Single'}"></i>
            <p>
              {{playerModeTips}}
              ({{playerListAmount}})
            </p>
          </div>
          <div class="player-list-head-right">
            <div class="tracks">
              <i class="fa-folder"></i>
              <p>收藏</p>
            </div>
            <div class="trash" @click="trashPlayerList">
              <i class="fa-trash"></i>
              <p>清空</p>
            </div>
          </div>
        </div>
        <div class="player-list-content">
          <ul>
            <li v-for="(item,index) in playerList.List" :key="item.id" @click="MusicPlay(item)">
              <p><em>{{item.title}}</em><em>{{item.author}}</em></p>
              <i class="fa-times" @click.stop="remove(index)"></i>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';
export default{
  props:{
    showPlayerList: {
      type:Boolean,
      default:false
    }
  },
  computed: {
    ...mapState([
      'playerMode','playerList'
    ]),
    playerModeTips() {
      switch (this.playerMode) {
        case 'Random':
          return '随机播放';
          break;
        case 'Recycle':
          return '循环播放';
          break;
        case 'Single':
          return '单曲循环';
          break;
        default: '循环播放'
      }
    },
    playerListAmount() {
      return this.playerList.List.length;
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    remove(index) {
      this.$store.commit('removeItemFromPlayList', index);
    },
    ...mapMutations([
      "trashPlayerList","changePlayerMode"
    ]),
    MusicPlay(item) {
      let arr = {
        id:item.id,
        title : item.title,
        author : item.author,
        url: item.url,
        pic : item.pic
      }
      this.$store.dispatch('musicInfo', arr);
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/css/public.less';

.music-player-list{
  width:100%;
  height:100%;
  .dialog{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.3);
    opacity:1;
  }
  .player-list{
    width:100%;
    height:62%;
    position:fixed;
    bottom:0;
    left:0;
    background:#FFF;
    .player-list-head{
      width:calc(~"100% - 20px");
      height:60px;
      padding:0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .player-list-head-left{
        display: flex;
        align-items: center;
        i{
          font-size:16px;
          color:#333;
        }
        p{
          font-size:14px;
          line-height:60px;
          color:#333;
          margin-left:5px;
        }
      }
      .player-list-head-right{
        width:130px;
        height:100%;
        div{
          width:50px;
          height:100%;
          float: left;
          margin-left:15px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          i{
            font-size:14px;
            color:#333;
          }
          p{
            font-size:14px;
            line-height:60px;
            color:#333;
          }
        }
      }
    }
    .player-list-content{
      width:100%;
      height:calc(~"100% - 60px");
      position: relative;
      overflow-y: scroll;
      ul{
        width:100%;
        height:100%;
        li{
          width: calc(~"100% - 20px");
          padding:10px;
          border-top:1px solid #f7f7f7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p{
            width:calc(~"100% - 20px");
            white-space: nowrap;
            text-overflow:ellipsis;
            overflow: hidden;
            em:nth-child(1){
              font-size:14px;
              color:#333;
              line-height:30px;
              font-style: normal;
            }
            em:nth-child(2){
              font-size:12px;
              color:#666;
              line-height:30px;
              font-style: normal;
              margin-left:5px;
            }
          }
          i{
            font-size:14px;
            color:#333;
          }
        }
      }
    }
  }
}
</style>
