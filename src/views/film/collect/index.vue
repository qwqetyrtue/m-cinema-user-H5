<template>
    <div class="film-collect-container">
        <van-sticky>
            <van-nav-bar
                    :title="$route.meta.title"
                    left-text="返回"
                    left-arrow
                    @click-left="$router.back()"
            />
        </van-sticky>
        <van-tabs v-model="active" sticky :offset-top="46">
            <van-tab title="电影" name="1">
                <van-cell :title="`共${filmPaging.total}部`" center :border="false"
                          class="bottom-cell">
                    <template #default>
                        <van-button v-if="edit" round size="small" text="取消" class="broad-button"
                                    @click="hiddenEdit"/>
                        <van-button v-else round size="small" text="编辑" class="broad-button" style="color: #8F8F8F;"
                                    @click="edit = true"/>
                    </template>
                </van-cell>
                <van-list
                        v-model="filmLoading"
                        :finished="filmFinished"
                        finished-text="没有更多了"
                        @load="onLoad('电影')"
                >
                    <van-checkbox-group v-model="select">
                        <van-row class="film-select-item" v-for="film in films" :key="film.filmId">
                            <van-col span="2" v-if="edit" class="select-item-bt">
                                <van-checkbox :name="film.filmId"/>
                            </van-col>
                            <van-col span="22" class="select-item-content">
                                <film-row :button="null" :film="film"/>
                            </van-col>
                        </van-row>
                    </van-checkbox-group>
                </van-list>
                <van-tabbar v-if="edit" placeholder>
                    <van-cell center>
                        <template #title>
                            已选择{{ select.length }}条
                        </template>
                        <template #default>
                            <van-button round size="small" text="删除" class="broad-button"
                                        :color="select.length>0?'#F03D38':'#F03D3844'"
                                        @click="edit = false"/>
                        </template>
                    </van-cell>
                </van-tabbar>
            </van-tab>
            <van-tab title="歌剧" name="2">
                <van-cell :title="`共${operaPaging.total}部`" center :border="false"
                          class="bottom-cell">
                    <template #default>
                        <van-button v-if="edit" round size="small" text="取消" class="broad-button"
                                    @click="hiddenEdit"/>
                        <van-button v-else round size="small" text="编辑" class="broad-button" style="color: #8F8F8F;"
                                    @click="edit = true"/>
                    </template>
                </van-cell>
                <van-list
                        v-model="operaLoading"
                        :finished="operaFinished"
                        finished-text="没有更多了"
                        @load="onLoad('歌剧')"
                >
                    <van-checkbox-group v-model="select">
                        <van-row class="film-select-item" v-for="opera in operas" :key="opera.filmId">
                            <van-col span="2" v-if="edit" class="select-item-bt">
                                <van-checkbox :name="opera.filmId"/>
                            </van-col>
                            <van-col span="22" class="select-item-content">
                                <film-row :button="null" :title="opera"/>
                            </van-col>
                        </van-row>
                    </van-checkbox-group>
                </van-list>
                <van-tabbar v-if="edit" placeholder>
                    <van-cell center>
                        <template #title>
                            已选择{{ select.length }}条
                        </template>
                        <template #default>
                            <van-button round size="small" text="删除" class="broad-button"
                                        :color="select.length>0?'#F03D38':'#F03D3844'"
                                        @click="edit = false"/>
                        </template>
                    </van-cell>
                </van-tabbar>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import FilmRow from "@/views/film/components/FilmRow.vue";
import {filmCollectAddReq, filmCollectListReq} from "@/api/film";

export default {
    name: 'FilmCollect',
    components: {FilmRow},
    created() {
        this.type = this.$route.meta.type
    },
    data() {
        return {
            type: null,
            active: 1,
            filmLoading: false,
            filmFinished: false,
            operaLoading: false,
            operaFinished: false,
            films: [],
            operas: [],
            filmPaging: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            operaPaging: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            select: [],
            edit: false
        }
    },
    methods: {
        hiddenEdit() {
            this.edit = false
            this.select = []
        },
        fetchData(type, filmType) {
            if (filmType === '电影') {
                this.filmLoading = true;
                filmCollectListReq(type, '电影', this.filmPaging)
                    .then(({msg, data}) => {
                        console.log(data)
                        this.filmLoading = false;
                        this.films = data.list
                        this.filmPaging.total = data.total
                        if (!data.hasNextPage) this.filmFinished = true
                    })
            } else if (filmType === '歌剧') {
                this.operaLoading = true;
                filmCollectListReq(type, '歌剧', this.operaPaging)
                    .then(({msg, data}) => {
                        this.operaLoading = false;
                        this.operas = data.list
                        this.operaPaging.total = data.total
                        if (!data.hasNextPage) this.operaFinished = true
                    })
            }
        },
        onLoad(filmType) {
            this.fetchData(this.type, filmType)
        },
    }
}
</script>

<style lang="scss">
.film-collect-container {
  .van-tabbar {
    height: 55px;
  }

  .film-select-item {
    padding-left: 10px;

    .select-item-bt {
      height: 160px;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
    }
  }


  .bottom-cell {
    background-color: #f3f3f3;
    color: #8F8F8F;
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .broad-button {
    padding: 0 10px;
    height: 28px;
  }

}
</style>
