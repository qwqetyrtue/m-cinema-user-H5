<template>
  <van-row class="film-row">
    <van-col span="6">
      <van-image height="100%" width="100%" fit="fill" src="/img/shenghai.jpg"></van-image>
    </van-col>
    <van-col span="12">
      <van-row>不休不止</van-row>
      <van-row>
        <van-tag color="#B2B5B9" text-color="#FFFFFF">中国巨幕3d</van-tag>
      </van-row>
      <van-row>评分 9.3</van-row>
      <van-row>主演:白客,苗苗,张颂文</van-row>
    </van-col>
    <van-col span="6">
      <van-button round color="#F03D38" native-type="button" class="flat-van-button" size="small"
                  @click="toDetail('11111')">购票
      </van-button>
    </van-col>
  </van-row>
</template>
<script>

export default {
  components: {},
  methods: {
    toDetail(filmId) {
      this.$router.push("/film/detail/" + filmId)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/control.scss";
.film-row {
  height: 130px;
  box-sizing: border-box;
  border-top: 1px solid #f5f5f5;
  padding: 5px;

  & > .van-col {
    height: 100%;

    &:first-child {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;

      & > .van-image {
        border-radius: 5px;
        overflow: hidden;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      align-items: flex-start;

      & > .van-row {
        width: 100%;
        padding: 5px 0 5px 5px;

        &:first-child {
          font-size: 16px;
          font-weight: 500;
        }

        &:nth-child(2) {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;
        }

        &:nth-child(3) {
          font-size: 14px;
          color: #8F8F8F;
        }

        &:last-child {
          font-size: 14px;
          color: #8F8F8F;
        }
      }
    }

    &:last-child {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
    }
  }

}
</style>
