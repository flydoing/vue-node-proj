<template>
  <div class="s-center">
    <div class="ban">
      <!-- <p class="uname">用户名</p> -->
      <p class="uname" v-if="showState === 'logined'"><span>用户：{{dataLogin.name}}</span></p>
      <p class="uname" v-else-if="showState === 'register'"><span>注册</span></p>
      <p class="uname" v-else-if="showState === 'logining'"><span>登录</span></p>
    </div>
    <div class="form-item">
      <p class="form-tips">{{tips}}</p>
    </div>
    <div class="cont-center" v-if="showState === 'logined'">
      <div class="item">
        <a href="javascript:;" @click="toCart">我的购物车<i>></i></a>
        <a href="javascript:;">我的优惠券<i>></i></a>
        <a href="javascript:;">个人设置<i>></i></a>
      </div>
      <div class="btn-div"><a href="javascript:;" class="btn-a" @click="clickLogout">退出登录</a></div>
    </div>

    <div class="cont-register" v-else-if="showState === 'register'">
      <div class="form-item">
        <label for="mobile">手机号</label>
        <input name="mobile" type="tel" placeholder="请输入手机号" maxlength="11" v-model="dataLogin.name">
      </div>
      <div class="form-item">
        <label for="code">验证码</label>
        <input class="" name="code" type="tel" placeholder="请输入验证码" maxlength="6" v-model="dataLogin.code">
        <a href="javascript:;" class="btn-get">重新获取</a>
      </div>
      <div class="form-item">
        <label for="password">密&nbsp;&nbsp;&nbsp;码</label>
        <input name="password" type="tel" placeholder="请输入密码" maxlength="6" v-model="dataLogin.pass">
        <a class="btn-get" href="javascript:;">眼睛</a>
      </div>
      <div class="btn-div"><a href="javascript:;" class="btn-a" @click="clickRegister">注册按钮</a></div>
      <fieldset class="">
        <legend>或</legend>
        <a href="javascript:;" class="" @click="toLogin">已有账号？快速登录</a>
      </fieldset>
    </div>

    <div class="cont-login" v-else-if="showState === 'logining'">
      <div class="form-item">
        <label for="username">账号</label>
        <input name="username" type="tel" placeholder="请输入手机号" maxlength="11" v-model="dataLogin.name">
      </div>
      <div class="form-item">
        <label for="password">密码</label>
        <input name="password" type="tel" placeholder="请输入密码" maxlength="6" v-model="dataLogin.pass">
        <a class="btn-get" href="javascript:;">眼睛</a>
      </div>
      <div class="btn-div"><a href="javascript:;" class="btn-a" @click="clickLogin">登录按钮</a></div>
      <fieldset class="form-fieldset">
        <legend>或</legend>
        <a href="javascript:;" class="" @click="toRegister">未有账号？免费注册</a>
      </fieldset>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  const router = new VueRouter()
  import Jam from '../com/jam'
  import '../../css/center.scss'
  // 进入页面判断是否已经登录,显示对应页面：登录，未登录
  // 点击注册
  // 控制显示隐藏

  export default {
    data () {
      return {
        tips: '',
        showState: 'logined',
        dataLogin: {
          name: '',
          pass: '',
          code: ''
        },
        // showState: 'register'
        // showState: 'logining'
        jam: function () {}
      }
    },
    created () {
      this.$store.dispatch('changeHeaderTitle', '我的')
      this.jam = new Jam()
      // this.jam.locDbSet('dataLogin', {name: 'guojc1', pass: 7896})
      let lDataLogin = this.jam.locDbGet('dataLogin')
      if (lDataLogin === undefined || lDataLogin === null) {
        this.showState = 'logining'
      } else {
        this.dataLogin = this.jam.locDbGet('dataLogin')
        this.showState = 'logined'
        // 显示用户名
      }
    },
    methods: {
      showSideBar () {
        return this.$store.dispatch('changeSideBarState', true)
      },
      hideSideBar () {
        return this.$store.dispatch('changeSideBarState', false)
      },
      toCart () {
        router.push({ path: 'cart' })
      },
      clickLogin () {
        // 验证
        if (this.jam.isPhone(this.dataLogin.name)) {
          if (this.jam.isPass(this.dataLogin.pass)) {
            this.$http({
              url: '/api/user/login',
              method: 'GET',
              params: {
                name: this.dataLogin.name,
                pwd: this.dataLogin.pass
              }
            })
              .then((res) => {
                let data = res.data
                console.log(data)
                if (data.code === 200) {
                  // 登录成功
                  this.jam.locDbSet('dataLogin', {name: this.dataLogin.name, pass: this.dataLogin.pass})
                  this.showState = 'logined'
                  this.tips = ''
                } else {
                  console.log(data.msg)
                  this.tips = data.msg
                }
              })
//              .then(function (res) {
//                let data = res.data
//                console.log(data)
//                if (data.code === 200) {
//                  // 登录成功
//                  this.jam.locDbSet('dataLogin', {name: this.dataLogin.name, pass: this.dataLogin.pass})
//                  this.showState = 'logined'
//                  this.tips = ''
//                } else {
//                  console.log(data.msg)
//                  this.tips = data.msg
//                  this.tips = '88888'
//                }
//              })
          } else {
            this.tips = '请输入由字母数字组成的6位密码！'
          }
        } else {
          this.tips = '请输入正确的手机号！'
        }
      },
      clickRegister () {
        // 验证
        console.log(this.dataLogin)
        if (this.jam.isPhone(this.dataLogin.name)) {
          if (this.jam.isPass(this.dataLogin.pass) && this.jam.isPass(this.dataLogin.code)) {
            // 注册登录成功
            this.$http({
              url: '/api/user/register',
              method: 'GET',
              params: {
                name: this.dataLogin.name,
                pwd: this.dataLogin.pass
              }
            })
              .then((res) => {
                let data = res.data
                console.log(data)
                if (data.code === 200) {
                  // 登录成功
                  this.jam.locDbSet('dataLogin', {name: this.dataLogin.name, pass: this.dataLogin.pass})
                  this.showState = 'logined'
                  this.tips = ''
                } else {
                  console.log(data.msg)
                  this.tips = data.msg
                }
              })
          } else {
            this.tips = '请输入由字母数字组成的6位验证码密码！'
          }
        } else {
          this.tips = '请输入正确的手机号！'
        }
      },
      clickLogout () {
        localStorage.removeItem('dataLogin')
        this.showState = 'logining'
        this.dataLogin.name = ''
        this.dataLogin.pass = ''
      },
      toRegister () {
        this.showState = 'register'
        this.tips = ''
      },
      toLogin () {
        this.showState = 'logining'
        this.tips = ''
      }
    }
  }
</script>

<style lang="scss" scope>

</style>
