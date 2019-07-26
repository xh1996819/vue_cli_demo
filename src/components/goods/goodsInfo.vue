<template>
  <div class="goodsInfo-container">
    <!-- 购物车小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlug" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :swiperList="goodsSwiper" :flug="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{goodsInfo.market_price}}</del>
            销售价:
            <span>￥{{goodsInfo.sell_price}}</span>
          </p>
          <div class="inline">
            <span class="num">购买数量:</span>
            <number-box @getCount="getSelectedCount" :max="goodsInfo.stock_quantity"></number-box>
          </div>
          <mt-button type="primary" size="small">立刻购买</mt-button>
          <mt-button type="danger" size="small" @click="goToCart">加入购物车</mt-button>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsInfo.goods_no}}</p>
          <p>库存情况:剩余{{goodsInfo.stock_quantity}}件</p>
          <p>上架时间:{{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
import numberBox from "../subcomponents/numberBox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsSwiper: [],
      goodsInfo: {},
      ballFlug: false,
      selectedCount: 1
    };
  },
  components: {
    swiper,
    numberBox
  },
  created() {
    this.getGoodsSwiper();
    this.getGoodsInfo();
  },
  methods: {
    getGoodsSwiper() {
      axios({
        method: "get",
        url: "/api/getthumimages/" + this.id,
        data: {}
      }).then(res => {
        console.log(res.data);
        if (res.data.status === 0) {
          res.data.message.forEach(item => {
            item.img = item.src;
          });
          this.goodsSwiper = res.data.message;
        }
      });
    },
    getGoodsInfo() {
      axios({
        method: "get",
        url: "/api/goods/getinfo/" + this.id,
        data: {}
      }).then(res => {
        // console.log(res);
        this.goodsInfo = res.data.message[0];
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsDesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodsComment", params: { id } });
    },
    goToCart() {
      this.ballFlug = !this.ballFlug;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;

      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      let xDist = badgePosition.left - ballPosition.left;
      let yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all .6s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlug = !this.ballFlug;
    },
    getSelectedCount(count) {
      this.selectedCount = count;
      // console.log("father" + this.selectedCount);
    }
  }
};
</script>

<style lang="less" scoped>
.goodsInfo-container {
  background-color: #eee;
}
.mui-card-content {
  text-indent: 0;
}
.num {
  line-height: 33px;
}
.inline {
  display: flex;
}
.mui-card-footer {
  display: block;
}
.mint-button {
  margin: 10px 0;
}
.price {
  span {
    color: #f40;
    font-weight: 600;
  }
}
.mui-card-content-inner {
  .mint-button:last-child {
    margin-left: 10px;
  }
}
.ball {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ef4f4f;
  position: absolute;
  top: 337px;
  left: 135px;
  z-index: 199;
}
</style>
