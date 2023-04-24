<template>
  <div class="index-container">
    <van-pull-refresh v-model="pageLoading" @refresh="pageRefresh">
      <van-cell style="background-color: #f8f8f8;">
        <van-swipe>
          <van-swipe-item v-for="each in [1,2,3,4,5]" :key="each">
            <van-image fit="fill" :src="'/img/' + each +'.jpg'"></van-image>
          </van-swipe-item>
        </van-swipe>
      </van-cell>
      <van-cell style="background-color: #f8f8f8;">
        <van-grid :border="false" :square="true" :column-num="5" :clickable="true">
          <van-grid-item icon="photo-o" text="文字"/>
          <van-grid-item icon="photo-o" text="文字"/>
          <van-grid-item icon="photo-o" text="文字"/>
          <van-grid-item icon="photo-o" text="文字"/>
          <van-grid-item icon="photo-o" text="文字"/>
        </van-grid>
      </van-cell>
      <div class="section-panel">
        <van-cell title="正在热映" is-link value-class="title-tip" title-class="display-title">
          全部45部
        </van-cell>
        <div class="film-card-cont">
          <film-card v-for="each in films" :key="each + '1'"></film-card>
        </div>
      </div>
      <div class="section-panel">
        <van-cell title="待映推荐" is-link value-class="title-tip" title-class="display-title">
          全部45部
        </van-cell>
        <div class="film-card-cont">
          <film-card v-for="each in films" :key="each + '2'"></film-card>
        </div>
      </div>
      <div class="section-panel">
        <van-cell title="即将上映" is-link value-class="title-tip" title-class="display-title">
          全部45部
        </van-cell>
        <div class="film-card-cont">
          <film-card v-for="each in films" :key="each + '3'"></film-card>
        </div>
      </div>
      <div class="index-foot"/>
    </van-pull-refresh>
  </div>
</template>

<script>
import FilmCard from "@/views/index/components/FilmCard.vue";
import {Toast} from "vant";

export default {
  data() {
    return {
      current: 0,
      films: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      pageLoading: false
    }
  },
  methods: {
    pageRefresh() {
      this.pageLoading = false;
      Toast('刷新成功');
    },
  },
  components: {
    FilmCard
  }
}
</script>

<style lang="scss">
.index-container {
  background: #f8f8f8;
  background: linear-gradient(to bottom, #f6fbff 0%, #f8f8f8 70%, #FFFFFFFF 100%);

  .van-swipe {
    width: 100%;
    height: 100px;
    background-color: #0c7aee;
    border-radius: 10px;;

    .van-image {
      width: 100%;
      height: 100%;
    }
  }

  .section-panel {
    margin: 15px 15px;
    background-color: #FFFFFF;
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);

    .van-cell {
      padding-left: 0;
      padding-right: 0;
    }

    .display-title {
      font-weight: bold;
      letter-spacing: 2px;
      font-size: 17px;
    }

    .title-tip {
      font-size: 12px;
    }

    .film-card-cont {

      min-height: 100px;
      overflow-x: scroll;
      overflow-y: hidden;
      text-overflow: revert;
      white-space: nowrap;
    }
  }

  .index-foot {
    height: 50px;
  }
}
</style>
