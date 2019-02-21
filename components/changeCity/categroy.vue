<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择</dt>
      <dd v-for="item in list" :key="item">
        <!-- 这里的26个字母是hash形式跳转 -->
        <!-- #city-B -->
        <a :href="'#city-'+item">{{item}}</a>
      </dd>
    </dl>

    <dl v-for="item in block" :key="item.title" class="m-categroy-section">
      <!-- 上面是hash设置href 我们需要用id进行匹配 -->
      <dt :id="'city-'+item.title">{{item.title}}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from "js-pinyin";
export default {
  data() {
    return {
      // 巧妙的把字符串变成数组
      list: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      block: []
    };
  },
  async mounted() {
    let self = this;
    let blocks = [];
    let {
      status,
      data: { city }
    } = await self.$axios.get("/geo/city");
    if (status === 200) {
      let p;
      let c;
      let d = {}; //每一个拼音变量对应一个城市数据数组
      city.forEach(item => {
        // 获取城市的汉字拼音
        p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1);
        // 获取城市的拼音的首字母的charCode方便排序
        c = p.charCodeAt(0);
        if (c > 96 && c < 132) {
          if (!d[p]) {
            d[p] = [];
          }
          d[p].push(item.name);
        }
      });
      // Object.entries()返回一个数组，其元素是与直接在object上找到的可枚举属性键值对相对应的数组。
      // 属性的顺序与通过手动循环对象的属性值所给出的顺序相同。
      for (let [k, v] of Object.entries(d)) {
        blocks.push({
          title: k.toUpperCase(),
          city: v
        });
      }
      // 排序
      // sort方法可以传入一个函数进行自定义排序
      blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))
      self.block = blocks
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changecity/categroy.scss";
</style>
