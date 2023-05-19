<template>
    <div class="search-result-row">
        <van-row>
            <van-cell clickable>
                <template #title>
                    <span class="row-title">{{ title }}</span>
                </template>
                <template #label v-if="films">
                    <empty-row v-if="films.length === 0"/>
                    <template v-else>
                        <film-row v-for="film in films" :key="film.filmId" :film="film"/>
                    </template>
                </template>
            </van-cell>
        </van-row>
        <van-row>
            <van-button v-if="total > 4" block style="color: #F03D38;">
                查看全部{{ total }}部{{ SearchType }}
            </van-button>
            <van-button v-else block style="color: #F03D38;">
                全部共{{ total }}部{{ SearchType }}
            </van-button>
        </van-row>
    </div>
</template>

<script>
import FilmRow from "@/views/film/components/FilmRow.vue";
import EmptyRow from "@/components/EmptyRow/index.vue";

export default {
    name: "SearchResultRow",
    components: {EmptyRow, FilmRow},
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
        },
        films: {
            type: Array,
            default: null
        }
    },
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
