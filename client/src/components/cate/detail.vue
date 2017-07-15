<template>
  <div class="s-detail">
    <div class="ban"><img :src="detailData.brand_pic" alt=""></div>
    <div class="cont">
      <p class="name">{{detailData.brand_name}}</p>
      <span class="price">￥{{detailData.brand_price}}</span>
      <div class="goods-counter">
        <a href="javascript:;" class="btn-sub" @click="changeNum(-1, detailData)"> - </a>
        <input type="text" class="goods-num" readonly="readonly" v-model="detailData.cart_num">
        <a href="javascript:;" class="btn-add" @click="changeNum(1, detailData)"> + </a>
      </div>
    </div>
    <div class="bot">
      <!-- <router-link class="add-cart" v-on:click.native="addCart" to="/cart">加入购物车</router-link> -->
      <a class="add-cart" href="javascript:;" @click="addCart">加入购物车</a>
    </div>
  </div>
</template>

<script>
  import Jam from '../com/jam'
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  const router = new VueRouter()
  import '../../css/detail.scss'

  export default {
    data () {
      return {
        detailData: {
          cart_num: 1,
          brand_id: '',
          brand_cate: '',
          brand_cateName: '',
          brand_status: '',
          brand_name: '',
          brand_price: '',
          brand_desc: '',
          brand_pic: ''
        },
        jam: function () {}
      }
    },
    created () {
      this.$store.dispatch('changeHeaderTitle', '商品详情页')
      this.getDataCart()
    },
    computed: {},
    methods: {
      showSideBar () {
        return this.$store.dispatch('changeSideBarState', true)
        // return this.$store.commit('changeSideBarState', true)
      },
      hideSideBar () {
        return this.$store.dispatch('changeSideBarState', false)
      },
      getDataCart () {
        console.log(this.$route.params.id)
        this.$http({
          url: '/api/goods/detail',
          method: 'GET',
          params: {
            brand_id: this.$route.params.id
          }
        })
          .then((res) => {
            let data = res.data
            console.log(data)
            if (data.code === 200) {
              // 合并字段 cart_num
              this.detailData = Object.assign(this.detailData, data.data)
            } else {
              console.log(data.msg)
            }
          })
      },
      changeNum (change, detail) {
        if (change === -1) {
          if (detail.cart_num >= 2) {
            detail.cart_num = detail.cart_num - 1
            console.log('-' + detail.cart_num)
          }
        } else {
          detail.cart_num = detail.cart_num + 1
          console.log('+' + detail.cart_num)
        }
      },
      addCart () {
        // 判断是否登录
        this.jam = new Jam()
        if (this.jam.locDbGet('dataLogin')) {
          this.detailData.name = this.jam.locDbGet('dataLogin').name
          this.detailData.cart_isSelect = true
          // 请求
          this.$http({
            url: '/api/goods/addToCart',
            method: 'GET',
            params: {...this.detailData}
          })
            .then((res) => {
              let data = res.data
              console.log(data)
              if (data.code === 200) {
                // 加入购物车成功，跳转路由
                console.log(data.msg)
                router.push({ path: 'cart' })
              } else {
                console.log(data.msg)
              }
            })
        } else {
          // 弹窗未登录，去登录，router
          console.log('未登录！')
          router.push({path: 'center'})
        }
      },
      getRandom (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
    }
  }
</script>

<style lang="scss" scope>

</style>
