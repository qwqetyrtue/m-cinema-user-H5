<template>
    <div class="index-container">
        <van-pull-refresh v-model="pageLoading" @refresh="pageRefresh">
            <van-cell style="background-color: #f8f8f8;">

                <van-swipe>
                    <template v-if="advertisingList">
                        <van-swipe-item v-for="each in advertisingList" :key="each.advertisingId"
                                        @click="advertisingToHandler(each)">
                            <van-image fit="fill" :src="each.img" :alt="each.name"></van-image>
                        </van-swipe-item>
                    </template>
                    <van-swipe-item v-else>
                    </van-swipe-item>
                </van-swipe>

            </van-cell>
            <van-cell style="background-color: #f8f8f8;">
                <van-grid column-num="5" gutter="5" center :border="false" clickable square>
                    <van-grid-item icon-prefix="m-icon" icon="film-o" to="/film/index" replace text="电影"
                                   style="color: #2789e8;"/>
                    <van-grid-item icon="fire" to="/community/index" replace text="社区" style="color: #F03D38;"/>
                </van-grid>
            </van-cell>
            <div class="section-panel">
                <van-cell title="正在热映" is-link value-class="title-tip" title-class="display-title"
                          to="/film/index?active=hot">
                    全部{{ hotTotal }}部
                </van-cell>
                <div class="film-card-cont">
                    <film-card v-for="each in hot" :key="each.filmId" :film="each"></film-card>
                </div>
            </div>
            <div class="section-panel">
                <van-cell title="待映推荐" is-link value-class="title-tip" title-class="display-title"
                          to="/film/index?active=tobe">
                    全部{{ tobeTotal }}部
                </van-cell>
                <div class="film-card-cont">
                    <film-card v-for="each in tobe" :key="each.filmId" :film="each"></film-card>
                </div>
            </div>
            <div class="section-panel">
                <van-cell title="即将上映" is-link value-class="title-tip" title-class="display-title"
                          to="/film/index?active=soon">
                    全部{{ soonTotal }}部
                </van-cell>
                <div class="film-card-cont">
                    <film-card v-for="each in soon" :key="each.filmId" :film="each"></film-card>
                </div>
            </div>
            <div class="index-foot"/>
        </van-pull-refresh>
    </div>
</template>

<script>
import FilmCard from "@/views/index/components/FilmCard.vue";
import {Dialog, Toast} from "vant";
import {indexTypeFilmReq} from "@/api/film";
import {advertisingIndexReq} from "@/api/advertising";
import EmptyRow from "@/components/EmptyRow/index.vue";

export default {
    name: 'Index',
    data() {
        return {
            current: 0,
            hotTotal: 0,
            soonTotal: 0,
            tobeTotal: 0,
            advertisingList: null,
            hot: [],
            soon: [],
            tobe: [],
            pageLoading: false
        }
    },
    created() {
        advertisingIndexReq()
            .then(({msg, data}) => {
                this.advertisingList = data.list
            })
        this.fetchData({})
    },
    methods: {
        fetchData(params) {
            indexTypeFilmReq('hot', params)
                .then(({msg, data}) => {
                    this.hot = data.list
                    this.hotTotal = data.total
                })
            indexTypeFilmReq('tobe', params)
                .then(({msg, data}) => {
                    this.tobe = data.list
                    this.tobeTotal = data.total
                })
            indexTypeFilmReq('soon', params)
                .then(({msg, data}) => {
                    this.soon = data.list
                    this.soonTotal = data.total
                })
        },
        pageRefresh() {
            this.pageLoading = false;
            Toast('刷新成功');
        },
        advertisingToHandler(advertising) {
            Dialog.confirm({
                title: `${advertising.name}`,
                message: `即将跳转至活动`,
            })
                .then(() => {
                    window.open(advertising.link, '_blank')
                })
                .catch(() => {
                    // on cancel
                });

        }
    },
    components: {
        EmptyRow,
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
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

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
    height: 1px;
  }
}
</style>
