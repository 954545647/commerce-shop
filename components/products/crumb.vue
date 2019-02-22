<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }" class="first">{{ $store.state.geo.position.city }}美团</el-breadcrumb-item>
      <el-breadcrumb-item >
        <nuxt-link to="/">{{ $store.state.geo.position.city }}{{$store.state.hotplace.hotName}}</nuxt-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss">
.first {
  color: #222;
  font-weight: 400;
  margin-right: -2px;
}
.el-breadcrumb__inner {
  cursor: pointer;
}
.nuxt-link-active {
  cursor: pointer !important;
  font-weight: 400;
  &:hover {
    color: #31bbac !important;
  }
}

</style>









