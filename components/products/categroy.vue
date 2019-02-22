<template>
  <div class="m-product-categroy">
    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd v-for="(item,idx) in types" :key="idx">
        <iselect :name="item.type" :list="item.module"/>
      </dd>
    </dl>

    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd v-for="(item,idx) in areas" :key="idx">
        <iselect :name="item.type" :list="item.module"/>
      </dd>
    </dl>
  </div>
</template>


<script>
import iselect from '@/components/products/iselect.vue'
export default {
  components:{
    iselect
  },
  data() {
    return {
      types:[],
      areas:[]
    }
  },
};
</script>


<style lang="scss">
</style>
