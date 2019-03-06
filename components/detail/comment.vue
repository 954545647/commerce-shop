<template>
  <div class="com-cont">
    <div class>
      <ctem  />
    </div>
  </div>
</template>

<script>
import Ctem from "./ctem.vue";
export default {
  components: {
    Ctem
  },
};
</script>

<style lang="scss">
.com-cont {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  .tags {
    height: 80px;
    list-style: none;
    padding-top: 15px;
    padding-left: 20px;
    > li {
      float: left;
      font-size: 14px;
      line-height: 34px;
      padding: 0 10px;
      border: 1px solid #e5e5e5;
      border-radius: 2px;
      margin: 0 10px 10px 0;
      cursor: pointer;
    }
  }
  .sea {
    margin-top: 22px;
    font-size: 14px;
    > span {
      display: inline-block;
      line-height: 20px;
      cursor: pointer;
    }
  }
}
</style>
