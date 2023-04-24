<template>
  <div class="film-container">
    <van-pull-refresh v-model="pageLoading" @refresh="pageRefresh">
      <search-jump :jump-handler="toSearchHandler"/>
      <van-tabs v-model="active"
                title-active-color="#F1364B"
                title-inactive-color="#000000"
                line-width="0"
                line-height="0">
        <van-row class="activity-panel">
          <van-image width="100%" height="100%" src="/img/1.jpg"></van-image>
        </van-row>
        <van-tab title="热映">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <film-row v-for="item in list" :key="item" :title="item"/>
          </van-list>
        </van-tab>
        <van-tab title="待映">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <film-row v-for="item in list" :key="item" :title="item"/>
          </van-list>
        </van-tab>
        <van-tab title="即将上映">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <film-row v-for="item in list" :key="item" :title="item"/>
          </van-list>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
  </div>
</template>

<script>
import FilmRow from "@/views/film/components/FilmRow";
import SearchJump from "@/components/SearchJump/index.vue";
import {Toast} from "vant";

export default {
  name: 'Film',
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      pageLoading: false,
    }
  },
  methods: {
    toSearchHandler() {
      this.$router.push('/film/search')
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 20) {
          this.finished = true;
        }
      }, 1000);
    },
    pageRefresh() {
      this.pageLoading = false;
      Toast('刷新成功');
    },
  },
  components: {
    FilmRow, SearchJump
  }
}
</script>

<style lang="scss">
.film-container {
  background: #f8f8f8;
  background: linear-gradient(to bottom, #f6fbff 0%, #f8f8f8 70%, #FFFFFFFF 100%);

  .activity-panel {
    width: 100%;
    height: 90px;
  }

  .van-tabs__wrap {
    width: 60vw;
    margin: 0 auto;
    background-color: transparent;

    div {
      background-color: transparent;
    }
  }

  .van-tabs__content {
    padding: 0 5px;
  }

}
</style>
