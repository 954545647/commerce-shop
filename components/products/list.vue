<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name,item.active?'s-nav-active':'',ifup?'isUp':'isDown']"
        @click="navSelect(item.name)"
      >{{ item.txt }}</dd>
    </dl>
    <ul>
      <Item
        v-for="(item,idx) in parentList"
        :key="idx"
        :meta="item"
        :position="item.location"
        :name="item.name"
        @handleName="handleName"
        @mouseover="over(item.location)"
      />
    </ul>
  </div>
</template>

<script>
import Item from "./product.vue";
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      nav: [
        {
          name: "s-default",
          txt: "智能排序",
          active: true
        },
        {
          name: "s-price",
          txt: "价格排行",
          active: false
        },
        {
          name: "s-visit",
          txt: "人气最高",
          active: false
        },
        {
          name: "s-comment",
          txt: "评价最高",
          active: false
        }
      ],
      parentList: this.list, //商品详情数据
      ifHigh: false, //是否从高到低
      ifup: true //是否点击上
    };
  },
  methods: {
    handleName(val) {
      this.$emit("currentName", val);
    },
    over(location) {
      this.$emit("currentPoint", location);
    },
    navSelect: function(name) {
      let self = this;
      if (name === "s-default") {
        self.nav[0].active = true;
        self.nav[1].active = false;
        self.nav[2].active = false;
        self.nav[3].active = false;
        let items = self.parentList;
        items.sort(function(a, b) {
          return a.name.length - b.name.length;
        });
        self.parentList = items;
      } else if (name === "s-price") {
        self.nav[0].active = false;
        self.nav[1].active = true;
        self.nav[2].active = false;
        self.nav[3].active = false;
        let items = self.parentList;
        // 如果是从高到低排序
        if (self.ifHigh) {
          items.sort(function(a, b) {
            return a.price - b.price;
          });
          self.ifHigh = false;
          self.ifup = false;
        } else {
          items.sort(function(a, b) {
            return b.price - a.price;
          });
          self.ifHigh = true;
          self.ifup = true;
        }
        self.parentList = items;
      } else if (name === "s-visit") {
        self.nav[2].active = true;
        self.nav[0].active = false;
        self.nav[1].active = false;
        self.nav[3].active = false;
        let items = self.parentList;
        items.sort(function(a, b) {
          return b.comment - a.comment;
        });
        self.parentList = items;
      } else if (name === "s-comment") {
        self.nav[1].active = false;
        self.nav[0].active = false;
        self.nav[2].active = false;
        self.nav[3].active = true;
        let items = self.parentList;
        items.sort(function(a, b) {
          return b.rate - a.rate;
        });
        self.parentList = items;
      }
    }
  }
};
</script>

<style lang="scss">
.isUp {
    &:after {
      border-top-color: #13d1be !important;
    }
}
.isDown {
    &:before {
      border-bottom-color: #13d1be !important;
    }
}

</style>


// <style lang="scss">
// .m-products-list {
//   box-sizing: border-box;
//   margin-top: 10px;
//   background: #fff;
//   border: 1px solid #e5e5e5;
//   border-radius: 4px;
//   color: #333;
//   font-size: 14px;
//   line-height: 20px;
//   padding: 11px 20px;

//   > dl {
//     dd {
//       width: 96px;
//       height: 20px;
//       display: inline-block;
//       box-sizing: border-box;
//       text-align: center;
//       cursor: pointer;

//       &.s-nav-active {
//         color: #31bcad;
//       }
//     }

//     padding-bottom: 2px;

//     .s-price {
//       position: relative;

//       &:before,
//       &:after {
//         content: " ";
//         position: absolute;
//         right: 8px;
//         top: 0;
//         border: 4px solid transparent;
//         border-bottom-color: #ddd;
//         width: 0;
//         height: 0;
//       }

//       &:after {
//         top: 12px;
//         border-bottom-color: transparent;
//         &:visited {
//           border-top-color: #13d1be !important;
//         }
//       }
//     }
//   }

//   > ul {
//     list-style: none;
//     padding: 11px 0;
//   }
// }
//
</style>
