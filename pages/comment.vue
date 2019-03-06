<template>
  <el-row class="wrapper">
    <el-col :span="16" class="left">
      <el-row :span="7">
        <div class="inputName">
          <label>尊姓大名</label>
          <input type="text" placeholder="默认匿名" v-model="name">
        </div>
      </el-row>
      <el-row :span="7">
        <div class="block">
          <span class="demonstration">点击评分</span>
          <el-rate v-model="Point" class="start" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
        </div>
      </el-row>
      <el-row :span="7">
        <el-input
          class="detail"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="detail"
        ></el-input>
      </el-row>
      <el-row :span="3" class="btn">
        <el-button type="primary" @click="sendCom">确认提交</el-button>
      </el-row>
    </el-col>

    <!-- 右侧 -->
    <el-col :span="8" class="right">
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }" class="card">
          <span class="title">{{curData.name}}</span>
          <img v-if="imgsUrl" :src="imgsUrl" class="image">
          <img v-else src="@/static/null.jpg" alt>
        </el-card>
      </el-col>
    </el-col>
  </el-row>
</template>


<script>
export default {
  data() {
    return {
      name: "",
      Point: 0,
      detail: "",
      curData: [],
      imgsUrl: ""
    };
  },
  methods: {
    async sendCom() {
      let name = this.name;   //评价姓名
      let Point = this.Point; //评价分数
      let detail = this.detail; //评价详情
      let id = window.location.href.split("id=")[1];
      console.log(id,'点击去评论传过来的id值')
      let time = new Date();
      let year = time.getFullYear();
      let m = time.getMonth() + 1;
      let month = String(m).padStart(2, "0");
      let d = time.getDate();
      let date = String(d).padStart(2, "0");
      let h = time.getHours();
      let hour = String(h).padStart(2, "0");
      let min = time.getMinutes();
      let minutes = String(min).padStart(2, "0");
      let s = time.getSeconds();
      let sec = String(s).padStart(2, "0");
      let currentTime = `${year}-${month}-${date} ${hour}:${minutes}:${sec}`; //评价时间
      // 获取cookie中的商品名字
      let goodName = document.cookie.split('=')[1];
      // console.log('此时cookie中的值为',goodName)
      // console.log(goodName, "评论保存的是这个");
      let {
        status,
        data: { code }
      } = await this.$axios.get("/comment/writeComment", {
        params: {
          GoodId: id,
          UserName: name,
          point: Point,
          detail: detail,
          time: currentTime,
          GoodName: goodName
        }
      });
      if (status) {
        this.name = "";
        this.detail = "";
        this.Point = 0;
        this.$router.push({
          path: `/products/${goodName}`
        });
        // window.location = "/";
      }
    }
  },
  // 这里是一进来就去根据路由的商品id值去获取商品信息
  async mounted() {
    let id = window.location.href.split("id=")[1];
    // 由于订单是和用户id进行绑定的,
    // 所以要先通过服务器获取用户ID
    let {
      status,
      data: { user }
    } = await this.$axios.get("/users/getUser");
    // 通过用户id去获取数据,并且通过路由的id参数来筛选我们需要的数据
    let {
      status: status2,
      data: { code, list }
    } = await this.$axios.post("/order/getOrders", {
      user: user
    });
    // 根据id值筛选出我们要的数据
    let curData = list.filter(item => {
      return item.id === id;
    });
    this.curData = curData[0];
    this.imgsUrl = curData[0].imgs[1].url;
  }
};
</script>


<style lang="scss">
.wrapper {
  margin-top: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 18px;
  line-height: 18px;
  .left {
    margin-bottom: 20px;
    .inputName {
      margin: 20px 0 20px 20px;
      input {
        margin-left: 10px;
        height: 18px;
        padding-left: 2px;
      }
    }
    .block {
      margin: 0 0 20px 20px;
      overflow: hidden;
      span {
        float: left;
        margin-right: 10px;
      }
      .start {
        float: left;
      }
    }
    .detail {
      margin: 0 0 20px 20px;
      width: 800px;
    }
    .btn {
      margin-left: 20px;
    }
  }
  .right {
    width: 250px;
    height: 160px;
    margin-left: 100px;
    .el-col {
      .card {
        margin: 10px 0;
        text-align: center;
        width: 200px;
        height: 210px;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
