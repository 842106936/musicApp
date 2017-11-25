<template>
  <div class="list">
    <mt-header fixed title="每日歌曲推荐">
      <mt-button icon="back" slot="left" @click="$router.back(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div class="part-swipe">
      <div class="swipe-box">
        <mt-swipe :show-indicators="false">
          <mt-swipe-item>
            <img class="swipe-img" :src="banner.picUrl"/>
            <i class="iconfont icon-rili"></i>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>

    <div class="list-title" @click="addListToPlayerList" style="cursor:pointer;"  v-pop>
      <mt-cell title="播放全部">
        <i name="icon" class="fa-play-circle"></i>
      </mt-cell>
    </div>
    <div class="music-list">
      <ul>
        <li v-for="item in musics" :key="item.id" @click="MusicPlay(item)"  v-pop>
          <i class="icon fa-volume-up" v-if="item.id == musicInfo.id"></i>
          <div class="info">
            <p class="name"><b>{{item.name}}</b><em>{{item.alias[0]}}</em></p>
            <p class="author">{{item.artists[0].name}}&nbsp;-&nbsp;{{item.album.name}}</p>
          </div>
          <i class="fa-ellipsis-v" @click.stop="sheetVisible = true"></i>
        </li>
      </ul>
    </div>

    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>

  </div>
</template>

<script>
import { Actionsheet } from 'mint-ui';
import {mapState ,mapMutations ,mapActions} from 'vuex';

export default {
  data () {
    return {
      sheetVisible:false,
      actions:[
        {name:'下一首播放',method:''},
        {name:'收藏到歌单',method:''},
        {name:'下载',method:''}
      ],
      banner:[],
      List:[]
    }
  },
  created() {
    if(this.musics.length == 0){
      this.getMusics();
    }else{
      this.banner= this.musics[0].album;
    }
  },
  computed: {
    ...mapState([
      "musics","musicInfo","playerList"
    ])
  },
  methods: {
    MusicPlay(item) {
      this.$store.commit("commentType",'music');
      let arr = {
        title : item.name,
        author : item.artists[0].name,
        id : item.id,
        pic : item.album.picUrl
      }
      this.$store.dispatch('musicInfo', arr);
    },
    getMusics() {
      const url = this.HOST + '/recommend/songs';
      this.axios.get(url).then(res => {
        this.$store.dispatch('musics',res.data.recommend);
        this.banner = res.data.recommend[0].album;

        for(var i = 0; i < this.musics.length; i++){
          let obj = {
            title : this.musics[i].name,
            author : this.musics[i].artists[0].name,
            id : this.musics[i].id,
            pic : this.musics[i].album.picUrl
          }
          this.List.push(obj);
        }
      });
    },
    addListToPlayerList(){
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
  @import '../assets/css/animate.less';

  .mint-header{
    background:@bg-color;
  }
  .part-swipe{
    width:100%;
    padding-bottom:40%;
    position:relative;
    margin-top:40px;
    .swipe-box{
      width:100%;
      height:100%;
      position:absolute;
      left:0px;
      top:0px;
      .swipe-img{
        width:100%;
        height:100%;
      }
      i{
        font-size:80px;
        color:#fff;
        position: absolute;
        bottom:30%;
        left:20px;
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
      .icon{
        font-size:16px;
        color:@color-red;
        font-weight: bold;
      }
      .info{
        .name{
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
</style>
