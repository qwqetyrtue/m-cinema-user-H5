<template>
    <div class="film-search-container">
        <van-nav-bar
                :title="$route.meta.title"
                left-text="返回"
                left-arrow
                @click-left="$router.back()"
        />
        <van-row>
            <van-search
                    v-model="search"
                    show-action
                    placeholder="请输入搜索关键词"
                    @search="searchFilmHandler"
            />
        </van-row>
        <search-result-row v-if="!loadingFilms" :films="films" :total="filmPaging.total" title="电影"
                           search-type="影片"/>
        <search-result-row v-if="!loadingOperas" :films="operas" :total="operaPaging.total" title="歌剧"
                           search-type="影片"/>
    </div>
</template>
<script>
import SearchResultRow from "@/views/film/components/SearchResultRow.vue";
import {filmListByNameTypeReq} from "@/api/film";

export default {
    name: "FilmSearch",
    created() {
        this.search = this.$route.query.search || ''
    },
    components: {SearchResultRow},
    data() {
        return {
            search: null,
            loadingFilms: true,
            loadingOperas: true,
            films: [],
            operas: [],
            filmPaging: {
                pageNum: 1,
                pageSize: 4,
                total: 0
            },
            actors: [],
            operaPaging: {
                pageNum: 1,
                pageSize: 4,
                total: 0
            }
        }
    },
    methods: {
        fetchData(val) {
            this.loadingOperas = true
            this.loadingFilms = true
            filmListByNameTypeReq(val, '电影', this.filmPaging)
                .then(({msg, data}) => {
                    this.films = data.list
                    this.filmPaging.total = data.total
                    this.loadingFilms = false
                })
            filmListByNameTypeReq(val, '歌剧', this.filmPaging)
                .then(({msg, data}) => {
                    this.operas = data.list
                    this.operaPaging.total = data.total
                    this.loadingOperas = false
                })

            // filmListByActorReq(val, this.actorPaging)
            //     .then(({msg, data}) => {
            //         this.actors = data.list
            //         this.actorPaging.total = data.total
            //     })
        },
        searchFilmHandler(val) {
            this.fetchData(val)
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
