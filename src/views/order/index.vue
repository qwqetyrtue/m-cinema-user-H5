<template>
    <div class="order-container" v-if="film">
        <van-nav-bar
                :left-text="film.name"
                left-arrow
                @click-left="$router.back()"
                fixed
                placeholder
        />
        <div class="film-detail">
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
                </van-col>
            </van-row>
            <van-row class="base-collect-bt" gutter="10">
                <van-col span="12">
                    <van-button block icon="like" size="small" class="flat-van-button">想看</van-button>
                </van-col>
                <van-col span="12">
                    <van-button block icon="star" size="small" class="flat-van-button"
                                @click="toCommentAddHandler(film.filmId)">看过
                    </van-button>
                </van-col>
            </van-row>
        </div>

        <van-tabs v-model="day" v-if="days" :ellipsis="false" @change="dayChangeHandler">
            <van-tab v-for="day in days" :key="day.value" :title="`${day.day} ${day.week}`" :name="day.value">
                <van-cell :border="false"/>
                <van-cell v-if="scenes.length === 0" title="无排场数据"/>
                <van-cell v-else v-for="scene in scenes"
                          :key="scene.sceneId"
                          clickable
                          center
                          :to="`/pick/${scene.sceneId}`"
                >
                    <template #title>
                        <van-row gutter="10" clickable>
                            <van-col span="4">{{ scene.hallName }}</van-col>
                            <van-col span="8">{{ getTimePart(scene.beginTime) }}~{{
                                getTimePart(scene.endTime)
                                }}
                            </van-col>
                            <van-col span="3">{{ scene.sceneType }}</van-col>
                            <van-col span="3">{{ scene.language }}</van-col>
                            <van-col span="6">座位:{{ scene.attendance }}/{{ scene.seatNum }}</van-col>
                        </van-row>
                    </template>
                </van-cell>
            </van-tab>
        </van-tabs>

    </div>
</template>

<script>


import FilmDetail from "@/views/film/detail/index.vue";
import {getDaysArray, strToArray, getTimePart} from "@/utils";
import {filmDetailReq} from "@/api/film";
import {filmDaySceneReq} from "@/api/scene";
import {Toast} from "vant";

export default {
    components: {FilmDetail},
    created() {
        this.filmId = this.$route.params.filmId
        if (this.filmId == null) this.$router.back()

        // 查询电影
        filmDetailReq(this.filmId)
            .then(({msg, data}) => {
                if (data == null) {
                    Toast({
                        message: '电影不存在',
                        type: 'fail'
                    })
                    this.$router.push('/')
                }
                this.film = data
            })

        // 获取最近七天的日期
        this.days = getDaysArray()
        this.day = this.days[0].value

        // 查询排场
        filmDaySceneReq(this.filmId, this.day)
            .then(({msg, data}) => {
                this.scenes = data.list
            })

    },
    name: "Order",
    data() {
        return {
            filmId: null,
            film: null,
            days: null,
            day: null,
            scenes: [],
        }
    },
    methods: {
        getTimePart,
        strToArray,
        dayChangeHandler(v) {
            filmDaySceneReq(this.filmId, this.day)
                .then(({msg, data}) => {
                    this.scenes = data.list
                })
        },
        toCommentAddHandler(filmId) {
            this.$router.push(`/comment/add?filmId=${filmId}`)
        },
    }
}
</script>

<style lang="scss">
.order-container {
  .film-detail {
    background: linear-gradient(to bottom, #7a3230, #933d3a, #9b413f);
  }

  .detail-base {
    position: relative;
    padding: 10px;

    .base-image {
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
        font-size: 11px;
        line-height: 24px;
        color: #FFFFFF;
        opacity: 0.7;
      }
    }
  }

  .base-collect-bt {
    padding: 0 5px 10px 5px;

    .flat-van-button {
      background-color: rgba(194, 193, 193, 0.4);
      border: none;
      color: #FFFFFF;
      border-radius: 5px;
      overflow: hidden;
    }
  }
}
</style>
