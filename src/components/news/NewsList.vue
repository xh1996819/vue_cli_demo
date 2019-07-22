<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsInfo/'+ item.id ">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h4>{{item.title}}</h4>
            <p class="mui-ellipsis">
              <span>发表日期:{{item.add_time | dateFormat}}</span>
              <span class="mui-pull-right">点击次数:{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newsList: null
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      axios({
        method: "get",
        url: "api/getnewslist",
        data: {}
      }).then(res => {
        console.log(res.data);
        if (res.data.status == 0) {
          this.newsList = res.data.message;
        } else {
          Toast({
            message: "新闻数据获取失败",
            position: "middle",
            duration: 2500
          });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
