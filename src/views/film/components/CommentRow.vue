<template>
    <van-row class="comment-row" v-if="comment" gutter="5">
        <van-col class="comment-avatar" span="3">
            <van-image
                    round
                    width="40px"
                    height="40px"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
        </van-col>
        <van-col class="comment-detail" span="21">
            <van-row class="detail-name">
                {{ comment.userName }}
            </van-row>
            <van-row v-if="star" class="detail-star">
                <van-rate v-model="comment.star / 2"
                          gutter="1"
                          readonly size="10"
                          color="#ffd21e"
                          void-icon="star"
                          void-color="#eee"/>
                {{ `${comment.star}分` }}
            </van-row>
            <van-row class="detail-cont">
                {{ comment.content }}
            </van-row>
            <van-row style="display: flex;align-items: center;">
                <van-col span="12" class="detail-time">
                    <van-tag v-if="reply" round color="#EDF1F5" text-color="#13559b" style="margin-right: 10px;"
                             @click="toBranchCommentHandler">{{ comment.reply || 0 }} 回复
                    </van-tag>
                    {{ getDatePart(comment.createTime) }}
                </van-col>
                <van-col span="12" class="detail-vote">
                    <van-button style="width: 50px;font-size: 12px;" icon="good-job-o" plain color="gray" round
                                size="mini">
                        {{ comment.upvote || '赞' }}
                    </van-button>
                </van-col>
            </van-row>
        </van-col>
    </van-row>
</template>

<script>
import {getDatePart} from "@/utils";

export default {
    name: "CommentRow",
    props: {
        star: {
            type: Boolean,
            default: false
        },
        reply: {
            type: Boolean,
            default: false
        },
        comment: {
            type: Object,
            default: null
        },
        checkBranch: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        getDatePart,
        toBranchCommentHandler(userId) {
            if (this.checkBranch)
                this.$emit('check-branch', this.comment)
        }
    },
}
</script>

<style lang="scss">
.comment-row {
  min-height: 100px;
  background-color: #FFFFFF;
  border: none;
  padding: 5px 10px;

  .comment-detail {
    padding-bottom: 10px;
    border-bottom: 1px solid #cccccc;

    .detail-name {
      color: #575757;
      font-size: 14px;
    }

    .detail-star {
      font-size: 10px;
    }

    .detail-cont {
      padding: 10px 0;
      font-size: 16px;
    }

    .detail-time {
      height: 100%;
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      font-size: 10px;
      color: #969696;
    }

    .detail-vote {
      display: flex;
      flex-flow: row;
      justify-content: flex-end;
      align-items: center;
      margin-right: 10px;
    }
  }
}
</style>
