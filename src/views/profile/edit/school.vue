<template>
  <div class="profile-edit-school-container">
    <van-nav-bar
        :title="$route.meta.title"
        left-text="返回"
        right-text="保存"
        left-arrow
        @click-left="$router.back()"
        @click-right="editSchoolHandler"
    />
    <van-cell-group>
      <van-field v-model="old" label="学校" readonly/>
      <van-field v-model="school" label="新学校" placeholder="请输入新学校名称" clearable/>
    </van-cell-group>
  </div>
</template>

<script>

export default {
  created() {
    this.userId = this.$store.getters.user.userId
    this.old = this.$store.getters.user.school
  },
  name: "ProfileEditName",
  data() {
    return {
      old: null,
      school: null,
      userId: null
    }
  },
  methods: {
    editSchoolHandler() {
      let data = {userId: this.userId,school:this.school}
      console.log(data)
    }
  }
}
</script>

<style lang="scss">
.profile-edit-school-container {

}
</style>
