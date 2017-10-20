<template>
<div class="mine">
  <div class="mine-list">
    <ul>
      <li>
        <router-link to="/List">
          <i class="fa-music"></i>
          <b>本地音乐</b>
          <em></em>
        </router-link>
      </li>
      <li>
        <router-link to="/HistoryList">
          <i class="fa-play-circle"></i>
          <b>最近播放</b>
          <em></em>
        </router-link>
      </li>
      <li>
        <router-link to="List">
          <i class="fa-download"></i>
          <b>下载管理</b>
          <em></em>
        </router-link>
      </li>
      <li>
        <router-link to="List">
          <i class="fa-microphone"></i>
          <b>我的电台</b>
          <em></em>
        </router-link>
      </li>
      <li>
        <router-link to="List">
          <i class="fa-star"></i>
          <b>我的收藏</b>
          <em></em>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="play-list">
    <mt-cell :title="'创建的歌单' + '(' + playlistCount + ')'">
      <i slot="icon" class="fa-angle-down"></i>
    </mt-cell>
    <div class="list">
      <ul>
        <li v-for="(item,index) in playlist" v-if="item.creator.userId == userId" :key="item.id">
          <router-link :to="{ name: 'PlayList', params: { id: item.id }}">
            <div class="info">
              <div class="list-image">
                <img v-lazy="item.coverImgUrl"/>
              </div>
              <div class="list-info">
                <p class="name">{{item.name}}</em></p>
                <p class="trackCount">{{item.trackCount}}首，已下载{{item.playCount}}首</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="play-list">
    <mt-cell :title="'收藏的歌单' + '(' + follows + ')'">
      <i slot="icon" class="fa-angle-down"></i>
    </mt-cell>
    <div class="list">
      <ul>
        <li v-for="(item,index) in playlist" v-if="item.creator.userId != userId" :key="item.id">
          <router-link :to="{ name: 'PlayList', params: { id: item.id }}">
            <div class="info">
              <div class="list-image">
                <img v-lazy="item.coverImgUrl"/>
              </div>
              <div class="list-info">
                <p class="name">{{item.name}}</em></p>
                <p class="trackCount">{{item.trackCount}}首 by {{item.creator.nickname}}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';

export default{
  name:'Mine',
  data() {
    return {
      userId:window.localStorage.getItem('id'),
      playlistCount:'',
      follows:'',
      playlist:[]
    }
  },
  created() {
    this.getUserInfo();
    this.getPlayList();
  },
  computed: {
    ...mapState([
      "pid"
    ])
  },
  methods: {
    getUserInfo() {
      let params = {
        uid: window.localStorage.getItem("id")
      }
      let url = this.HOST + '/user/detail';
      this.axios.get(url,{params}).then(res => {
        this.playlistCount = res.data.profile.playlistCount;
        this.follows = res.data.profile.follows;
      });
    },
    getPlayList() {
      let params = {
        uid: window.localStorage.getItem("id")
      }
      let url = this.HOST + '/user/playlist';
      this.axios.get(url,{params}).then(res => {
        this.playlist = res.data.playlist;
      });
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/css/public.less';
.mine-list{
  width:100%;
  overflow:hidden;
  li{
    width: calc(~"100% - 20px");
    margin:0 10px;
    height:50px;
    border-bottom:1px solid #f2f2f2;
    a{
      width:100%;
      height:100%;
      display: flex;
      align-items: center;
      i{
        font-size:@font-size*1.6;
        color:@color-red;
      }
      b{
        font-size:@font-size*1.1;
        color:#333;
        margin-left:10px;
      }
    }
  }
}
.play-list{
  .mint-cell{
    background:#e7eaef;
    min-height:38px;
  }
  .list{
    li{
      width: calc(~"100% - 20px");
      padding:10px;
      height:50px;
      border-top:1px solid #f7f7f7;
      .info{
        width:100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .list-image{
          width:50px;
          height:100%;
          float:left;
        }
        .list-info{
          width: calc(~"100% - 50px");
          float:left;
          margin-left:10px;
          .name{
            width:100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size:@font-size*1.1;
            font-weight:bold;
          }
          .trackCount{
            font-size:@font-size*0.8;
            color:#999;
            margin-top:5px;
          }
        }
      }
    }
  }
}
</style>
