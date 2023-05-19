<template>
  <div class="profile-edit-name-container">
    <van-nav-bar
        :title="$route.meta.title"
        left-text="返回"
        right-text="保存"
        left-arrow
        @click-left="$router.back()"
        @click-right="editPhoneHandler"
    />
    <van-cell-group>
      <van-field v-model="old" label="手机号" readonly/>
      <van-field v-model="phone" label="新手机号" placeholder="请输入手机号" clearable/>
    </van-cell-group>
  </div>
</template>

<script>

export default {
  created() {
    this.userId = this.$store.getters.user.userId
    this.old = this.$store.getters.user.phone
  },
  name: "ProfileEditName",
  data() {
    return {
      old: null,
      phone: null,
      userId: null
    }
  },
  methods: {
    editPhoneHandler() {
      let data = {userId: this.userId, phone: this.phone}
      console.log(data)
    }
  }
}
</script>

<style lang="scss">
.profile-edit-phone-container {

}
</style>
