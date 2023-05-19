<template>
    <van-row class="film-row" v-if="film">
        <van-col span="6" class="film-row-img">
            <van-image height="100%" width="100%" fit="fill" src="/img/shenghai.jpg"
                       @click="toDetail(film.filmId)"></van-image>
        </van-col>
        <van-col :span="button?12:18" class="film-row-desc">
            <div>
                <van-row class="row-desc-name">{{ film.name }}</van-row>
                <van-row class="row-desc-tag" v-if="tag">
                    <van-tag color="#B2B5B9" text-color="#FFFFFF">中国巨幕3D</van-tag>
                    <van-tag color="#B2B5B9" text-color="#FFFFFF">IMAX 3D</van-tag>
                </van-row>
            </div>
            <div>
                <van-row v-if="score" class="row-desc-score">
                    评分
                    <span>{{ film.score }}</span>
                </van-row>
                <van-row class="row-desc-common" v-if="actor">主演:{{ film.actor }}</van-row>
            </div>
            <div>
                <van-row class="row-desc-common" v-if="time">2019-12-20 中国大陆上映</van-row>
            </div>

        </van-col>
        <van-col span="6" v-if="button" class="film-row-button">
            <van-button round color="#F03D38" native-type="button" class="flat-van-button" size="small"
                        @click="toOrder(film.filmId)">{{ button }}
            </van-button>
        </van-col>
    </van-row>
</template>
<script>

export default {
    components: {},
    props: {
        button: {
            type: String,
            default: '购票'
        },
        tag: {
            type: Boolean,
            default: true
        },
        score: {
            type: Boolean,
            default: true
        },
        actor: {
            type: Boolean,
            default: true
        },
        time: {
            type: Boolean,
            default: true
        },
        film: {
            type: Object
        }
    },
    methods: {
        toDetail(filmId) {
            this.$router.push(`/film/detail/${filmId}`)
        },
        toOrder(filmId) {
            this.$router.push(`/order/${filmId}`)
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/css/control.scss";

.film-row {
  height: 160px;
  box-sizing: border-box;
  border-top: 1px solid #f5f5f5;
  padding: 15px 5px;

  & > .film-row-img, .film-row-button, .film-row-desc {
    height: 100%;
  }

  .film-row-img {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;

    & > .van-image {
      border-radius: 5px;
      overflow: hidden;
    }
  }

  .film-row-desc {
    display: flex;
    padding-left: 10px;
    flex-flow: column;
    justify-content: space-between;
    align-items: flex-start;
    overflow: hidden;
    flex-wrap: wrap;

    .row-desc-name, .row-desc-tag, .row-desc-score, .row-desc-common {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .row-desc-name {
      font-size: 18px;
      height: 28px;
      line-height: 28px;
      font-weight: 500;
    }

    .row-desc-tag {
      height: 18px;
      line-height: 18px;
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;

      .van-tag {
        margin-right: 5px;
      }
    }

    .row-desc-score {
      font-size: 14px;
      line-height: 22px;
      height: 22px;
      color: #8F8F8F;

      span {
        margin-left: 2px;
        color: #ffcb54;
      }
    }

    .row-desc-common {
      font-size: 14px;
      line-height: 20px;
      height: 20px;
      color: #8F8F8F;
    }
  }

  .film-row-button {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }

}
</style>
