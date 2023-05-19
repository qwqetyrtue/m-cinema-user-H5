<template>
    <div class="profile-edit-sign-container">
        <van-nav-bar
                :title="$route.meta.title"
                left-text="返回"
                right-text="保存"
                left-arrow
                @click-left="$router.back()"
                @click-right="editSignHandler"
        />
        <van-cell-group>
            <van-field v-model="sign"
                       label="个性签名"
                       placeholder="请输入新个性签名"
                       rows="3"
                       autosize
                       type="textarea"
                       maxlength="50"
                       show-word-limit
                       clearable/>
        </van-cell-group>
    </div>
</template>

<script>

import {userUpdateReq} from "@/api/profile";
import {Toast} from "vant";

export default {
    created() {
        this.userId = this.$store.getters.user.userId
    },
    name: "ProfileEditSign",
    data() {
        return {
            sign: null,
            userId: null
        }
    },
    methods: {
        editSignHandler() {
            let data = {sign: this.sign}
            userUpdateReq(data)
                .then(({msg, data}) => {
                    Toast({
                        message: "修改成功",
                        type: 'success',
                        overlay: true,
                        duration: 2 * 1000,
                        onClose: () => {
                            this.$store.dispatch('auth/getUserInfo')
                                .then(() => this.initData())
                            this.$router.back()
                        }
                    })
                })
        }
    }
}
</script>

<style lang="scss">
.profile-edit-sign-container {

}
</style>
