<template>
  <div class="goods-c-container">
    <comment :id="$route.params.id"></comment>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";
export default {
  components: {
    comment
  }
};
</script>

<style lang="less" scoped>
.goods-c-container {
  padding: 20px;
}
</style>
