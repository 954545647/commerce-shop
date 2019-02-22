<template>
  <el-row class="page-product">
    <el-col :span="19">
      <Crumb :keyword="keyword"/>
      <categroy/>
    </el-col>
    <el-col :span="5"></el-col>
  </el-row>
</template>

<script>
import Crumb from "@/components/products/crumb.vue";
import categroy from "@/components/products/categroy.vue";
import { async } from 'q';
export default {
  components: {
    Crumb,
    categroy
  },
  data() {
    return {
      keyword: ""
    };
  },
  async asyncData(ctx) {
    let keyword = ctx.query.keyword
    // console.log(this.keyword,'66')
  },
  async mounted() {
    // 获取当前url地址
    let hre = window.location.href
    // 获取关键词
    let a = decodeURIComponent(hre.split('products/')[1]).replace('市','')
    console.log(a)
    // 通过vuex进行保存
    this.$store.dispatch('hotplace/setHotName',a)
  },
};
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
