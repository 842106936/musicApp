<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
    <music-player></music-player>
  </div>
</template>

<script>
import musicPlayer from './components/musicPlayer/MusicPlayer.vue';

export default{
  data() {
    return {
    }
  },
  components: {
    'music-player' : musicPlayer
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
#app{
  padding-bottom:50px;
  //background:#f7f7f7;
}
</style>
