<template>
  <div class="s-swiper">
    <Swipe class="s-swipe">
      <SwipeItem class="slide"><img src="http://ohe5avf3y.bkt.clouddn.com/pro/vue/vue-shop/vue-proj-ban.webp"/></SwipeItem>
      <SwipeItem class="slide"><img src="http://ohe5avf3y.bkt.clouddn.com/pro/vue/vue-shop/vue-proj-ban.webp"/></SwipeItem>
      <SwipeItem class="slide"><img src="http://ohe5avf3y.bkt.clouddn.com/pro/vue/vue-shop/vue-proj-ban.webp"/></SwipeItem>
    </Swipe>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vue-swipe'
  import 'vue-swipe/dist/vue-swipe.css'
  export default {
    data () {
      return {}
    },
    components: {
      Swipe,
      SwipeItem
    },
    computed: {
      headerTitle () {
        return this.$store.getters.getHeaderTitle
      }
    },
    methods: {
      showSideBar () {
        return this.$store.dispatch('changeSideBarState', true)
        // return this.$store.commit('changeSideBarState', true)
      },
      hideSideBar () {
        return this.$store.dispatch('changeSideBarState', false)
      }
    }
  }
</script>

<style lang="scss" scope>
  .s-swiper{
    height: 6rem;
    width: 16rem;
  }
  .slide{
    background: green;
    img{
      width: 16rem;
      height: 6rem;
    }
  }
</style>
