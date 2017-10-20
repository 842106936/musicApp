<template>
<div class="radio">

  <!-- <div class="part-nav">
    <el-row>
      <el-col :span="12" v-for="nav in radioNavs" :key="nav.title">
        <i class="iconfont" :class="nav.icon"></i>
        <b>{{nav.title}}</b>
      </el-col>
    </el-row>
  </div> -->
  <div v-for="radios in radioCategorys">
    <v-radios class="part-radio" :title="radios.name" :id="radios.id"></v-radios>
  </div>
</div>
</template>

<script>
import {mapState ,mapMutations ,mapActions} from 'vuex';
import radios from './radio-list';

export default{
  name: 'radios',
  data() {
    return {
      radioNavs:[
        {title: '电台分类', icon: 'icon-fm', link: '/'},
        {title: '电台排行', icon: 'icon-rili', link: '/'}
      ]
    }
  },
  created() {
    if(this.radioCategorys.length == 0){
      this.getRadioCategorys();
    }
  },
  computed: {
    ...mapState([
      'radioCategorys'
    ])
  },
  components:{
    'v-radios':radios
  },
  methods: {
    getRadioCategorys() {
      let url = this.HOST + '/dj/catelist';
      this.axios.get(url).then(res => {
        this.$store.dispatch('radioCategorys',res.data.categories);
      });
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/css/public.less';
  @red:rgba(255,0,0,0.4);
  @blue:rgba(0,0,255,0.4);

  .radio{
    width:100%;
    .part-nav{
      width:100%;
      .el-row{
        margin:0px !important;
        .el-col{
            display:block;
            margin:10px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
              font-size:2rem;
              color:@bg-color;
              float: left;
            }
            b{
              font-weight: bold;
              font-size:@font-size*1*1.1;
              line-height:2rem;
              color:#333;
              margin-left:10px;
              float: left;
            }
          }
          .el-col+.el-col{
            border-left:1px solid #f2f2f2;
          }
        }
      }
    }
</style>
