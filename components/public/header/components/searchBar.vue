<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            placeholder="搜索商家或地点"
            v-model="search"
            @focus="focus"
            @input="input"
            @blur="blur"
          />
          <button class="el-button el-button--primary">
            <i class="iconfont icon-search"/>
          </button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in $store.state.home.hotPlace.slice(0,4)" :key="index">
              <a href>{{item.name}}</a>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, index) in searchList" :key="index">
              <a href>
                <span>{{item.name}}</span>
                <span>{{item.type}}</span>
              </a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a href v-for="(item, index) in $store.state.home.hotPlace.slice(0,4)" :key="index">{{item.name}}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund"/>
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"/>
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"/>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>



<script>
import _ from "lodash";
export default {
  name: "searchBar",
  data() {
    return {
      search: "",
      isFocus: false,
      hotPlace: [],
      searchList: []
    };
  },
  computed: {
    isHotPlace() {
      return !this.search && this.isFocus;
    },
    isSearchList() {
      return this.search && this.isFocus;
    }
  },
  methods: {
    focus() {
      this.isFocus = true;
    },
    blur() {
      setTimeout(() => {
        this.isFocus = false;
      }, 200);
    },
    input: _.debounce(async function() {
      let self = this;
      let input = self.search;
      // 这里调用 replace是因为接口需要,不然不返回数据
      let city = self.$store.state.geo.position.city.replace("市", "");
      if (input && city) {
        let {
          status,
          data: { top }
        } = await self.$axios.get("/search/top?", {
          params: {
            input,
            city
          }
        });
        if (status === 200) {
          self.searchList = top.slice(0, 10);
        }
      }
      // let {status,data:{top}} = await self.$axios.get(`/search/top?input=${input}&city=${city}`)
    }, 300)

    // input() {

    //   let self = this
    //   let input = self.seach;
    //   let city = self.$store.state.geo.position.city.replace('市','')
    //   let {
    //     status,
    //     data:{top}
    //   } = await self.$axios.get(`/search/top?${input}${city}`)
    //   self.searchList = top.slice(0,10)
    // }
  }
};
</script>

<style lang="scss">
@import "~assets/css/public/header/search.scss";
</style>
