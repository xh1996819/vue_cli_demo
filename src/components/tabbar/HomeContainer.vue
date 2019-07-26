<template>
  <div>
    <!-- 轮播图区域 -->
    <swiper :swiperList="msg" :flug="true"></swiper>

    <!-- 六宫格区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newsList">
          <img src="../../assets/images/menu1(1).png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/photoList">
          <img src="../../assets/images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/goodsList">
          <img src="../../assets/images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newsList">
          <img src="../../assets/images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newsList">
          <img src="../../assets/images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newsList">
          <img src="../../assets/images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      msg: ""
    };
  },
  created() {
    this.getSwipeData();
  },
  methods: {
    getSwipeData() {
      axios({
        method: "get",
        url: "api/getlunbo",
        data: {}
      }).then(res => {
        console.log(res.data);
        if (res.data.status == 0) {
          this.msg = res.data.message;
        } else {
          Toast({
            message: "轮播图数据获取失败",
            position: "middle",
            duration: 2500
          });
        }
      });
    }
  },
  components: {
    swiper
  }
};
</script>

<style scoped>
.mint-swipe .mint-swipe-items-wrap .mint-swipe-item img {
  width: 100%;
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell img {
  width: 80px;
  height: 80px;
}
</style>
