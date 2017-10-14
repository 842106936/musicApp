<template>
  <div class="searchList">

    <div class="music-list">
      <ul>
        <li v-for="item in searchList" :key="item.id" @click="MusicPlay(item.id)">
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
      ]
    }
  },
  computed: {
    ...mapState([
      "searchList"
    ])
  },
  mthods: {
    ...mapActions([
      'MusicPlay'
    ])
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/css/public.less';

  .music-list{
    margin-top:40px;
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
