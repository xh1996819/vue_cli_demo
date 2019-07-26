<template>
  <div class="vue-container">
    <!-- 头部区域 -->
    <mt-header fixed title="Vue项目">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <!-- 中间内容区域 -->
    <div class="transition">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
    <!-- 底部选项卡 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-lib" to="/home">
        <span class="mui-icon iconfont icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-lib" to="/member">
        <span class="mui-icon iconfont icon-people"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-lib" to="/shopcar">
        <span class="mui-icon iconfont icon-cart">
          <span class="mui-badge" id="badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-lib" to="/search">
        <span class="mui-icon iconfont icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      console.log(this);
      this.$router.back();
    }
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
</style>
<style scoped>
.vue-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease;
}
.transition {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  overflow-y: auto;
}

/* tabbar类名的更改 */
.mui-bar-tab .mui-tab-item-lib.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-lib {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-lib .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-lib .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>


