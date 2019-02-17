<template>
  <div class="m-istyle">
    <dl @mouseover="mouseover" >
      <dt>有格调</dt>
      <dd kind="all">全部</dd>
      <dd kind="part">约会聚餐</dd>
      <dd kind="spa">丽人SPA</dd>
      <dd kind="movie">电影演出</dd>
      <dd kind="travel">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item,index) in cur" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.img" class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos">
              <span>{{ item.pos }}</span>
            </li>
            <li class="price">
              ￥
              <em>{{ item.price }}</em>
              <span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: "all",
      list: {
        all: [
          {
            type: "all",
            title: "吃鸡",
            img:
              "https://p1.meituan.net/msmerchant/14b408cceb012a142eaf8710b4da957b625295.jpg@460w_260h_1e_1c",
            pos: "好吃吗",
            price: "100"
          },
          {
            type: "all",
            title: "吃鸡",
            img:
              "https://p1.meituan.net/msmerchant/14b408cceb012a142eaf8710b4da957b625295.jpg@460w_260h_1e_1c",
            pos: "好吃吗",
            price: "100"
          },
          {
            type: "all",
            title: "吃鸡",
            img:
              "https://p1.meituan.net/msmerchant/14b408cceb012a142eaf8710b4da957b625295.jpg@460w_260h_1e_1c",
            pos: "好吃吗",
            price: "100"
          },
          {
            type: "all",
            title: "吃鸡",
            img:
              "https://p1.meituan.net/msmerchant/14b408cceb012a142eaf8710b4da957b625295.jpg@460w_260h_1e_1c",
            pos: "好吃吗",
            price: "100"
          },
          {
            type: "all",
            title: "吃鸡",
            img:
              "https://p1.meituan.net/msmerchant/14b408cceb012a142eaf8710b4da957b625295.jpg@460w_260h_1e_1c",
            pos: "好吃吗",
            price: "100"
          },
          {
            type: "all",
            title: "吃鸡",
            img:
              "https://p1.meituan.net/msmerchant/14b408cceb012a142eaf8710b4da957b625295.jpg@460w_260h_1e_1c",
            pos: "好吃吗",
            price: "100"
          }
        ],
        part: [
          {
            type: "part",
            title: "SPA",
            img:
              "https://p1.meituan.net/msmerchant/14b408cceb012a142eaf8710b4da957b625295.jpg@460w_260h_1e_1c",
            pos: "好吃吗",
            price: "1200"
          }
        ],
        spa: [
           {
            type: "part",
            title: "SPA",
            img:
              "https://p1.meituan.net/scarlett/7b5f675c70e84c66907759c9a559e5c8112620.jpg@460w_260h_1e_1c",
            pos: "好吃吗",
            price: "1200"
          }
        ],
        movie: [
           {
            type: "part",
            title: "SPA",
            img:
              "https://p1.meituan.net/msmerchant/f3bddd6c5a0754faa5165c0d6b0d3915102768.jpg@460w_260h_1e_1c",
            pos: "好吃吗",
            price: "1200"
          }
        ],
        travel: [
           {
            type: "part",
            title: "SPA",
            img:
              "https://p0.meituan.net/msmerchant/87f84cb5c9810cfc1ba2bc53da7bbcfc849023.jpg@460w_260h_1e_1c",
            pos: "好吃吗",
            price: "1200"
          }
        ]
      }
    };
  },
  computed: {
    cur() {
      // return this.list.filter(item => item.type === this.kind);
      return this.list[this.kind]
    }
  },
  methods: {
    mouseover(e) {
      let name = e.target.getAttribute("kind");
      if(name){
        this.kind = name
      }
      // this.kind = e.target.getAttribute("kind");
    },

  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
