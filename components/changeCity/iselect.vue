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
import { async } from "q";
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
    // 监听第一个选择框值的变化
    // 当选择了某个省份之后就立刻去获取该省份的城市列表
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
      // 北京天津返回的是市辖区,要手动修改
      if (newPvalue == "110000") {
        self.city = [{ value: newPvalue, label: "北京市" }];
        self.cvalue = "";
        return;
      }
      if (newPvalue == "120000") {
        self.city = [{ value: newPvalue, label: "天津市" }];
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
    },
    // 监听第二个选择框的变化，只要变化了就把当前选择框选中的值保存到本地
    async cvalue(newCvalue) {
      let data;
      if (newCvalue) {
        data = this.city.filter(item => {
          return newCvalue == item.value;
        });
      }
      const currentPro = this.province.filter(item => {
        return item.value == this.pvalue;
      });
      window.localStorage.setItem("currentCity", data[0].label);
      window.localStorage.setItem("currentPro", currentPro[0].label);
      this.$router.push("/");
    }
  },
  // 页面渲染完毕后就通过异步方式去获取省份的数据
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
    // 用户进行筛选的时候触发,但并未选择点击
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
        } else {
          cb([]);
        }
      }
    }, 200),
    // 用户选择好之后点击触发
    handleSelect: async function(item) {
      let val = item.value;
      // sessionStorage.setItem("currentCity", item.value);
      const {
        status,
        data: { city }
      } = await this.$axios.get("/geo/city");
      // 根据选择的和城市列表去匹配,获取省份的值
      const currentPro = city.filter(pro => {
        return pro.name == val;
      });
      window.localStorage.setItem("currentPro", currentPro[0].province);
      window.localStorage.setItem("currentCity", item.value);
      this.$router.push("/");
      // window.location='/'
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";
.name {
  font-size: 16px;
}
.sp {
  margin-left: 100px;
}
</style>
