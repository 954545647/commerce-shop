<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select v-model="cvalue" placeholder="城市" :disabled="!city.length">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <span class="name sp">直接输入:</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>


<script>
import _ from "lodash";
export default {
  data() {
    return {
      pvalue: "",
      province: [],
      city: [],
      cvalue: "",
      input: "",
      cities: [] //搜索框的全部城市集合
    };
  },
  watch: {
    async pvalue(newPvalue) {
      let self = this;
      // 由于后台接口没有香港澳门台湾的数据,自己处理
      if (newPvalue == "810000") {
        self.city = [{ value: "810000", label: "香港" }];
        self.cvalue = "";
        return;
      }
      if (newPvalue == "820000") {
        self.city = [{ value: newPvalue, label: "澳门" }];
        self.cvalue = "";
        return;
      }
      if (newPvalue == "710000") {
        self.city = [{ value: newPvalue, label: "台湾" }];
        self.cvalue = "";
        return;
      }

      let {
        status,
        data: { city }
      } = await self.$axios.get(`/geo/province/${newPvalue}`);
      if (status === 200) {
        self.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
        self.cvalue = "";
      }
    }
  },
  async mounted() {
    // this.self = this;
    let {
      status,
      data: { province }
    } = await this.$axios.get("/geo/province");
    if (status === 200) {
      this.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        };
      });
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(queryString, cb) {
      // queryString是用户选择的选项,cb是回调函数,返回数据(必须有value值)
      let self = this;
      // 如果全国城市已经存在的话,那么就直接进行筛选
      if (self.cities.length) {
        cb(self.cities.filter(item => item.value.indexOf(queryString) > -1));
      } else {
        let {
          status,
          data: { city }
        } = await self.$axios.get("/geo/city");
        if (status == 200) {
          self.cities = city.map(item => {
            // element-UI规定返回的数据必须带value值
            return {
              value: item.name
            };
          });
          cb(self.cities.filter(item => item.value.indexOf(queryString) > -1));
        }else{
          cb([])
        }
      }
    }, 200),
    handleSelect: function(item) {
      sessionStorage.setItem("currentCity", item.value);
      this.$router.push('/')
      // window.location='/'
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";
.name{
  font-size: 16px;
}
.sp{
  margin-left : 100px;
}
</style>
