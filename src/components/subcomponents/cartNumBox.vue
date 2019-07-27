<template>
  <div class="num-box">
    <div class="mui-numbox" data-numbox-step="1" data-numbox-min="1" style="height:25px;">
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <input class="mui-numbox-input" type="number" value="1" @change="changeCount" ref="numBox" />
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from "../../assets/mui-master/dist/js/mui.js";
export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    changeCount() {
      this.$emit("getCount", parseInt(this.$refs.numBox.value));
    }
  },
  props: ["max"],
  watch: {
    //监听max属性
    max: function(nV) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", nV);
    }
  }
};
</script>

<style lang="less" scoped>
.num-box {
  width: 50%;
}
.mui-numbox {
  width: 100%;
  padding: 0;
}
.mui-btn {
  width: 33% !important;
}
</style>
