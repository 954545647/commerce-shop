<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item,index) in menu" :key="index" @mouseenter="enter">
        <i :class="item.type"/>
        {{item.name}}
        <span class="arrow"/>
      </dd>
    </dl>
    <div class="detail" v-if="kind" @mouseenter="denter" @mouseleave="dleave">
      <template v-for="(item,index) in currentData.child">
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="list in item.child" :key="list">{{list}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: "", //当前是哪一类
      timer: "",
      menu: [
        {
          type: "food",
          name: "美食",
          child: [
            {
              title: "美食",
              child: ["代金券", "甜点饮品", "火锅", "自助餐", "小吃快餐"]
            }
          ]
        },
        {
          type: "takeout",
          name: "外卖",
          child: [
            {
              title: "外卖",
              child: ["美团外卖"]
            }
          ]
        },
        {
          type: "hotel",
          name: "酒店",
          child: [
            {
              title: "酒店星级",
              child: ["经济型", "舒适/三星", "高档/四星", "豪华/五星"]
            }
          ]
        }
      ]
    };
  },
  computed: {
    currentData() {
      // console.log(this.menu.filter(item => item.type == this.kind)[0]); //返回的是一个数组
      return this.menu.filter(item => item.type == this.kind)[0];
    }
  },
  methods: {
    mouseleave() {
      this.timer = setTimeout(() => {
        this.kind = "";
      }, 150);
    },
    enter(e) {
      // console.log(e.target.querySelector('i').className)
      this.kind = e.target.querySelector("i").className;
    },
    denter() {
      clearTimeout(this.timer);
    },
    dleave() {
      this.kind = "";
    }
  }
};
</script>
