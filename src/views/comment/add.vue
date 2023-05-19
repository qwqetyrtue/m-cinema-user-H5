<template>
    <div class="comment-add-container" v-if="film">
        <van-nav-bar
                :left-text="$route.meta.title"
                left-arrow
                fixed
                placeholder
                @click-left="$router.back()"
        />
        <van-cell :title="film.name"/>
        <van-cell>
            <template #title>
                评分:
                <van-rate v-model="comment.star" allow-half/>
            </template>
            <template #right-icon>
                拖动星星给电影评分
            </template>
        </van-cell>
        <van-field type="textarea" size="large" maxlength="150" placeholder="大家都在问:剧情怎么样，画面好吗，演技如何?"
                   v-model="comment.content"
                   show-word-limit clearable class="comment-content-input"/>
        <van-tabbar style="padding: 2px 15px;box-sizing: border-box;">
            <van-button block round color="linear-gradient(to right,#FB3433,#FE5067)" @click="addCommentHandler">
                发布短评
            </van-button>
        </van-tabbar>
    </div>
</template>

<script>
import {filmDetailReq} from "@/api/film";
import {addRootCommentReq} from "@/api/comment";
import {Toast} from "vant";

export default {
    name: 'CommentAdd',
    created() {
        this.filmId = this.$route.query.filmId

        filmDetailReq(this.filmId)
            .then(({msg, data}) => {
                this.film = data
            })
    },
    data() {
        return {
            filmId: null,
            film: null,
            comment: {
                star: 0,
                content: ''
            }
        }
    },
    methods: {
        addCommentHandler() {
            let comment = JSON.parse(JSON.stringify(this.comment))
            comment.star = comment.star * 2;
            comment.conditionId = this.film.filmId;
            addRootCommentReq('film', comment)
                .then(({msg, data}) => {
                    Toast({
                        overlay: true,
                        message: '短评发布成功',
                        type: 'success',
                        duration: 2 * 1000,
                        onClose: () => {
                            this.$router.back()
                        }
                    })
                })
        }
    }
}
</script>


<style lang="scss">
.comment-add-container {
  .comment-content-input {
    textarea {
      height: 200px;
    }
  }
}
</style>
