<template>
  <div class="film-search-container">
    <van-nav-bar
        title="搜索"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
    />
    <van-row>
      <van-search
          v-model="search"
          show-action
          placeholder="请输入搜索关键词"
      />
    </van-row>
    <search-result-row title="电影" search-type="影片"/>
    <search-result-row title="歌剧" search-type="影片"/>
  </div>
</template>

<script>
import SearchResultRow from "@/views/film/components/SearchResultRow.vue";

export default {
  name: "FilmSearch",
  components: {SearchResultRow},
  data() {
    return {
      search: null
    }
  }

}
</script>

<style lang="scss">
.film-search-container {
  background: #f8f8f8;
  background: linear-gradient(to bottom, #f6fbff 0%, #f8f8f8 70%, #FFFFFFFF 100%);

  .search-result-row {
    margin-bottom: 10px;
  }
}
</style>
