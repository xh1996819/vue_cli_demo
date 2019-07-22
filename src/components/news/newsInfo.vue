<template>
  <div>
    <div class="mui-card">
      <!--页眉，放置标题-->
      <div class="mui-card-header mui-card-media">
        <div class="mui-media-body">
          <h4>{{newsInfo.title}}</h4>
          <p>
            发表于 {{newsInfo.add_time | dateFormat}}
            <span
              class="mui-pull-right"
            >点击次数:{{newsInfo.click}}</span>
          </p>
        </div>
      </div>
      <!--内容区-->
      <div class="mui-card-content" v-html="newsInfo.content"></div>
      <!--页脚，放置补充信息或支持的操作-->
      <div class="mui-card-footer">
        <!-- 评论区域 -->
        <comment :id="this.id"></comment>
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
      newsInfo: ""
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      axios({
        method: "get",
        url: "api/getnew/" + this.id,
        data: {}
      }).then(res => {
        console.log(res.data.message[0]);
        this.newsInfo = res.data.message[0];
      });
    }
  },
  components: {
    comment
  }
};
</script>

<style scope>
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
.mui-card {
  margin-top: 0 !important;
}
</style>
