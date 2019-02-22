<template>
  <div class="m-istyle">
    <dl @mouseover="mouseover">
      <dt>有格调</dt>
      <dd :class="{active:kind==='all'}" kind="all" keyword="景点">全部</dd>
      <dd :class="{active:kind==='part'}" kind="part" keyword="美食">约会聚餐</dd>
      <dd :class="{active:kind==='spa'}" kind="spa" keyword="丽人">丽人SPA</dd>
      <dd :class="{active:kind==='movie'}" kind="movie" keyword="电影">电影演出</dd>
      <dd :class="{active:kind==='travel'}" kind="travel" keyword="旅游">品质出游</dd>
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
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    };
  },
  computed: {
    cur() {
      // return this.list.filter(item => item.type === this.kind);
      return this.list[this.kind];
    }
  },
  // 一进来就是全部
  async mounted() {
    let self = this;
    let {
      status,
      data: { count, pois }
    } = await self.$axios.get("/search/resultsByKeywords", {
      params: {
        keyword: "景点",
        // city: self.$store.state.geo.position.city
        // city: sessionStorage.getItem('currentCity')
        city: localStorage.getItem('currentCity')
      }
    });
    if (status === 200 && count > 0) {
      let r = pois
        .filter(item => item.photos.length)
        .map(item => {
          return {
            title: item.name,
            pos: item.type.split(";")[0],
            price: item.biz_ext.cost || "暂无",
            img: item.photos[0].url,
            url: "//abc.com"
          };
        });
      self.list[self.kind] = r.slice(0, 9);
    } else {
      self.list[self.kind] = [];
    }
  },
  methods: {
    async mouseover(e) {
      let dom = e.target; //目标元素
      let tag = dom.tagName.toLowerCase(); //目标元素的标签名
      let self = this;
      if (tag === "dd") {
        this.kind = dom.getAttribute("kind"); //获取类型
        let keyword = dom.getAttribute("keyword"); //获取关键词
        let {
          status,
          data: { count, pois }
        } = await self.$axios.get("/search/resultsByKeywords", {
          params: {
            city: self.$store.state.geo.position.city,
            keyword
          }
        });
        if (status === 200 && count > 0) {
          let r = pois
            // filter是进行数据过滤,排除没有图片的
            .filter(item => {
              return item.photos.length;
            })
            // map进行一次数据映射,修改后端返回过来的字段
            .map(item => {
              return {
                title: item.name,
                pos: item.type.split(";")[0],
                price: item.biz_ext.cost || "暂无",
                img: item.photos[0].url,
                url: "//abc.com"
              };
            });
          self.list[self.kind] = r.slice(0, 9);
        } else {
          self.list[self.kind] = [];
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
