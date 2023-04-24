<template>
  <div class="login-container">
    <div class="form-cont">
      <van-tabs v-model="view" class="login-form">
        <van-tab title="账号密码登陆" name="account">
          <template #title>
            <div class="tip-cont">账号密码登陆</div>
          </template>
          <van-form :label-width="20" :show-error="false" @submit="loginHandler('account')">
            <van-field
                v-model="account.username"
                name="username"
                placeholder="请输入用户名"
                :rules="[{ required: true,message:'请输入账号'}]"
            >
              <template v-slot:label>
                <van-icon class-prefix="m-icon" name="user"/>
              </template>
            </van-field>
            <van-field
                v-model="account.password"
                name="password"
                type="password"
                placeholder="请输入密码"
                :rules="[{ required: true,message:'请输入密码'}]"
            >
              <template v-slot:label>
                <van-icon class-prefix="m-icon" name="password"/>
              </template>
            </van-field>
            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit" :loading="loading">立即登陆 / 注册</van-button>
            </div>
          </van-form>
        </van-tab>
        <van-tab title="短信快捷登陆" name="sms">
          <template #title>
            <div class="tip-cont">短信快捷登陆</div>
          </template>
          <van-form :label-width="20" :show-error="false" @submit="loginHandler('sms')">
            <van-field
                v-model="sms.phone"
                name="phone"
                placeholder="请输入用户名"
                :rules="[{ required: true,message:'请输入账号'}]"
            >
              <template v-slot:label>
                <van-icon class-prefix="m-icon" name="telephone"/>
              </template>
            </van-field>
            <van-field
                v-model="sms.captcha"
                type="password"
                name="captcha"
                clearable
                placeholder="验证码"
                :rules="[{ required: true,message:'请输入验证码'}]"
            >
              <template v-slot:label>
                <van-icon class-prefix="m-icon" name="password"/>
              </template>
              <template v-slot:extra>
                <div class="captcha-bt-cont">
                  <van-button type="info" block native-type="button" style="position: absolute;">
                    获取验证码
                  </van-button>
                </div>
              </template>
            </van-field>
            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit" :loading="loading">立即登陆 / 注册</van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>

    </div>
    <div class="foot-cont">
      <div>使用其他登陆/注册方式</div>
      <van-row type="flex" justify="space-around">
        <van-col span="3">
          <van-icon class-prefix="m-icon" name="weixin" color="#28C445" size="45"/>
          微信
        </van-col>
        <van-col span="3">
          <van-icon class-prefix="m-icon" name="taobao" color="#FC8848" size="45"/>
          淘宝
        </van-col>
        <van-col span="3">
          <van-icon class-prefix="m-icon" name="qq" color="#30A5DD" size="45"/>
          腾讯
        </van-col>
        <van-col span="3">
          <van-icon class-prefix="m-icon" name="weibo" color="#EB5768" size="45"/>
          微博
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {loginReq} from "@/api/auth";

export default {
  mounted() {
  },
  data() {
    return {
      sms: {
        phone: '',
        captcha: '',
      },
      account: {
        username: '18921321312',
        password: 'dwadwa',
      },
      view: '',
      loading: false,
    }
  },
  methods: {
    loginHandler(type) {
      this.loading = true
      this.$store.dispatch('auth/login', {type, userInfo: this[type]})
          .then(_ => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          })
          .catch(err=>{
            console.log(err)
            this.loading = false
          })
    }
  },
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  flex-flow: column;
  //justify-content: space-around;
  align-items: center;
  height: 600px;
  width: 100vw;
  position: relative;
  background: #1989FA;
  background: linear-gradient(#2789e8 0%, #1882ee 120px, #0c7aee 240px, #FFFFFF 240px, #FFFFFF 100%);

  .form-cont {
    width: 90vw;
    position: absolute;
    top: 10%;

    .van-tabs__wrap {
      margin-bottom: 10px;
    }

    .login-form {
      padding: 30px 10px;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
      background-color: #FFFFFF;

      .tip-cont {
        font-weight: bold;
        font-size: medium;
      }

      .captcha-bt-cont {
        position: relative;
        width: 50%;
        box-sizing: border-box;
        padding: 0 20px;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
      }

      .van-field {
        margin-bottom: 20px;
        background-color: #f8f8f8;
      }
    }
  }

  .foot-cont {
    position: absolute;
    bottom: 0;
    width: 80vw;
    height: 15vh;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    color: gray;


    .van-row {
      width: 100%;
    }

    .van-col {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;

      i {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
