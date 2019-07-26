<template>
  <div>
    <!-- 轮播图组件-->
    <mt-swipe :auto="3000">
      <!-- 谁使用此轮播图组件,谁传递swiperList -->
      <mt-swipe-item v-for="item in swiperList" :key="item.id">
        <img :src="item.img" :class="{'home-width' : flug}" alt />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ["swiperList", "flug"]
};
</script>

<style lang="less">
.mint-swipe {
  height: 200px;
  text-align: center;
}
.mint-swipe img {
  height: 100%;
  vertical-align: top;
}

.home-width {
  width: 100%;
}
</style>
