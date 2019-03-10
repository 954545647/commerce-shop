<template>
  <div>
      <el-row class="list clear" v-for="(item,idx) in commentData" :key="idx">
        <!-- <el-row class="list clear" > -->
        <el-col :span="3">
          <!-- 用户头像 -->
          <i class="iconfont myFont">&#xe6b0;</i>
        </el-col>
        <el-col :span="16">
          <div class="contentBox">
            <el-row :span="8">
              <!-- 用户名 -->
              <!-- <span class="name">{{commentData[0].UserName}}</span> -->
              <span class="name">{{item.UserName}}</span>
            </el-row>
            <el-row :span="8">
              <div class="block">
                <!-- 评论分数 -->
                <span class="demonstration"></span>
                <el-rate v-model="pointArr[idx].point" disabled></el-rate>
              </div>
            </el-row>
            <el-row :span="8">
              <!-- 评论内容 -->
              <div class="desc">{{item.detail}}</div>
            </el-row>
          </div>
        </el-col>
        <el-col :span="5">
          <span class="Data">{{item.time}}</span>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentData: {},
      value: 0,
      imgs: [],
      pointArr: []
    };
  },
  computed: {
    curValue: function() {
      return this.commentData.map(item => {
        item.point;
      });
    }
  },
  async mounted() {
    let name2 = window.location.href.split("/");
    let len = window.location.href.split("/").length;
    let ontherName = decodeURIComponent(name2[len - 2]);
    document.cookie = "name=" + ontherName;
    let name = document.cookie.split("=")[1];
    // console.log(ontherName, "子组件去请求数据使用的值");
    // console.log(name, "子组件设置cookie的值");
    let {
      stauts,
      data: { comment }
    } = await this.$axios.get("/comment/getComment", {
      params: {
        GoodName: ontherName
      }
    });
    // console.log(comment, "在子组件获取的评论数据");
    this.commentData = comment;
    // 触发事件告诉父组件我这里有数据,你可以显示评论
    // console.log(comment)
    this.$emit('canshow',comment)
    // 单独去获取评论数据中的评分数据
    // 通过map方法筛选出一个数组,里面全部是评分数据
    let Arrpoint = this.commentData.map(item => {
      return {
        point: item.point
      };
    });
    this.pointArr = Arrpoint;
  }
};
</script>
<style lang="scss">
.el-row {
  .el-col {
    .contentBox {
      margin: 25px;
      .name {
        font-size: 20px;
        color: #222;
        line-height: 22px;
      }
      .block {
        height: 20px;
        font-size: 11px;
      }
      .desc {
        font-size: 15px;
      }
    }
    .myFont {
      color: #333333;
      font-size: 50px;
      text-align: center;
      line-height: 115px;
      margin-left: 35px;
    }

    .Data {
      height: 20px;
      font-size: 16px;
      line-height: 120px;
      color: #999;
      text-align: center;
      margin-top: 20px;
    }
  }
}
.clear:after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
}
</style>

