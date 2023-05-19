<template>
  <div class="empty-row">
    {{content}}
  </div>
</template>

<script>
export default {
  name: "EmptyRow",
  props: {
    content: {
      type: String,
      default: '无更多数据'
    }
  }
}
</script>

<style lang="scss">
.empty-row {
  width: 100%;
  height: 50px;
  color: #8F8F8F;
  font-size: 14px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}
</style>
