<template>
  <div @canshow="myShow">
    <!-- 评论标题 -->
    <div class="title" >
      <el-row :span="24" >
        <h3>热心网友点评</h3>
      </el-row>
    </div>
    <!-- 评论内容 -->
    <div class="com-cont" @canshow="myShow">
      <ctem/>
    </div>
  </div>
</template>

<script>
import Ctem from "./ctem.vue";
export default {
  components: {
    Ctem
  },
  methods: {
    myShow(val) {
      console.log('父组件被触发了', val);
    }
  }
};
</script>

<style lang="scss">
.title{
  margin-bottom: 30px;
}
.com-cont {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
</style>
