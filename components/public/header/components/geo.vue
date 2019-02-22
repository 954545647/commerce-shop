<template>
  <div class="m-geo">
    <i class="iconfont icon-location" />{{$store.state.geo.position.city}}
    <nuxt-link
      class="changeCity"
      to="/changeCity"
    >
      切换城市
    </nuxt-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>
