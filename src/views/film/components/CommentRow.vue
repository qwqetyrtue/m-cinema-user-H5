<template>
  <van-row class="comment-row">
    <van-col class="comment-avatar" span="4">
      头像
    </van-col>
    <van-col class="comment-detail" span="20">
      <van-row class="detail-name">mdwmadwa2324</van-row>
      <van-row class="detail-cont">
        css如何实现当文字多的时候就把字号变小能放两行，或者字变更小能使得放3行
        写两套css，你这个基本可以用两个图片搞定，一般一个网页呈现出来根据你浏览器的宽度来显示，
      </van-row>
      <van-row class="detail-time">
        03-21 江苏
      </van-row>
      <van-row class="detail-vote">
        57
      </van-row>
    </van-col>
  </van-row>
</template>

<script>
export default {
  name: "CommentRow"
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
  }
}
</style>
