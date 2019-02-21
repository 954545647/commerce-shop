<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from "@/components/changeCity/iselect.vue";
import hot from "@/components/changeCity/hot.vue";
import category from "@/components/changeCity/categroy.vue";
export default {
  components: {
    iSelect,
    hot,
    category
  }
  // async asyncData(context) {
  //   let self = this
  //   let {status,data:{city}} = await self.$axios.get('/geo/city')
  //   console.log(data)
  // },
};
</script>

<style lang="scss">
</style>
