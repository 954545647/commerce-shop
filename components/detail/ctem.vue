<template>
  <div class="list clear">
    <div class="header">

    </div>
    <div class="info">
      <span class="name">符符符虹耶</span>
      <div class="date">
        <span>2019年2月23日</span>
      </div>
      <div class="block">
        <span class="demonstration"></span>
        <el-rate v-model="value"></el-rate>
      </div>
      <div class="desc">态度超好！超美味！这是全广州最好吃的重庆火锅了吧！</div>
      <swiper :options="swiperOption" class="swiper">
        <swiper-slide v-for="(item,idx) in imgs" :key="idx">
          <img :src="item.url" class="Img">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "@/assets/css/swiper.css";
export default {
  data() {
    return {
      value: 2,
      imgs: [],
      // imgs: [
      //   {
      //     url:
      //       "http://p0.meituan.net/shaitu/149dabe74e31e7acb1e45688547a60841962139.jpg"
      //   },
      //   {
      //     url:
      //       "http://p0.meituan.net/shaitu/73d4442bd54fee0b371a6ec1b46e2e5d1649194.jpg"
      //   },
      //   {
      //     url:
      //       "http://p0.meituan.net/shaitu/3546806bd981ea7fea39acbf4b8f9e001319489.jpg"
      //   },
      //   {
      //     url:
      //       "http://p0.meituan.net/shaitu/1a0c1090bb89007d46826114eedc0b202103538.jpg"
      //   },
      //   {
      //     url:
      //       "http://p0.meituan.net/shaitu/83b3d75d60ec6f5ee6941a6be9bdfacc1605868.jpg"
      //   },
      //   {
      //     url:
      //       "http://p0.meituan.net/shaitu/d6b8bde4640ab8c207b2a1486d18edc91735870.jpg"
      //   }
      // ],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style lang="scss">
.list {
  padding: 30px 0 0 30px;
  .header {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    float: left;
    > img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .info {
    float: left;
    padding-left: 20px;
    width: 828px;
    .name {
      font-size: 16px;
      color: #222;
      line-height: 22px;
      margin-bottom: 1px;
    }
    .block {
      line-height: 0px;
      margin-top: 4px;
      height: 20px;
      font-size: 11px;
    }
    .date {
      font-size: 12px;
      line-height: 20px;
      color: #999;
      > span {
        float: right;
      }
    }
    .desc {
      font-size: 14px;
      line-height: 20px;
      padding-top: 4px;
    }
    .swiper {
      .Img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
.clear:after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
}
</style>
