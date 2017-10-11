<template>
<div class="rank">

  <mt-cell title="官方榜"></mt-cell>
  <div class="part-rank">
    <el-row>
      <el-col :span="24" v-for="item in officialIdx" :key="item">
        <router-link :to="Detail(item)">
          <v-official class="part-rank" :idx="item"></v-official>
        </router-link>
      </el-col>
    </el-row>
  </div>

  <mt-cell title="全球榜"></mt-cell>
  <div class="part-rank">
    <el-row :gutter="5">
      <el-col :xs="8" :sm="8" :md="6" :lg="4" v-for="item in worldIdx" :key="item">
        <router-link :to="Detail(item)">
          <v-wolrd class="part-rank" :idx="item"></v-wolrd>
        </router-link>
      </el-col>
    </el-row>
  </div>

</div>
</template>

<script>
import official from './rank-official-list';
import wolrd from './rank-world-list';

export default{
  name: 'radios',
  data() {
    return {
      officialIdx:[3,0,2,1,4],
      worldIdx:[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
    }
  },
  components: {
    'v-official':official,
    'v-wolrd':wolrd
  },
  methods: {
    Detail(item) {
      return '/RankList/' + item;
      //this.$router.push({ path:'/Music/radio/rankList/' + item });
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
    .part-rank{
      width:100%;
      .el-row{
        margin:0px !important;
        .el-col{
          margin-bottom:5px;
          }
        }
      }

</style>
