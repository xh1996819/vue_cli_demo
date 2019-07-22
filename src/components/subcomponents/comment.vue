<template>
  <div class="comment-box">
    <h4>发表评论</h4>
    <div class="mui-input-row" style="margin: 10px 5px;">
      <textarea
        id="textarea"
        rows="5"
        placeholder="请输入要评论的内容（最多吐槽120字）"
        maxlength="120"
        v-model="msg"
      ></textarea>
    </div>
    <mt-button class="mui-pull-right" type="primary" @click="postComment">发表评论</mt-button>
    <!-- 评论列表 -->
    <h4 class="commmentH4">网友评论</h4>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item, i) in commentList" :key="i">
        <a href="javascript:;">
          <div class="mui-media-body">
            {{i+1}}楼 {{item.user_name}}
            <span
              class="mui-pull-right"
            >发表时间:{{item.add_time | dateFormat}}</span>
            <p class="mui-ellipsis">{{item.content == 'undefined' ? '此用户未发表评论' : item.content}}</p>
          </div>
        </a>
      </li>
    </ul>
    <mt-button
      class="mui-pull-right"
      plain
      type="danger"
      @click="getMore"
      :disabled="flug"
    >{{flug?"暂无更多":"加载更多"}}</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      commentList: [],
      pageIndex: 1,
      msg: "",
      flug: false
    };
  },
  props: ["id"],
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      axios({
        method: "get",
        url: "/api/getcomments/" + this.id + "?pageindex=" + this.pageIndex,
        data: {}
      }).then(res => {
        console.log(res.data.message);
        if (res.data.status === 0 && res.data.message.length !== 0) {
          this.commentList = this.commentList.concat(res.data.message);
        } else {
          this.flug = !this.flug;
        }
      });
    },
    getMore() {
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      if (this.msg.trim().length === 0) {
        return Toast({
          message: "评论内容不能为空",
          position: "middle",
          duration: 2000
        });
      }
      axios({
        method: "post",
        url: "/api/postcomment/" + this.id,
        data: {
          content: this.msg.trim()
        }
      }).then(res => {
        if (res.data.status == 0) {
          let newCom = {
            user_name: "",
            add_time: Date.now(),
            content: this.msg.trim()
          };
          this.commentList.unshift(newCom);
          this.msg = "";
          Toast({
            message: "评论成功",
            position: "middle",
            duration: 1500
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.comment-box,
.mui-input-row {
  width: 100%;
}
#textarea {
  margin-bottom: 0;
}
.commmentH4 {
  margin-top: 30px;
}
</style>
