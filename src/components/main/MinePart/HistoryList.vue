<template>
  <div class="history-list">
    <mt-header fixed title="最近播放">
      <mt-button icon="back" slot="left" @click="$router.back(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <mt-cell title="播放全部">
      <i name="icon" class="fa-play-circle"></i>
    </mt-cell>
    <div class="music-list">
      <ul>
        <li v-for="item in historys" :key="item.song.id" @click="MusicPlay(item.song.id)">
          <div class="info">
            <p class="name"><b>{{item.song.name}}</b></p>
            <p class="author">{{item.song.ar[0].name}}</p>
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

export default {
  data () {
    return {
      historys:[],
      sheetVisible:false,
      actions:[
        {name:'下一首播放',method:''},
        {name:'收藏到歌单',method:''},
        {name:'下载',method:''}
      ]
    }
  },
  created() {
    this.getHistorys();
  },
  methods: {
    getHistorys() {
      var params = {
        uid: window.localStorage.getItem("id"),
        type: 1
      }
      var url = this.HOST + '/user/record';
      this.axios.get(url,{params}).then(res => {
        this.historys = res.data.weekData;
      });
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/css/public.less';
  @import '../../../assets/css/animate.less';

  .mint-header{
    background:@bg-color;
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
