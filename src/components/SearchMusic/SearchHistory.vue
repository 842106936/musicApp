<template>
  <div class="history" ref="history">
    <div class="search-hot">
      <h5>热门搜索</h5>
      <div class="hot-list">
        <a v-for="item in hots" @click="SetSearchTxt(item)">
          {{item}}
        </a>
      </div>
    </div>

    <div class="search-history">
      <ul>
        <li v-if="index<5" v-for="(item,index) in historys" @click="SetSearchTxt(item)">
          <i class="fa-clock-o"></i>
          <b>{{item}}</b>
          <i class="fa-times" @click.stop="DeleteSearch(index)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';

export default{
  data() {
    return {
      hots:[
        "薛之谦","周杰伦","老街","安和桥","火影忍者","Fade","泰勒斯威芙特"
      ]
    }
  },
  watch: {
    historys() {
      if(window.sessionStorage){
          sessionStorage.setItem("historys", this.historys);
      }else{
          Cookie.write("historys", this.historys);
      }
    }
  },
  created() {
      let history = window.sessionStorage.getItem("historys");
      if(history != null){
        let tempArr=history.split(',');
        let returnArr=new Array();
        let i,len=tempArr.length;
        for(i=0;i<len;i++){
          returnArr.push(tempArr[i]);
        }
        this.$store.commit("historys",returnArr);
      }
  },
  computed: {
    ...mapState([
      "searchTxt","historys","searchList"
    ])
  },
  methods: {
    SetSearchTxt(val){
      this.$store.commit("searchTxt",val);
    },
    DeleteSearch(index) {
      this.$store.commit("removeHistorys",index);
    }
  },
  mounted() {
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.$refs.history.style.height = h - 90 + 'px';
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/css/public.less';

.history{
    background:#f3f4f6;
    padding-top:40px;
}
.search-hot{
  width:calc(~"100% - 40px");
  margin:30px 20px;
  h5{
    font-size: @font-size*0.8;
    color:#999;
    line-height:20px;
  }
  .hot-list{
    width:100%;
    overflow: hidden;
    a{
      font-size: @font-size;
      padding:0 10px;
      line-height:24px;
      display: block;
      border:1px solid #dcdcdc;
      border-radius:12px;
      color:#333;
      float:left;
      margin:10px 10px 0 0;
    }
  }
}
.search-history{
  width:100%;
  overflow:hidden;
  position: absolute;
  bottom:50px;
  li{
    width:calc(~"100% - 20px");
    padding:0 10px;
    height:50px;
    border-bottom:1px solid #e8e9eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i{
      margin:0 10px;
    }
    b{
      width:calc(~"100% - 100px");
      font-size: @font-size;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow:hidden;
    }
  }
}
</style>
