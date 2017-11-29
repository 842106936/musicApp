<template>
  <div class="play-list">

    <mt-header fixed :title="lists.name">
      <mt-button icon="back" slot="left" @click="$router.back(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div class="part-swipe">
      <img class="bg-img" :src="lists.coverImgUrl"/>
      <div class="swipe-box">
        <mt-swipe :auto="0" :show-indicators="false">
          <mt-swipe-item>
            <img class="swipe-img" :src="lists.coverImgUrl"/>
            <p>
              <b class="t1"><i class="fa-adn"></i>{{lists.name}}</b>
              <b class="t2">{{lists.description}}</b>
            </p>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <el-row class="icon-btn">
        <el-col :span="6">
          <i class="fa-calendar-plus-o"></i>
          <p v-if="lists.subscribedCount != null">{{lists.subscribedCount < 10000 ? lists.subscribedCount : parseInt(lists.subscribedCount/10000) + '万'}}</p>
        </el-col>
        <el-col :span="6">
          <router-link :to="{ name: 'comment', params: {id: $route.params.id, type: 'playlist'}}">
            <i class="fa-comments"></i>
            <p v-if="lists.commentCount != null">{{lists.commentCount < 10000 ? lists.commentCount : parseInt(lists.commentCount/10000) + '万'}}</p>
          </router-link>
        </el-col>
        <el-col :span="6">
          <i class="fa-share-alt"></i>
          <p v-if="lists.shareCount != null">{{lists.shareCount < 10000 ? lists.shareCount : parseInt(lists.shareCount/10000) + '万'}}</p>
        </el-col>
        <el-col :span="6">
          <i class="fa-download"></i>
          <p>下载</p>
        </el-col>
      </el-row>
    </div>

    <div class="list-title" @click="addListToPlayerList" v-pop>
      <mt-cell title="播放全部">
        <i name="icon" class="fa-play-circle"></i>
      </mt-cell>
      <!-- <mu-appbar title="播放全部">
        <mu-icon-button icon="fa-play-circle" slot="right"/>
      </mu-appbar> -->
    </div>
    <div class="music-list">
      <ul>
        <li v-for="(item,index) in plist" :key="item.id" @click="MusicPlay(item)" v-pop>
          <div class="info">
            <div class="playlist-index">
              <i class="icon fa-volume-up" v-if="item.id == musicInfo.id"></i>
              <h3 v-else>{{index+1}}</h3>
            </div>
            <div class="playlist-info">
              <p class="name"><b>{{item.name}}</b><em>{{item.alia[0]}}</em></p>
              <p class="author">{{item.ar[0].name}}&nbsp;-&nbsp;{{item.al.name}}</p>
            </div>
          </div>
          <i class="fa-ellipsis-v" @click.stop="sheetVisible = true"></i>
        </li>
      </ul>
    </div>

    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>

  </div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';
import { Actionsheet , Indicator} from 'mint-ui';

export default {
  data () {
    return {
      sheetVisible:false,
      actions:[
        {name:'下一首播放',method:''},
        {name:'收藏到歌单',method:''},
        {name:'下载',method:''}
      ],
      List:[]
    }
  },
  created() {
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      this.getPlaylist();
  },
  computed: {
    id(){
      return this.$route.params.id
    },
    ...mapState([
      'musicInfo',"playerList","playList"
    ]),
    listsID() {
      return this.playList.listsID;
    },
    lists() {
      return this.playList.lists;
    },
    plist() {
      return this.playList.lists.tracks;
    }
  },
  methods: {
    MusicPlay(item) {
      let arr = {
        title : item.name,
        author : item.ar[0].name,
        id : item.id,
        pic : item.al.picUrl
      }
      this.$store.commit("commentType",'music');
      this.$store.dispatch('musicInfo', arr);
    },
    getPlaylist() {
      let params = {
        id: this.id
      }
      let url = this.HOST + '/playlist/detail';
      this.axios.get(url,{params}).then(res => {
        let L = {
          listsID:this.id,
          lists:res.data.playlist
        }
        this.$store.commit("setPlayLists", L);
        this.$nextTick(() => {
          Indicator.close();
          for(var i = 0; i < this.plist.length; i++){
            let obj = {
              title : this.plist[i].name,
              author : this.plist[i].ar[0].name,
              id : this.plist[i].id,
              pic : this.plist[i].al.picUrl
            }
            this.List.push(obj);
          }
        })
      });
    },
    addListToPlayerList(){
      this.$store.commit("commentType",'music');
      if(this.playerList.id.indexOf(this.id) == -1){
        this.$store.commit('addListID', this.id);
        this.$store.commit('addListToPlayerList', this.List);
        this.$store.dispatch('musicInfo', this.List[0]);
      }
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../assets/css/public.less';

  .mint-header{
    background:@bg-color;
  }
  .part-swipe{
    width:100%;
    padding-bottom:50%;
    position:relative;
    margin-top:40px;
    overflow:hidden;
    .bg-img{
      width:100%;
      height:100%;
      position: absolute;
      left:0px;
      top:0px;
      -o-filter:blur(25px);-moz-filter:blur(25px);-webkit-filter:blur(25px);-ms-filter:blur(25px);filter:blur(25px);
    }
    .swipe-box{
      width:100%;
      height:70%;
      position:absolute;
      left:0px;
      top:0px;
      .mint-swipe-item{
        width: calc(~"100% - 20px");
        padding:0 10px;
        display: flex;
        align-items: center;
        .swipe-img{
          width:100px;
          height:100px;
        }
        p{
          width:calc(~"100% - 120px");
          margin-left:20px;
          b{
            display: block;
            color:#fff;
            &.t1{
              font-size:@font-size*1.3;
              line-height:@font-size*1.5;
              i{
                font-size:@font-size*1.4;
                color:#e2b472;
                margin-right:5px;
                font-weight: bold;
              }
            }
            &.t2{
              font-size:@font-size*1;
              line-height:@font-size*1.3;
              margin-top:5px;
              max-height:@font-size*1.3*3;
              overflow:hidden;
            }
          }
        }
      }
    }
    .icon-btn{
      width:100%;
      height:30%;
      position: absolute;
      left:0px;
      bottom: 0px;
      display: flex;
      align-items: center;
      .el-col{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        a{
          display: block;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        i{
          font-size:@font-size*1.6;
          color:#FFF;
        }
        p{
          font-size:@font-size;
          color:#FFF;
          margin-top:5px;
        }
      }
    }
  }
  .list-title{
    width:100%;
    overflow: hidden;
    position: relative;
    cursor:pointer;
  }
  .music-list{
    li{
      width: calc(~"100% - 20px");
      padding:10px;
      border-top:1px solid #f7f7f7;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      overflow: hidden;
      .info{
        width:90%;
        height:100%;
        display: flex;
        align-items: center;

        .playlist-index{
          width:50px;
          height:100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          float:left;
          .icon{
            font-size:16px;
            color:@color-red;
            font-weight: bold;
            text-align: center;
          }
          h3{
            text-align: center;
            font-size:@font-size*1.2;
            color:@color-red;
          }
        }
        .playlist-info{
          width: calc(~"100% - 50px");
          float:left;
          .name{
            width:100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            b{
              font-size:@font-size*1.1;
              font-weight:bold;
            }
            em{
              font-size:@font-size*1.1;
              font-style:normal;
              color:#999;
              margin-left:5px;
            }
          }
          .author{
            font-size:@font-size*0.8;
            color:#999;
            margin-top:5px;
          }
        }
      }
    }
  }
</style>
