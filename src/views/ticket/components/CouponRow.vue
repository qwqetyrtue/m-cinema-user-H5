<template>
  <van-cell-group class="coupon-row">
    <van-cell clickable size="large">
      <template #title>
        <van-row class="coupon-price">
          <span>1.5</span>元
        </van-row>
      </template>
      <template #label>
        <van-row class="coupon-short">
          <van-row>无使用门槛</van-row>
          <van-row>最高优惠12元</van-row>
        </van-row>
      </template>
      <template #default>
        <van-row class="coupon-name">优惠劵名称</van-row>
        <van-row class="coupon-time"> 2017.03.10-2017.12.30</van-row>
      </template>

    </van-cell>
    <van-cell>
      <van-row class="coupon-desc">
        描述信息
      </van-row>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: "CouponRow"
}
</script>

<style lang="scss">
.coupon-row {
  padding: 5px 5px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.15);

  .van-cell__title {
    flex: 1;
  }

  .van-cell__value {
    flex: 2;
  }

  .coupon-price, .coupon-short, .coupon-name, .coupon-time {
    text-align: left;
  }

  .coupon-price {
    color: #F03D38;

    span {
      font-weight: 300;
      font-size: 30px;
    }
  }

  .coupon-short {
    color: #F03D38;
    font-size: 12px;
  }

  .coupon-name {
    height: 50%;
    font-weight: bold;
    color: #000000;
  }

  .coupon-time {
    font-weight: 300;
    color: #000000;
  }

  .coupon-desc {
    color: #000000aa;
  }
}
</style>
