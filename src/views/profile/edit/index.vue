<template>
    <div class="profile-edit-container" v-if="user">
        <van-nav-bar
                :title="$route.meta.title"
                left-text="返回"
                left-arrow
                @click-left="$router.back()"
        />
        <van-cell title="头像" center is-link @click="openUploaderHandler">
            <template #default>
                <van-image
                        round
                        width="50px"
                        height="50px"
                        :src="user.avatar"
                />
            </template>
        </van-cell>
        <van-cell title="昵称" center is-link to="/profile/edit/name">
            <template #default>
                {{ user.name | nullFilter }}
            </template>
        </van-cell>
        <van-cell title="性别" center is-link @click="showGenderSelect = true">
            <template #default>
                {{ user.gender | genderFilter | nullFilter }}
            </template>
        </van-cell>
        <van-cell title="年龄" center is-link @click="showAgeSelect = true">
            <template #default>
                {{ user.age | ageFilter | nullFilter }}
            </template>
        </van-cell>
        <van-cell title="个性签名" center is-link to="/profile/edit/sign">
            <template #default>
                {{ user.sign | nullFilter }}
            </template>
        </van-cell>
        <van-cell title="学校" center is-link to="/profile/edit/school">
            <template #default>
                {{ user.school | nullFilter }}
            </template>
        </van-cell>
        <van-cell title="手机号" center is-link to="/profile/edit/phone">
            <template #default>
                {{ user.phone | nullFilter }}
            </template>
        </van-cell>
        <van-cell title="邮箱" center is-link to="/profile/edit/email">
            <template #default>
                {{ user.email | nullFilter }}
            </template>
        </van-cell>

        <van-popup v-model="showUploader" round position="bottom" style="padding: 10px 0 20px 0;">
            <van-cell clickable>
                <template #title>
                    <van-uploader ref="image-uploader-camera"
                                  :before-read="beforeReadHandler"
                                  :after-read="afterReadHandler"
                                  capture="camera"
                                  accept="image/*"
                                  style="width: 100%;height: 100%;">
                        <template #default>
                            <div style="width: 100%;height: 100%;">拍照</div>
                        </template>
                    </van-uploader>
                </template>
            </van-cell>
            <van-cell clickable>
                <template #title>
                    <van-uploader v-model="fileList"
                                  ref="image-uploader-pick"
                                  accept="image/*"
                                  :preview-image="false"
                                  :before-read="beforeReadHandler"
                                  :after-read="afterReadHandler"
                                  style="width: 100%;height: 100%;">
                        <template #default>
                            <div style="width: 100%;height: 100%;">从相册选择</div>
                        </template>
                    </van-uploader>
                </template>
            </van-cell>
        </van-popup>

        <van-popup v-model="showGenderSelect" round position="bottom">
            <van-picker
                    show-toolbar
                    value-key="k"
                    :columns="[{k: '女',v: 1},{k: '男',v: 2},{k: '隐藏',v: 3}]"
                    @cancel="showGenderSelect = false"
                    :default-index="user.gender - 1"
                    @confirm="onGenderConfirmHandler"
            />
        </van-popup>

        <van-popup v-model="showAgeSelect" round position="bottom">
            <van-picker
                    show-toolbar
                    value-key="k"
                    :columns="ages"
                    @cancel="showAgeSelect = false"
                    :default-index="user.age - 1"
                    @confirm="onAgeConfirmHandler"
            />
        </van-popup>
    </div>
</template>

<script>
import {genderFilter, ageFilter} from "@/utils/filter";
import {userAvatarUpdate, userUpdateReq} from "@/api/profile";
import {Toast} from "vant";

export default {
    name: "ProfileEdit",
    created() {
        this.initData()
    },
    data() {
        return {
            fileList: [],
            user: null,
            ages: [],
            gender: null,
            showAgeSelect: false,
            showUploader: false,
            showGenderSelect: false,
        }
    },
    methods: {
        initData() {
            this.$store.dispatch('auth/getUserInfo')
                .then(() => {
                    this.user = JSON.parse(JSON.stringify(this.$store.getters.user))
                    this.gender = this.user.gender
                    this.ages = Array.from(Array(100).keys(), n => n + 1);
                })
        },
        openUploaderHandler() {
            this.showUploader = true
        },
        beforeReadHandler(file) {
            let maxSize = 1024 * 1024 * 3 // 3MB
            if (file.size > maxSize) {
                Toast('上传的文件过大');
                return false;
            } else if (file.type.indexOf('image') === -1) {
                Toast('请上传图片类型文件');
                return false;
            }
            return true;
        },
        afterReadHandler(f, fl) {
            console.log(f,fl)
            this.showUploader = false
            userAvatarUpdate(f.file)
                .then(({msg, data}) => {
                    Toast({
                        message: "修改成功",
                        type: 'success',
                        overlay: true,
                        duration: 2 * 1000,
                        onClose: () => {
                            this.initData()
                        }
                    })
                })
            console.log(f, fl)
        },
        onAgeConfirmHandler(v) {
            let data = {age: v}
            userUpdateReq(data)
                .then(({msg, data}) => {
                    Toast({
                        message: "修改成功",
                        type: 'success',
                        overlay: true,
                        duration: 1.5 * 1000,
                        onClose: () => {
                            this.initData()
                        }
                    })
                })
            this.showAgeSelect = false
        },
        onGenderConfirmHandler(v) {
            let data = {gender: v.v}
            userUpdateReq(data)
                .then(({msg, data}) => {
                    Toast({
                        message: "修改成功",
                        type: 'success',
                        overlay: true,
                        duration: 1.5 * 1000,
                        onClose: () => {
                            this.initData()
                        }
                    })
                })
            this.showGenderSelect = false
        }
    },
    filters: {
        genderFilter,
        ageFilter,
        nullFilter(v) {
            return v || '待完善'
        }
    }
}
</script>

<style lang="scss">
.profile-edit-container {
  .van-cell__title {
    flex: 1;
  }

  .van-cell__value {
    flex: 4;
  }

  .van-uploader div {
    width: 100%;
    height: 100%;
  }
}
</style>
