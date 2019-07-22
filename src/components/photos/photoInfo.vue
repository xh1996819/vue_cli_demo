<template>
  <div>
    <div class="mui-card">
      <!--页眉，放置标题-->
      <div class="mui-card-header mui-card-media">
        <div class="mui-media-body">
          <h4>{{photoInfo.title}}</h4>
          <p>
            发表于 {{photoInfo.add_time | dateFormat}}
            <span
              class="mui-pull-right"
            >浏览:{{photoInfo.click}}</span>
          </p>
        </div>
      </div>
      <!--内容区-->
      <vue-preview :slides="imgs"></vue-preview>

      <div class="mui-card-content" v-html="photoInfo.content"></div>
      <!--页脚，放置补充信息或支持的操作-->
      <div class="mui-card-footer">
        <!-- 评论区域 -->
        <comment :id="id"></comment>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {},
      imgs: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumPic();
  },
  methods: {
    getPhotoInfo() {
      axios({
        method: "get",
        url: "/api/getimageInfo/" + this.id,
        data: {}
      }).then(res => {
        console.log(res);
        this.photoInfo = res.data.message[0];
      });
    },
    getThumPic() {
      axios({
        method: "get",
        url: "/api/getthumimages/" + this.id,
        data: {}
      }).then(res => {
        console.log(res);
        if (res.data.status === 0) {
          this.imgs = res.data.message;
          this.imgs.forEach(item => {
            (item.w = 500), (item.h = 500);
            item.msrc = item.src;
          });
        }
      });
    }
  },
  components: {
    comment
  }
};
</script>
<style>
.my-gallery {
  display: flex;
  flex-wrap: wrap;
}
.my-gallery figure {
  margin: 0;
  padding: 5px;
  width: 33.3333%;
}
.my-gallery figure img {
  width: 100%;
  vertical-align: top;
}
</style>

<style lang="less" scoped>
.mui-card-header.mui-card-media .mui-media-body {
  margin-left: 0 !important;
}
.mui-card {
  box-shadow: 0 0 0 0 !important;
}
.mui-card-header.mui-card-media {
  padding: 8px !important;
}
.mui-card-content {
  text-indent: 2em;
}
</style>
