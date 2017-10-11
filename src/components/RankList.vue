<template>
  <div class="rank-list">

    <mt-header fixed :title="banner.name">
      <mt-button icon="back" slot="left" @click="$router.back(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div class="part-swipe">
      <img class="bg-img" :src="banner.coverImgUrl"/>
      <div class="swipe-box">
        <mt-swipe :auto="0" :show-indicators="false">
          <mt-swipe-item>
            <img class="swipe-img" :src="banner.coverImgUrl"/>
            <p>
              <b class="t1"><i class="fa-adn"></i>{{banner.name}}</b>
              <b class="t2">{{banner.description}}</b>
            </p>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <el-row class="icon-btn">
        <el-col :span="6">
          <i class="fa-calendar-plus-o"></i>
          <p>{{banner.subscribedCount < 10000 ? banner.subscribedCount : parseInt(banner.subscribedCount/10000) + '万'}}</p>
        </el-col>
        <el-col :span="6">
          <i class="fa-comments"></i>
          <p>{{banner.commentCount < 10000 ? banner.commentCount : parseInt(banner.commentCount/10000) + '万'}}</p>
        </el-col>
        <el-col :span="6">
          <i class="fa-share-alt"></i>
          <p>{{banner.shareCount < 10000 ? banner.shareCount : parseInt(banner.shareCount/10000) + '万'}}</p>
        </el-col>
        <el-col :span="6">
          <i class="fa-download"></i>
          <p>下载</p>
        </el-col>
      </el-row>
    </div>

    <mt-cell title="播放全部">
      <i name="icon" class="fa-play-circle"></i>
    </mt-cell>
    <div class="music-list">
      <ul>
        <li v-for="(item,index) in ranks" :key="item.id" @click="MusicPlay(item.id)">
          <div class="info">
            <div class="rank-index">
              <h3>{{index+1}}</h3>
              <p v-if="idx == 3">↑{{item.ratio}}%</p>
              <p v-if="idx == 0">{{item.lastRank | rankChange(index)}}</p>
            </div>
            <div class="rank-info">
              <p class="name"><b>{{item.name}}</b><em>{{item.alias[0]}}</em></p>
              <p class="author">{{item.artists[0].name}}&nbsp;-&nbsp;{{item.album.name}}</p>
            </div>
          </div>
          <i class="fa-ellipsis-v" @click="sheetVisible = true"></i>
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
      ranks:[],
      idx:this.$route.params.idx
    }
  },
  created() {
      this.getRanks();
  },
  filters: {
    rankChange(num,index) {
      var rk = num - index;
      return rk ?  rk : 0;
    }
  },
  methods: {
    getRanks() {
      var params = {
        idx: this.idx
      }
      var url = this.HOST + '/top/list';
      this.axios.get(url,{params}).then(res => {
        this.banner = res.data.result;
        this.ranks = res.data.result.tracks;
      });
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
        img{
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
              font-size:@font-size*1.4;
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
              margin-top:15px;
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
        i{
          font-size:@font-size*2;
          color:#FFF;
        }
        p{
          font-size:@font-size*1.1;
          color:#FFF;
          margin-top:5px;
        }
      }
    }
  }
  .music-list{
    li{
      width: calc(~"100% - 20px");
      padding:10px;
      border-top:1px solid #f7f7f7;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info{
        width:90%;
        height:100%;
        display: flex;
        align-items: center;
        .rank-index{
          width:50px;
          height:100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          float:left;
          h3{
            text-align: center;
            font-size:@font-size*1.2;
            color:@color-red;
          }
          p{
            text-align: center;
            font-size:@font-size*0.8;
            color:#999;
            margin-top:5px;
          }
        }
        .rank-info{
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
