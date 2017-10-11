<template>
  <div class="search" ref="search">
    <div class="search-head">
      <a><i class="fa-angle-left"  @click="$router.back(-1)"></i></a>
      <input @focus="searchShow=true" @blur="searchShow=false"  v-model="text"  placeholder="请输入您要检索的内容"/>
    </div>

    <div v-show="text != '' && searchShow == true" class="search-suggest">
      <ul>
        <li v-if="suggest.albums != ''" v-for="item in suggest.albums" :key="item.id" @mousedown="goSearch(item.name,10)">
            <i class="fa-search"></i>
            <b>{{item.name}}</b>
            <em>(专辑)</em>
        </li>
        <li v-if="suggest.artists != ''" v-for="item in suggest.artists" :key="item.id" @mousedown="goSearch(item.name,100)">
            <i class="fa-search"></i>
            <b>{{item.name}}</b>
            <em>(歌手)</em>
        </li>
        <li v-if="suggest.songs != ''" v-for="item in suggest.songs" :key="item.id" @mousedown="goSearch(item.name,1)">
            <i class="fa-search"></i>
            <b>{{item.name}}</b>
            <em>(歌曲)</em>
        </li>
        <li v-if="suggest.playlists != ''" v-for="item in suggest.playlists" :key="item.id" @mousedown="goSearch(item.name,1000)">
            <i class="fa-search"></i>
            <b>{{item.name}}</b>
            <em>(歌单)</em>
        </li>
        <li v-if="suggest.mvs != ''" v-for="item in suggest.mvs" :key="item.id" @mousedown="goSearch(item.name,1004)">
            <i class="fa-search"></i>
            <b>{{item.name}}</b>
            <em>(MV)</em>
        </li>
      </ul>
    </div>

    <transition>
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';

export default{
  data() {
    return {
      text:'',
      searchShow:false,
      suggest:{
        albums:[],
        artists:[],
        songs:[],
        playlists:[],
        mvs:[]
      },  //搜索建议
      his:[]
    }
  },
  watch: {
    searchTxt() {
      this.text = this.searchTxt;
      this.loadRes();
    },
    text() {
      this.$store.dispatch("searchTxt",this.text);
    }
  },
  computed: {
    ...mapState([
      "searchTxt","historys","searchList"
    ])
  },
  methods: {
    loadRes() {
      var params = {
        keywords : this.text
      }
      var url = this.HOST + '/search/suggest';
      this.axios.get(url,{params}).then(res => {
        this.suggest.albums = res.data.result.albums;
        this.suggest.artists = res.data.result.artists;
        this.suggest.songs = res.data.result.songs;
        this.suggest.playlists = res.data.result.playlists;
        this.suggest.mvs = res.data.result.mvs;
        console.log(this.suggest)
      })
    },
    goSearch(val,type) {
      this.his = this.historys;
      if(val != this.his[0]){
        this.his.unshift(val);
        this.$store.dispatch("historys", this.his);
      }
      this.searchShow = false;
      var params = {
        keywords:val,
        limit:30,
        offset:0,
        type:1
      }
      var url = this.HOST + '/search';
      this.axios.get(url,{params}).then(res => {
        this.$store.dispatch("searchList", res.data.result.songs);
        this.$router.push({ path: '/Search/SearchList' });
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/css/public.less';

.search{
  width:100%;
  overflow: hidden;
}
.search-head{
  width:100%;
  height:40px;
  position: fixed;
  left:0;
  top:0px;
  background:@color-red;
  a{
    width:60px;
    height:40px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    i{
      font-size:@font-size*1.2;
      font-weight: bold;
      color:#FFF;
    }
  }
  input{
    width:calc(~"100% - 70px");
    height:32px;
    float: left;
    background:none;
    border-bottom:1px solid #FFF;
    color:#FFF;
    font-size: @font-size;
    color:#FFF;
    &::-webkit-input-placeholder { /* WebKit browsers */
        color:   rgba(255,240,240,0.5);
    }
    &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:   rgba(255,240,240,0.5);
    }
    &::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:   rgba(255,240,240,0.5);
    }
    &:-ms-input-placeholder { /* Internet Explorer 10+ */
        color:   rgba(255,240,240,0.5);
    }
  }
}
.search-suggest{
  width:calc(~"100% - 20px");
  max-height:310px;
  background:#FFF;
  overflow-y: scroll;
  position: fixed;
  left: 10px;
  top:40px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  ul{
    width:100%;
    overflow:hidden;
    li{
      width:100%;
      height:30px;
      border-bottom:1px solid #f2f2f2;
      display: flex;
      align-items: center;
      i{
        font-size: @font-size*1.2;
        color:#666;
        margin:0 10px;
      }
      b{
        font-size: @font-size;
        font-style: normal;
        color:#666;
      }
      em{
        font-size: @font-size;
        font-style: normal;
        color:#999;
      }
    }
  }
}
</style>
