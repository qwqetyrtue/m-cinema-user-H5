<template>
  <van-row class="search-jump van-cell--clickable " role="button" @click="jumpHandler">
    <van-col span="24">
      <van-icon name="search" :color="color"></van-icon>
      <van-notice-bar :scrollable="false" :color="color" :background="background" style="width: 100%;height: 100%">
        <van-swipe
            style="height: 40px;line-height: 40px;"
            vertical
            :autoplay="autoplay"
            :show-indicators="false"
        >
          <van-swipe-item v-for="each in list" :key="each">{{ each }}</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </van-col>
  </van-row>
</template>

<script>
export default {
  name: "SearchJump",
  methods: {},
  props: {
    jumpHandler: {
      type: Function,
      default: () => {
      }
    },
    color: {
      type: String,
      default: "#8F8F8F"
    },
    background: {
      type: String,
      default: "transparent"
    },
    autoplay: {
      type: Number,
      default: 3000
    },
    list: {
      type: Array,
      default: () => {
        return ['内容1', '内容2', '内容3']
      }
    }
  }
}
</script>

<style lang="scss">
.search-jump {
  background: #FFFFFF;
  border-bottom: 1px solid #f5f5f5;
  width: 100%;
  height: 40px;
  padding: 3px 30px;
  box-sizing: border-box;

  & > .van-col:first-child {
    width: 100%;
    height: 100%;
    background-color: #F4F4F4;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-left: 10px;
  }

  .van-notice-bar {
    padding-left: 5px;
  }
}
</style>
