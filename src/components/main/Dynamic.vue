<template>
  <div class="dynamic" :style="'height:' + height + 'px'">
    <img src="../../assets/image/error.png">
    <p>这里空空如野~~</p>
  </div>
</template>

<script>
export default{
  computed:{
    height() {
      return window.screen.availHeight - 40;
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .dynamic{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p{
      font-weight: bold;
      font-size:20px;
      line-height:60px;
      color:#333;
    }
  }
</style>
