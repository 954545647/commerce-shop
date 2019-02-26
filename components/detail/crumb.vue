<template>
  <div class="m-crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$store.state.geo.position.city}}美团</el-breadcrumb-item>
      <el-breadcrumb-item>{{$store.state.geo.position.city}}{{type}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$store.state.geo.position.city}}{{$store.state.hotplace.hotName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ""
    }
  }
};
</script>


<style lang="scss">
</style>
