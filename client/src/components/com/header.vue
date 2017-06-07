<template>
  <div class="s-header">
      <a class="left" @click="showSideBar" href="javascript:;">导航</a>
      <a class="right" @click="goBack" href="javascript:;">后退</a>
      <h4 class="center">{{headerTitle}}</h4>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
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
      },
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scope>
  .s-header{
    position: fixed;
    top: 0;
    z-index: 100;
    height: 50px;
    width:16rem;
    max-width: 16rem;
    min-width: 320px;
    margin:0 auto;
    color: #fff;
    background: #282828;
    .center,a{
      height: 50px;
      line-height: 50px;
    }
    .center{
      position: relative;
      margin-left: 2rem;
      margin-right: 2rem;
      text-align: center;
      color: #efefef;
    }
    a{
      display: inline-block;
      width:2rem;
      text-align: center;
      color:#fff;
    }
    .left{
      float: left;
    }
    .right{
      float: right;
    }
  }
</style>
