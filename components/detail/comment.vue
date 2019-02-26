<template>
  <div class="com-cont">
    <ul class="tags clear">
      <li class>
        味道赞
        (271)
      </li>
      <li class>
        服务热情
        (199)
      </li>
      <li class>
        菜品不错
        (86)
      </li>
      <li class>
        回头客
        (85)
      </li>
      <li class>
        性价比高
        (84)
      </li>
      <li class>
        价格实惠
        (82)
      </li>
      <li class>
        分量足
        (76)
      </li>
      <li class>
        上菜快
        (70)
      </li>
      <li class>
        干净卫生
        (64)
      </li>
      <li class>朋友聚餐(6)</li>
      <li class>朋友聚餐(6)</li>
    </ul>
    <div class="sea">
      <span>
        <b class></b>
        只看有图片的评论
      </span>
    </div>
    <div class>
      <ctem/>
    </div>
  </div>
</template>

<script>
import Ctem from "./ctem.vue";
export default {
  components: {
    Ctem
  }
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
