<template>
  <div class="profile-edit-email-container">
    <van-nav-bar
        :title="$route.meta.title"
        left-text="返回"
        right-text="保存"
        left-arrow
        @click-left="$router.back()"
        @click-right="editEmailHandler"
    />
    <van-cell-group>
      <van-field v-model="old" label="邮箱" readonly/>
      <van-field v-model="email" label="新邮箱" placeholder="请输入新邮箱" clearable/>
    </van-cell-group>
  </div>
</template>

<script>

export default {
  created() {
    this.userId = this.$store.getters.user.userId
    this.old = this.$store.getters.user.email
  },
  name: "ProfileEditEmail",
  data() {
    return {
      old: null,
      email: null,
      userId: null
    }
  },
  methods: {
    editEmailHandler() {
      let data = {userId: this.userId, email: this.email}
      console.log(data)
    }
  }
}
</script>

<style lang="scss">
.profile-edit-email-container {

}
</style>
