<template>
  <div class="m-geo">
    <i class="iconfont icon-location" />{{$store.state.geo.position.city}}
    <nuxt-link
      class="changeCity"
      to="/changeCity"
    >
      切换城市
    </nuxt-link>
    [佛山,肇庆,南沙]
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>
