<template>
  <div class="cart">
    <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch
            v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectChange(item.id,$store.getters.getGoodsSelected[item.id])"
          ></mt-switch>
          <div class="goods-pic">
            <img :src="item.thumb_path" alt />
          </div>
          <div class="goods-info">
            <div class="goods-title">
              <h3>{{item.title}}</h3>
            </div>
            <div class="goods-content">
              <span class="price">￥{{item.sell_price}}</span>
              <cart-num-box
                class="num-box"
                :initCount="$store.getters.getGoodsCount[item.id]"
                :goodsId="item.id"
              ></cart-num-box>
              <a href="#" @click.prevent="delGoods(item.id,i)">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner count-amount-box">
          <div>
            <p>总计(不含运费)</p>
            <p>
              已勾选商品
              <span>{{$store.getters.getGoodsCountAndAmount.count}}</span>件,总价
              <span>￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>
            </p>
          </div>

          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartNumBox from "../subcomponents/cartNumBox.vue";
import mui from "../../assets/mui-master/dist/js/mui.js";
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
    },
    delGoods(id, i) {
      mui.confirm("是否删除该商品?", e => {
        if (e.index == 1) {
          this.goodsList.splice(i, 1);
          this.$store.commit("removeCart", id);
          mui.toast("删除成功");
        } else {
          mui.toast("已取消");
        }
      });
    },
    selectChange(id, val) {
      console.log(id, val);
      this.$store.commit("updateGoodSelected", {
        id,
        selected: val
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
.count-amount-box {
  align-items: center;
  span {
    color: #f40;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>