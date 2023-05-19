<template>
    <div class="branch-comment-panel" v-if="rootComment">
        <van-nav-bar
                title="评论详情"
                @click-right="closePanelHandler"
        >
            <template #right>
                <van-icon name="cross" size="18"/>
            </template>
        </van-nav-bar>
        <comment-row :check-branch="false" v-if="rootComment" :comment="rootComment"/>
        <van-cell size="small">
            <template #title>
                全部回复
                <span style="margin-left: 10px;color: #acacac;">({{ branchComments.length }}条)</span>
            </template>
        </van-cell>
        <comment-row v-for="each in branchComments" :key="each.commentId" :comment="each"
                     @check-branch="showBranchCommentHandler"></comment-row>
        <van-tabbar style="padding: 10px 15px;box-sizing: border-box;min-height: 60px;height: auto;">
            <van-row class="branch-comment-input">
                <van-col span="16">
                    <van-field rows="1" v-model="replyComment.content" placeholder="来发送友善的评论吧" type="textarea"
                               autosize/>
                </van-col>
                <van-col span="8">
                    <van-row style="width: 100%;" type="flex" justify="end" align="center">
                        <van-col span="8" style="color: #7a7a7a;">
                            <van-icon name="good-job-o" size="28" @click="giveUpvoteHandler"/>
                        </van-col>
                        <van-col span="9">
                            <van-button size="mini" block type="info" @click="replyCommentHandler">发送</van-button>
                        </van-col>
                    </van-row>


                </van-col>
            </van-row>
        </van-tabbar>
    </div>
</template>

<script>

import CommentRow from "@/views/film/components/CommentRow.vue";
import {addBranchCommentReq, listBranchCommentReq} from "@/api/comment";
import {Toast} from "vant";

export default {
    components: {CommentRow},
    name: 'BranchCommentPanel',
    created() {
        this.fetchData()
    },
    props: {
        rootComment: {
            type: Object,
            default: null
        },
    },
    watch: {
        rootComment(v) {
            this.fetchData()
        }
    },
    data() {
        return {
            branchComments: [],
            replyComment: {
                content: ''
            }
        }
    },
    methods: {
        fetchData() {
            listBranchCommentReq('film', this.rootComment.conditionId, this.rootComment.commentId)
                .then(({msg, data}) => {
                    this.branchComments = data.list
                })
        },
        giveUpvoteHandler() {

        },
        replyCommentHandler() {
            let data = {
                content: this.replyComment.content,
                conditionId: this.rootComment.conditionId,
                parentId: this.rootComment.commentId
            }
            addBranchCommentReq('film', data)
                .then(({msg, data}) => {
                    this.fetchData()
                    this.replyComment.content = ''
                    Toast({
                        message: msg,
                        type: "success",
                    })
                })
        },
        closePanelHandler() {
            this.branchComments = []
            this.$emit('panel-close')
        }
    }
}
</script>


<style lang="scss">
.branch-comment-panel {
  .branch-comment-input {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: row;
    align-items: flex-end;
    justify-content: space-between;

    & > .van-col {
      height: 100%;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: flex-end;
    }

    .van-field {
      background-color: #FFFFFF;
      width: 100%;
      padding: 0;

      .van-field__value {
        padding: 5px 15px;
        width: 100%;
        background-color: #f1f1f1;
        overflow: hidden;
        border-radius: 10px;
      }
    }
  }

}
</style>
