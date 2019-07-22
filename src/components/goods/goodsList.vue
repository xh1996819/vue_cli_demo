<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodsList" :key="item.id">
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <del class="old">￥{{item.market_price}}</del>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <!-- 加载更多按钮 -->
    <mt-button type="danger" size="large" @click="getMore" :disabled="flug">{{ flug?'暂无更多':'点击加载'}}</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      goodsList: [],
      flug: false
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      axios({
        method: "get",
        url: "/api/getgoods?pageindex=" + this.pageIndex,
        data: {}
      }).then(res => {
        console.log(res);
        if (res.data.status === 0 && res.data.message.length !== 0) {
          this.goodsList = this.goodsList.concat(res.data.message);
        } else {
          this.flug = !this.flug;
        }
      });
    },
    getMore() {
      this.pageIndex++;
      this.getGoodsList();
    }
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 6px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 300px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: #f20;
          font-size: 16px;
          font-weight: 600;
        }
        .old {
          margin-left: 10px;
          font-size: 12px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>
