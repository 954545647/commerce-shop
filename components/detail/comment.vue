<template>
  <div>
    <!-- 评论标题 -->
    <div class="title" v-if="commentData.length">
      <el-row :span="24">
        <h3 class="myh3">热心网友点评</h3>
      </el-row>
    </div>
    <!-- 评论内容 -->
    <div class="com-cont" >
      <Ctem @canshow="myShow"/>
    </div>
  </div>
</template>

<script>
import Ctem from "./ctem.vue";
export default {
  data() {
    return {
      commentData: []
    };
  },
  components: {
    Ctem
  },
  methods: {
    myShow(val) {
      // console.log(val.length);
      // 把从子组件传递过来的参数放到自身data中
      // 然后根据子组件传递的数据来判断是否要显示评论
      this.commentData = val;
      // console.log("父组件被触发了", val);
      this.$emit('commentShow',val)
    }
  }
};
</script>

<style lang="scss">
.title {
  margin-bottom: 30px;
  .myh3 {
    font-weight: 600;
    font-size: 20px;
  }
}
.com-cont {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
</style>
