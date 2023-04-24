<template>
  <div class="app-layout">
    <van-sticky>
      <van-cell style="border-top: 1px solid #efefef;border-bottom: 1px solid #efefef;">
        <template #title>
         <div style="display: flex;flex-flow: row;align-items: center;">
           <van-icon size="20" :name="require('@/assets/logo.png')"/>
           <span>m-cinema</span>
         </div>
        </template>
        <template #right-icon v-if="router === 'Profile'">
          <van-icon name="ellipsis" size="16px"  style="line-height: 24px;" @click="showAction = true"/>
        </template>
      </van-cell>
    </van-sticky>
    <router-view/>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" replace to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="fire-o" to="/community/index" replace>社区</van-tabbar-item>
      <van-tabbar-item icon="coupon-o" to="/film/index" replace>观影</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/profile/index" replace>我的</van-tabbar-item>
    </van-tabbar>
    <van-action-sheet v-model="showAction">
      <van-row class="action-sheet-content">
        <van-grid :border="false" :square="true" :clickable="true">
          <van-grid-item icon="records" text="编辑资料" />
          <van-grid-item icon="user-circle-o" text="查看头像" />
        </van-grid>
      </van-row>
    </van-action-sheet>
  </div>
</template>

<script>
import {Toast} from "vant";

export default {
  created() {
  },
  data() {
    return {
      showAction: false,
    }
  },
  computed: {
    router() {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss">
.action-sheet-content {
  .van-grid {
    padding: 10px;
    color: #8F8F8F;
  }
}
</style>
