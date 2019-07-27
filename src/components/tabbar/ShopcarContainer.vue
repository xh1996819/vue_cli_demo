<template>
  <div class="cart">
    <div class="mui-card" v-for="item in goodsList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch></mt-switch>
          <div class="goods-pic">
            <img :src="item.thumb_path" alt />
          </div>
          <div class="goods-info">
            <div class="goods-title">
              <h3>{{item.title}}</h3>
            </div>
            <div class="goods-content">
              <span class="price">￥{{item.sell_price}}</span>
              <cart-num-box class="num-box"></cart-num-box>
              <a href="#">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等</div>
      </div>
    </div>
  </div>
</template>

<script>
import cartNumBox from "../subcomponents/cartNumBox.vue";
export default {
  data() {
    return {
      goodsList: []
    };
  },
  created() {
    this.getCartList();
  },
  methods: {
    getCartList() {
      let idArr = [];
      this.$store.state.cart.forEach(item => {
        idArr.push(item.id);
      });
      if (idArr.length <= 0) {
        return;
      }
      axios({
        method: "get",
        url: "/api/goods/getshopcarlist/" + idArr.join(","),
        data: {}
      }).then(res => {
        console.log(res);
        this.goodsList = res.data.message;
      });
    }
  },
  components: {
    cartNumBox
  }
};
</script>

<style lang="less" scoped>
.cart {
  padding-top: 10px;
  background-color: #eee;
  .mui-card-content-inner {
    display: flex;
    justify-content: space-around;
    .goods-info {
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 14px;
      .goods-title {
        h3 {
          font-size: 13px;
          margin-top: 0;
          line-height: 18px;
        }
      }
      .goods-content {
        display: flex;
        justify-content: space-between;
        span {
          color: #f40;
          font-weight: 600;
          line-height: 25px;
        }
        a {
          line-height: 25px;
        }
      }
    }
    .goods-pic {
      margin-left: 15px;
      width: 60px;
      img {
        width: 100%;
      }
    }
  }
}
.mui-card-content {
  text-indent: 0;
}
.mui-card-content-inner {
  padding: 12px;
}
</style>