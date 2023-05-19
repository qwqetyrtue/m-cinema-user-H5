<template>
  <div class="coupon-container">
    <van-nav-bar
        :title="$route.meta.title"
        left-text="返回"
        left-arrow
        fixed
        placeholder
        @click-left="$router.back()"
    />
    <van-search v-model="couponCode" shape="round" left-icon="" placeholder="请输入优惠码" show-action>
      <template #action>
        <span style="color: #F03D38;display: inline-block;width: 50px;text-align: center;">兑换</span>
      </template>
    </van-search>
    <van-tabs v-model="active"
              title-active-color="#F1364B"
              title-inactive-color="#000000"
              line-width="0"
              line-height="0">
      <van-tab title="可用" name="1">
        <coupon-row/>
        <coupon-row/>
      </van-tab>
      <van-tab title="已过期" name="2">

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import CouponRow from "@/views/ticket/components/CouponRow.vue";

export default {
  name: "Coupon",
  components: {CouponRow},
  data() {
    return {
      couponCode: null,
      active: '1'
    }
  }
}
</script>

<style lang="scss">
.coupon-container {
  .van-tabs__wrap {
    width: 60vw;
    margin: 0 auto;
    background-color: transparent;

    div {
      background-color: transparent;
    }
  }

  .van-tabs__content {
    padding: 0 10px;
  }

  .coupon-row {
    margin-bottom: 10px;
  }
}
</style>
