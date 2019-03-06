<template>
  <div class="m-order">
    <ul>
      <!-- 要判断是否有订单 使用v-if/else -->
      <li v-if="cur.length">
        <el-row v-for="(item,idx) in currentData" :key="idx">
          <el-col :span="4">
            <img class="o-img" :src="item.img">
          </el-col>
          <el-col :span="8">
            <h4>{{item.name}}</h4>
            <p>数量: {{item.count}}</p>
          </el-col>
          <el-col :span="4">总价: ￥{{item.total}}</el-col>
          <el-col :span="5">{{item.statusTxt}}</el-col>
          <el-col :span="3">
            <el-button v-if="item.status===0" type="info" round @click="topay(item)">去付款</el-button>
            <el-button v-else type="primary" round @click="toCom(item)">去评价</el-button>
          </el-col>
        </el-row>
        <el-pagination
          layout="prev, pager, next"
          :total="this.totalPage*10"
          @current-change="currentHandle"
          :page-count="this.totalPage"
        ></el-pagination>
      </li>
      <li v-else class="empty">没有订单</li>
    </ul>
  </div>
</template>


<script>
export default {
  props: {
    cur: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      // 如果获取的数据大于5条,仅显示前5条
      showCount: 5,
      totalCount: this.cur.length,
      currentData:
        this.cur.length > 5
          ? this.cur.filter((item, idx) => idx < 5)
          : this.cur,
      totalPage: this.cur.length / 5,
      flag: false
    };
  },
  methods: {
    currentHandle(val) {
      this.currentPage = val;
    },
    // 去付款
    async topay(value){
      // 订单号
      let order = value.id
      console.log(value)
      let {status,data} = await this.$axios.post('/pay',{
        timeoutExpress: '30m',
        orderId: order,
        money: value.total
      })
      // 跳转到支付链接
      //  this.$router.replace(data)
      //  this.$router.replace('${data}')
      location.href = data;
    },
    // 去评价
    async toCom(value){
      this.$router.push({
        path: `/comment?id=${value.id}`
      })
      // window.location.href = `/comment?id=${value.id}`
    }
  },
  watch: {
    currentPage: function() {
      let self = this;
      let count = self.currentPage; // 2
      self.currentData = self.cur.filter((item, idx) => {
        return (
          idx >= 1 + (count - 1) * this.showCount &&
          idx <= count * this.showCount
        );
      });
      return self.currentData;
    }
  }
};
</script>


<style lang="scss">
.el-pagination {
  text-align: center;
  margin: 20px 0 10px 0;
  height: 30px;
  .number {
    font-size: 14px;
  }
}
</style>
