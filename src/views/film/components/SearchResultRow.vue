<template>
  <div class="search-result-row">
    <van-row>
      <van-cell clickable>
        <template #title>
          <span class="row-title">{{ title }}</span>
        </template>
        <template #label>
          <film-row/>
          <film-row/>
          <film-row/>
        </template>
      </van-cell>
    </van-row>
    <van-row>
      <van-button block style="color: #F03D38;">
        查看全部{{ total }}部{{ SearchType }}
      </van-button>
    </van-row>
  </div>
</template>

<script>
import FilmRow from "@/views/film/components/FilmRow.vue";

export default {
  name: "SearchResultRow",
  components: {FilmRow},
  props: {
    title: {
      type: String,
      default: '标题'
    },
    SearchType: {
      type: String,
      default: '类型'
    },
    total: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
.search-result-row {
  width: 100%;

  .row-title {
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  & > .van-row:first-child {
    border-top: 1px solid #f5f5f5;
  }

}
</style>
