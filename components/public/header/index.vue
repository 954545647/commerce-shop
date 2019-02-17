<template>
  <el-row
    :gutter="0"
    class="m-header"
  >
    <el-col :span="4">
      <geo />
    </el-col>
    <el-col :span="6">
      <user />
    </el-col>
    <el-col :span="14">
      <div class="grid-content bg-purple" />
    </el-col>
  </el-row>
</template>

<script>
import Geo from "./components/geo";
import User from './components/user'
export default {
  components: {
    Geo,
    User
  }
};
</script>

<style lang="scss">
@import '~assets/css/public/layout.scss';
</style>
