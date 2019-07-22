<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div
          class="mui-scroll"
          style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms; transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);"
        >
          <a
            :class="['mui-control-item',item.id === 0 ? 'mui-active' : '']"
            @click="getPhotoListByCateId(item.id)"
            v-for="item in cates"
            :key="item.id"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      {{flug?"暂无更多数据":""}}
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/' + item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h4 class="info-title">{{item.title}}</h4>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../assets/mui-master/dist/js/mui.js";
export default {
  data() {
    return {
      cates: [], //顶部滑动条分类数据
      list: [], //图片列表的数据
      flug: ""
    };
  },
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    //获取所有列表分类
    getAllCategory() {
      axios({
        method: "get",
        url: "/api/getimgcategory",
        data: {}
      }).then(res => {
        console.log(res);
        if (res.data.status == 0) {
          res.data.message.unshift({ title: "全部", id: 0 });
          this.cates = res.data.message;
        }
      });
    },
    //获取分类列表图片
    getPhotoListByCateId(cateId) {
      axios({
        method: "get",
        url: "/api/getimages/" + cateId,
        data: {}
      }).then(res => {
        console.log(res);
        if (res.data.status === 0 && res.data.message.length !== 0) {
          this.list = res.data.message;
          this.flug = false;
        } else {
          this.list = res.data.message;
          this.flug = true;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  li {
    position: relative;
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 8px #999;

    img {
      width: 100%;
      vertical-align: top;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      position: absolute;
      bottom: 0;
      text-align: left;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 20%;
      overflow: hidden;
      .info-title {
        font-size: 16px;
        line-height: 20px;
      }
      .info-body {
        font-size: 14px;
      }
    }
  }
}
</style>

