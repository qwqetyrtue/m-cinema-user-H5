<template>
    <div class="film-detail-container" v-if="film">
        <van-sticky>
            <van-nav-bar
                    style="background-color: #FFFFFF;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
                    :border="false"
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            >
                <template v-slot:left>
                    <van-icon name="arrow-left" color="#000000" size="16px">电影</van-icon>
                </template>
                <template v-slot:title>
                </template>
            </van-nav-bar>
        </van-sticky>
        <van-pull-refresh v-model="pageLoading" @refresh="pageRefresh">
            <van-row class="detail-base">
                <van-col span="8" class="base-image">
                    <van-image height="100%" width="100%" fit="fill" src="/img/shenghai.jpg"></van-image>
                </van-col>
                <van-col span="16" class="base-text">
                    <van-row class="text-name">{{ film.name }}</van-row>
                    <van-row class="text-en-name">deep sea</van-row>
                    <van-row class="text-sketch">

                    </van-row>
                    <van-row class="text-tag">
                        <van-col class="tag-classify">
                            <span v-for="tag in strToArray(film.filmClassify)" :key="tag">{{ tag }}</span>
                        </van-col>
                        <van-col class="tag-version">
                            <van-tag>IMAX 3D</van-tag>
                            <van-tag>Dolby Cinema</van-tag>
                        </van-col>
                    </van-row>
                    <van-row class="text-release">
                        <van-col>2023.01.22 09:00</van-col>
                        <van-col>中国大陆上映</van-col>
                        <van-col>112分钟</van-col>
                        <van-col class="base-jump-bt">
                            <van-icon name="arrow"></van-icon>
                        </van-col>
                    </van-row>
                    <van-row class="base-collect-bt">
                        <van-button :icon="collect.type === 0 ? 'like': 'like-o'" size="small" class="flat-van-button"
                                    @click="collectToWantHandler(film.filmId)">
                            想看
                        </van-button>
                        <van-button :icon="collect.type === 1?'star':'star-o'" size="small" class="flat-van-button"
                                    @click="toCommentAddHandler(film.filmId)">
                            看过
                        </van-button>
                    </van-row>
                </van-col>
            </van-row>
            <van-row class="detail-want">
                {{ film.want }}人想看
            </van-row>
            <van-row class="detail-synopsis" @click="synopsisFold=!synopsisFold">
                <van-cell class="title-panel" title="简介" :border="false"/>
                <div class="synopsis-text fold cont-panel">
                    <p :class="synopsisFold?'':'fold'">
                        {{ film.synopsis }}
                    </p>
                </div>
            </van-row>
            <van-row class="detail-actor">
                <van-cell class="title-panel" title="演职人员" :border="false"/>
                <div class="actor-text fold cont-panel">
                    <p :class="synopsisFold?'':'fold'">
                        {{ film.actor }}
                    </p>
                </div>
            </van-row>
            <van-row class="detail-resource">
                <van-cell class="title-panel" title="资源" :border="false"></van-cell>
            </van-row>
            <van-row>
                <van-cell title="观众热评" :border="false" style="border-radius: 15px 15px 0 0;"></van-cell>

                <div style="width: 100%;background-color: #FFFFFF;min-height: 130px;">
                    <van-empty v-if="comments.length === 0"/>
                    <template v-else>
                        <comment-row v-for="each in comments" :key="each.commentId" star reply :comment="each"
                                     @check-branch="showBranchCommentHandler"></comment-row>
                    </template>
                </div>
                <div style="margin-bottom:50px;"></div>
            </van-row>
        </van-pull-refresh>
        <van-tabbar style="padding: 2px 15px;box-sizing: border-box">
            <van-button block round color="linear-gradient(to right,#FB3433,#FE5067)" @click="toOrderHandler">立刻购票
            </van-button>
        </van-tabbar>
        <van-popup v-model="branchShow" round position="bottom" class="branch-comment">
            <branch-comment-panel :root-comment="rootComment" @panel-close="branchShow = false"/>
        </van-popup>
    </div>
</template>

<script>
import {Toast} from "vant";
import {strToArray} from "@/utils";
import CommentRow from "@/views/film/components/CommentRow.vue";
import {filmCollectAddReq, filmCollectDetailReq, filmDetailReq} from "@/api/film";
import Film from "@/views/film/index/index.vue";
import {listRootCommentReq} from "@/api/comment";
import BranchCommentPanel from "@/views/comment/components/BranchCommentPanel.vue";
import EmptyRow from "@/components/EmptyRow/index.vue";
import collect from "@/views/film/collect/index.vue";

export default {
    name: 'FilmDetail',
    computed: {
    },
    created() {
        this.filmId = this.$route.params.filmId;
    },
    mounted() {
        filmDetailReq(this.filmId)
            .then(({msg, data}) => {
                this.film = data
            })
            .then(() => listRootCommentReq('film', this.filmId))
            .then(({msg, data}) => {
                this.comments = data.list
            })
            .then(() => filmCollectDetailReq(this.filmId))
            .then(({msg, data}) => {
                this.collect = data
            })
    },
    components: {
        EmptyRow,
        BranchCommentPanel,
        Film,
        CommentRow
    },
    data() {
        return {
            filmId: '',
            film: null,
            collect: {},
            comments: [],
            branchComments: [],
            pageLoading: false,
            synopsisFold: false,
            branchShow: false,
            rootComment: null,
            replyComment: '',
        }
    },
    methods: {
        strToArray,
        toOrderHandler() {
            this.$router.push(`/order/${this.filmId}`)
        },
        onClickLeft() {
            this.$router.back()
        },
        onClickRight() {

        },
        pageRefresh() {
            this.pageLoading = false;
            Toast('刷新成功');
        },
        toCommentAddHandler(filmId) {
            this.$router.push(`/comment/add?filmId=${filmId}`)
        },
        collectToWantHandler(filmId) {
            filmCollectAddReq(filmId, 'want')
                .then(({msg, data}) => {
                    Toast({
                        message: '添加成功',
                        type: 'success'
                    })
                })
                .then(() => filmCollectDetailReq(this.filmId))
                .then(({msg, data}) => {
                    this.collect = data
                })
        },
        showBranchCommentHandler(comment) {
            this.rootComment = JSON.parse(JSON.stringify(comment));
            this.branchShow = true
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/css/control.scss";

.film-detail-container {
  background: linear-gradient(to bottom, #7a3230, #933d3a, #9b413f);
  min-height: 500px;
  padding: 0;


  .title-panel {
    background-color: transparent;
    color: #FFFFFF;
    border: none;
    font-size: 16px;
  }

  .cont-panel {
    opacity: 0.75;
  }

  .detail-want {
    padding: 0 10px 10px 15px;
    color: #FFFFFF;
    font-size: 14px;
    border-bottom: 1px solid #00000015;
  }

  .detail-base {
    margin-top: 10px;
    position: relative;

    .base-image {
      padding: 10px 0 10px 10px;

      .van-image {
        border-radius: 5px;
        overflow: hidden;
      }
    }

    .base-text {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      padding: 10px 0 10px 10px;

      .text-name {
        color: #FFFFFF;
        font-weight: bolder;
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 2px;
      }

      .text-en-name {
        color: #FFFFFF;
        opacity: 0.7;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        align-items: center;
        letter-spacing: -1px;
      }

      .text-sketch {
        color: #B58B63;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: -1px;
      }

      .text-tag {
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        align-items: center;
        line-height: 24px;


        .tag-classify {
          margin-right: 5px;

          span {
            color: #FFFFFF;
            opacity: 0.8;
            font-size: 12px;
            margin: 0 1px;
            line-height: 12px;
          }
        }

        .van-tag {
          transform: scale(0.9);
          line-height: 12px;
          background-color: rgba(26, 26, 26, 0.2);
        }
      }

      .text-release {
        font-size: 12px;
        line-height: 24px;
        color: #FFFFFF;
        opacity: 0.7;
      }

      .base-collect-bt {;
        bottom: 0;
        display: flex;
        flex-flow: row;
        justify-content: space-around;
        padding: 10px 0;

        .flat-van-button {
          background-color: rgba(194, 193, 193, 0.4);
          border: none;
          color: #FFFFFF;
          width: 45%;
          border-radius: 5px;
          overflow: hidden;
        }
      }

    }
  }

  .detail-synopsis {
    margin-bottom: 10px;

    .synopsis-text {
      padding: 0 10px 10px 10px;
      position: relative;
      cursor: pointer;

      > p {
        margin: 0;
        padding: 0;
        color: #FFFFFF;
        line-height: 24px;
        text-indent: 16px;
      }

      .fold {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        position: relative;
      }
    }
  }

  .detail-actor {
    margin-bottom: 10px;

    .actor-text {
      padding: 0 10px 10px 10px;
      position: relative;
      cursor: pointer;

      > p {
        margin: 0;
        padding: 0;
        color: #FFFFFF;
        line-height: 24px;
        text-indent: 16px;
      }

      .fold {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        position: relative;
      }
    }
  }

  .detail-resource {
    margin-bottom: 10px;
  }

  .branch-comment {
    height: 85%;
  }

}
</style>
