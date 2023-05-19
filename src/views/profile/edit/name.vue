<template>
    <div class="profile-edit-name-container">
        <van-nav-bar
                :title="$route.meta.title"
                left-text="返回"
                right-text="保存"
                left-arrow
                @click-left="$router.back()"
                @click-right="editNameHandler"
        />
        <van-cell-group>
            <van-field v-model="old" label="昵称" readonly/>
            <van-field v-model="name" label="新昵称" placeholder="请输入新昵称" clearable/>
        </van-cell-group>
    </div>
</template>

<script>

import {userUpdateReq} from "@/api/profile";
import {Toast} from "vant";

export default {
    created() {
        this.userId = this.$store.getters.user.userId
        this.old = this.$store.getters.user.name
    },
    name: "ProfileEditName",
    data() {
        return {
            old: null,
            name: null,
            userId: null
        }
    },
    methods: {
        editNameHandler() {
            let data = {name: this.name}
            userUpdateReq(data)
                .then(({msg, data}) => {
                    Toast({
                        message: "修改成功",
                        type: 'success',
                        overlay: true,
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
.profile-edit-name-container {

}
</style>
