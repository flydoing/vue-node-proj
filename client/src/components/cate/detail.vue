<template>
  <div class="s-detail">
    <comSwiper></comSwiper>
    <div class="cont">
      <p class="name">{{detailData.cart_name}}</p>
      <span class="price">￥{{detailData.cart_price}}</span>
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
  import comSwiper from '../com/swiper'
  import LocalDB from '../com/localDB'
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  const router = new VueRouter()
  import '../../css/detail.scss'

  export default {
    data () {
      return {
        detailData: {
          id: 100048,
          type: 'type_man',
          isSelect: true,
          cart_img: 'http://ohe5avf3y.bkt.clouddn.com/pro/vue/vue-shop/vue-proj-goods.jpg',
          cart_name: '商品名字' + this.getRandom(10, 100),
          cart_num: 1,
          cart_price: this.getRandom(10, 100)
        }
      }
    },
    components: {
      comSwiper: comSwiper
    },
    created () {
      this.$store.dispatch('changeHeaderTitle', '商品详情页')
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
        this.$http.get('../../static/data/cart.json').then((response) => {
          this.dataCart = response.data
          this.carts = this.dataCart.data.carts
        }, (response) => {
          // error
        })
      },
      changeNum (change, detail) {
        if (change === -1) {
          if (detail.cart_num >= 2) {
            detail.cart_num = detail.cart_num - 1
          }
        } else {
          detail.cart_num = detail.cart_num + 1
        }
      },
      addCart () {
        let localDB = new LocalDB('dataCart')
        if (localDB.get('dataCart').length === 0 || localDB.get('dataCart').data.carts.length === 0) {
          this.$http.get('../../static/data/cart.json').then((response) => {
            this.dataCart = response.data
            this.carts = this.dataCart.data.carts
            localDB.set(this.dataCart)
            let dataCart = localDB.get('dataCart')
            dataCart.data.carts.unshift(this.detailData)
            localDB.set(dataCart)
            router.push({ path: 'cart' })
          }, (response) => {
            // error
          })
        } else {
          let dataCart = localDB.get('dataCart')
          dataCart.data.carts.unshift(this.detailData)
          localDB.set(dataCart)
          router.push({ path: 'cart' })
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
