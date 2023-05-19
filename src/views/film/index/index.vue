<template>
  <div class="film-container">
    <van-pull-refresh v-model="pageLoading" @refresh="pageRefresh">
      <search-jump to="/film/search"/>
      <van-tabs v-model="active"
                @change="activeChangeHandler"
                title-active-color="#F1364B"
                title-inactive-color="#000000"
                line-width="0"
                line-height="0">
        <van-row class="activity-panel">
          <van-image width="100%" height="100%" src="/img/1.jpg"></van-image>
        </van-row>
        <van-tab title="热映" name="hot">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <film-row v-for="item in list" :key="item.filmId" :title="item" :film="item"/>
          </van-list>
        </van-tab>
        <van-tab title="待映" name="tobe">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <film-row v-for="item in list" :key="item.filmId" :title="item" :film="item"/>
          </van-list>
        </van-tab>
        <van-tab title="即将上映" name="soon">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <film-row v-for="item in list" :key="item.filmId" :title="item" :film="item"/>
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
import {filmPageTypeFilmReq} from "@/api/film";

export default {
  name: 'Film',
  created() {
    this.active = this.$route.query.active || 'hot'
  },
  data() {
    return {
      active: 'hot',
      list: [],
      paging: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      loading: false,
      finished: false,
      pageLoading: false,
    }
  },
  methods: {
    fetchData(type, params, paging) {
      this.loading = true
      filmPageTypeFilmReq(type, params, paging)
          .then(({msg, data}) => {
            for (let each of data.list)
              this.list.push(each)
            if (!data.hasNextPage) this.finished = true
            else this.paging.pageNum++;
            this.loading = false
          })
    },
    activeChangeHandler(name, title) {
      this.list = []
      this.finished = false
      this.paging.pageNum = 1
      this.fetchData(this.active, {}, this.paging)
    },
    onLoad() {
      this.fetchData(this.active, {}, this.paging)
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
