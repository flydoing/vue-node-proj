<template>
  <div class="s-cart">
    <div class="cart-cont">
      <ul>
        <li class="cont-one" v-for="(cart, index) in carts">
          <input class="goods-checkbox" type="checkbox" v-model="cart.isSelect" @click="clickSelect(cart)">
          <a class="goods-a" href="javascript:;">
            <img class="goods-img" :src="cart.cart_img">
          </a>
          <div class="goods-info">
            <h5 class="goods-name">{{cart.cart_name}}</h5>
            <div class="goods-counter">
              <a href="javascript:;" class="btn-sub" @click="changeNum(-1, cart)"> - </a>
              <input type="text" class="goods-num" readonly="readonly" v-model.lazy="cart.cart_num">
              <a href="javascript:;" class="btn-add" @click="changeNum(1, cart)"> + </a>
            </div>
          </div>
          <span class="goods-price">￥{{cart.cart_price*cart.cart_num}}</span>
          <a class="goods-delete" href="javascript:;" @click="delectCart(index, carts)">删除</a>
        </li>
      </ul>
    </div>

    <div class="cart-counter">
      <div class="all-checkbox">
        <input type="checkbox" name="all-goods" class="all-goods" v-model="isAllSelectState" @click="clickAllSelect">
        <label for="all-goods">全选</label>
      </div>
      <div class="all-price">
        <p class="price-p">总计 :<em class="price">￥{{totalNowPrice}}</em></p>
      </div>
      <a class="btn-counter">去结算</a>
    </div>
  </div>
</template>

<script>
  import LocalDB from '../com/localDB'
  import '../../css/cart.scss'

  export default {
    data () {
      return {
        dataCart: {},
        carts: {},
        isAllSelectState: false
      }
    },
    created () {
      this.$store.dispatch('changeHeaderTitle', '购物车')
      this.getDataCart()
    },
    computed: {
      totalNowPrice () {
        let price = 0
        // this.carts.forEach(cart => {    // 可以执行，但是报错this.carts.forEach is not a function
        Array.from(this.carts).forEach(cart => {
        // [...this.carts].forEach(cart => {   //SyntaxError: Unexpected token
          if (cart.isSelect) {
            price += cart.cart_price * cart.cart_num
          }
        })
        return price
      }
    },
    methods: {
      showSideBar () {
        return this.$store.dispatch('changeSideBarState', true)
        // return this.$store.commit('changeSideBarState', true)
      },
      hideSideBar () {
        return this.$store.dispatch('changeSideBarState', false)
      },
      getDataCart () {
        let localDB = new LocalDB('dataCart')
        if (localDB.get('dataCart').length === 0 || localDB.get('dataCart').data.carts.length === 0) {
          this.$http.get('../../static/data/cart.json').then((response) => {
            this.dataCart = response.data
            this.carts = this.dataCart.data.carts
            localDB.set(this.dataCart)
          }, (response) => {
            // error
          })
        } else {
          this.dataCart = localDB.get('dataCart')
          this.carts = this.dataCart.data.carts
        }
      },
      changeNum (change, cart) {
        if (change === -1) {
          if (cart.cart_num >= 2) {
            cart.cart_num = cart.cart_num - 1
          }
        } else {
          cart.cart_num = cart.cart_num + 1
        }
      },
      clickSelect (cart) {
        cart.isSelect = !cart.isSelect  // 没有这个，数据没及时同步到全选
        let isAllSelectState = Array.from(this.carts).every(cart => {
          return cart.isSelect
        })
        this.isAllSelectState = isAllSelectState
      },
      clickAllSelect () {
        this.isAllSelectState = !this.isAllSelectState
        Array.from(this.carts).forEach(cart => {
        // [...this.carts].forEach(cart => {   //SyntaxError: Unexpected token
          cart.isSelect = this.isAllSelectState
        })
      },
      delectCart (index, carts) {
        carts.splice(index, 1)
        let localDB = new LocalDB('dataCart')
        this.dataCart.data.carts = this.carts
        localDB.set(this.dataCart)
      }
    }
  }
</script>

<style lang="scss" scope>

</style>
