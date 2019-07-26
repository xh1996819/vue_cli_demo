<template>
  <div class="goods-container">
    <!-- 标题 -->
    <h3>{{goodsDesc.title}}</h3>
    <!-- 分割线 -->
    <hr />
    <!-- 内容部分 -->
    <div class="content" v-html="goodsDesc.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsDesc: {}
    };
  },
  created() {
    this.getDesc();
  },
  methods: {
    getDesc() {
      axios({
        method: "get",
        url: "/api/goods/getdesc/" + this.$route.params.id,
        data: {}
      }).then(res => {
        console.log(res.data.message[0]);
        this.goodsDesc = res.data.message[0];
      });
    }
  }
};
</script>

<style lang="less">
.goods-container {
  h3 {
    padding: 10px;
    font-size: 16px;
    color: #226aff;
    text-align: center;
  }
  .content {
    table {
      width: 100% !important;
      img {
        width: 100%;
        height: auto !important;
        vertical-align: top;
      }
    }
    p {
      margin: 0;
    }
    p:first-child {
      text-indent: 2em;
    }
    padding: 5px;
    img {
      width: 100%;
      height: auto !important;
      vertical-align: top;
    }
  }
}
</style>
