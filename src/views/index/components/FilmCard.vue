<template>
  <div class="film-card">
    <div class="film-image">
      <van-image style="width: 100%;height: 100%;border-radius: 5px;overflow: hidden" fit="fill"
                 src="/img/shenghai.jpg"></van-image>
      <div class="film-version">
        <!--        中国巨幕-->
        <van-tag color="rgb(0,0,0,0.5)" text-color="#FFFFFF" style="border-radius: 5px">中国巨幕3d</van-tag>
      </div>
    </div>
    <div class="film-title">
      <div>不休不止dwadwadwaddwa</div>
      <van-button native-type="button" size="small" color="#F03D38" round class="flat-van-button">购票</van-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss">
@import "@/assets/css/control.scss";

.film-card {
  display: inline-block;
  width: 80px;
  margin: 2px;

  .film-image {
    width: 80px;
    height: 112px;
    background-color: #e7e7e7;
    border-radius: 5px;
    position: relative;

    .film-version {
      position: absolute;
      display: inline-block;
      font-size: 12px;
      left: -13px;
      top: -1px;
      transform: scale(0.7);
      letter-spacing: -1px;
      padding: 0 5px;
    }
  }

  .film-title {
    height: 50px;
    padding: 10px 0px 5px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: flex-start;

    & > div:first-child {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 12px;
    }
  }
}
</style>
