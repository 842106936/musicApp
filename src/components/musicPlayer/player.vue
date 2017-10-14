<template>
  <div class="player">
    <div class="player-head">
      <a><i class="fa-angle-left"  @click="$router.back(-1)"></i></a>
      <p>
        <b>{{music.name}}</b>
        <em>{{music.author}}</em>
      </p>
    </div>

    <transition>
      <router-view class="child-view" child-view="child-view"></router-view>
    </transition>

    <div class="play-control">
      <>
    </div>
  </div>
</template>

<script>
</script>
