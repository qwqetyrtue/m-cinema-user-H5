<template>
  <div class="profile-container">
    <!-- 头部包含头像,姓名,简介等信息-->
    <van-row class="head-panel">
      <van-col span="5" class="profile-avatar">
        <van-image
            round
            width="55px"
            height="55px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="profile-user-type">普通用户</div>
      </van-col>
      <van-col span="10">
        <div class="profile-name">sharo111</div>
        <div class="profile-level">
          <span class="level">LV6</span>
          <span class="exp">30/100</span>
          <van-progress :show-pivot="false" stroke-width="2px" color="#ee0a24" :percentage="30"/>
        </div>
      </van-col>
      <van-col span="4" offset="5" class="profile-link"></van-col>
    </van-row>
    <van-row class="sign-panel">
      <van-col span="20">
        对哇对哇打底袜的
      </van-col>
    </van-row>
    <!-- 展示看过的电影和想看的电影 -->
    <van-row class="film-panel">
      <van-col class="panel-item" :span="12">
        <van-cell is-link>
          <template v-slot:title>
            <div>
              <span class="show-strong">8</span> 想看
            </div>
          </template>
        </van-cell>
      </van-col>
      <van-col class="panel-item" :span="12">
        <van-cell title="" is-link>
          <template v-slot:title>
            <div>
              <span class="show-strong">0</span> 看过
            </div>
          </template>
        </van-cell>
      </van-col>
    </van-row>
    <!-- 展示票务和优惠卷 -->
    <van-row class="ticket-panel">
      <div>我的订单</div>
      <van-grid :border="false" :column-num="4" :clickable="true">
        <van-grid-item icon="video-o" text="观影票"/>
        <van-grid-item icon="coupon-o" text="优惠卷" @click="showCoupon = true"/>
      </van-grid>
    </van-row>
    <!-- 展示影评和获赞数 -->
    <div class="post-panel">
      <div>我的影评</div>
      <van-col class="post-panel-item" :span="12">
        <van-cell is-link>
          <template v-slot:title>
            <div>
              <span class="post-panel-strong">8</span> 篇
            </div>
          </template>
        </van-cell>
      </van-col>
      <van-col class="post-panel-item" :span="12">
        <van-cell title="" is-link>
          <template v-slot:title>
            <div>
              <span class="post-panel-strong">947</span> 点赞
            </div>
          </template>
        </van-cell>
      </van-col>
    </div>

    <div class="comment-panel">

    </div>
    <div class="profile-foot">

    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {

    }
  },
  methods: {},
}
</script>

<style lang="scss">
.profile-container {
  background: #f8f8f8;
  background: linear-gradient(to bottom, #f6fbff 0%, #f8f8f8 70%, #FFFFFFFF 100%);

  .head-panel {
    height: 100px;
    padding-top: 20px;
    margin: 0 15px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;

    .profile-avatar {
      //height: 55px;
      //width: 55px;
      position: relative;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
    }

    .profile-name {
      font-size: 24px;
      color: #2789e8;
      font-weight: 400;
    }

    .profile-user-type {
      background-color: #2789e8;
      color: #ffffff;
      border-radius: 20px;
      font-size: 10px;
      text-align: center;
      font-weight: bold;
      letter-spacing: -1px;
      white-space: nowrap;
      padding: 1px 1px;
      width: 42px;
      margin-top: 2px;
    }

    .profile-level {
      margin-top: 5px;
      padding: 20px 0 10px 0;
      position: relative;
      width: 100%;

      & > span {
        font-size: 12px;
        font-weight: 500;
        color: #8F8F8F;
      }

      .level {
        background-color: #2789e8;
        color: #FFFFFF;
        font-weight: bold;
        padding: 0 2px;
        position: absolute;
        left: 0;
        top: 0;
      }

      .exp {
        position: absolute;
        right: 5px;
        top: 0;
      }
    }
  }

  .sign-panel {
    margin: 0 20px 20px 20px;
    font-size: 13px;
    color: #8F8F8F;
    text-indent: 10px;
  }

  .film-panel {
    height: 60px;
    margin: 0 15px 20px;
    border-radius: 10px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden; // 去除圆角毛边

    .panel-item {
      height: 100%;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;

      &:first-child > div {
        border-right: 2px solid #efefef;
      }

      .show-strong {
        font-weight: 400;
        font-size: 30px;
        margin-right: 5px;
      }
    }
  }

  .ticket-panel {
    height: 130px;
    margin: 0 15px 20px;
    border-radius: 10px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

    & > div:first-child {
      padding: 10px;
    }

  }

  .post-panel {
    height: 100px;
    margin: 0 15px 20px;
    border-radius: 10px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    & > div:first-child {
      padding: 10px;
    }

    .post-panel-item {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;

      &:nth-child(2) > div {
        border-right: 2px solid #efefef;
      }

      .post-panel-strong {
        font-weight: 400;
        font-size: 30px;
        margin-right: 5px;
      }
    }
  }

  .profile-foot {
    height: 1px;

  }
}
</style>
