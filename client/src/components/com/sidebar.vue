<template>
  <div class="s-sidebar"  @click="hideSideBar">
    <transition name="sideBar1" mode="">
      <div class="overlay" v-show="show">
        <transition name="sideBar" mode="">
          <ul class="ul-nav" v-show="show">
            <li><router-link to="/index"><span>首页</span><i>></i></router-link></li>
            <li><router-link to="/cate"><span>分类</span><i>></i></router-link></li>
            <li><router-link to="/center"><span>我的</span><i>></i></router-link></li>
            <li><router-link to="/cart"><span>购物车</span><i>></i></router-link></li>
            <!-- <li><a href="javascript:;"><span>首页</span><i>></i></a></li>
            <li><a href="javascript:;"><span>首页</span><i>></i></a></li>
            <li><a href="javascript:;"><span>首页</span><i>></i></a></li>
            <li><a href="javascript:;"><span>首页</span><i>></i></a></li>
            <li><a href="javascript:;"><span>首页</span><i>></i></a></li> -->
          </ul>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    computed: {
      show () {
        return this.$store.getters.getSideBarState
      }
    },
    methods: {
      hideSideBar () {
        return this.$store.dispatch('changeSideBarState', false)
      }
    }
  }
</script>

<style lang="scss" scope>
  .s-sidebar{
    // display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    max-width: 640px;
    width: 100%;
    color: #9a9a9a;
    z-index: 501;
    transition: all ease 0.4s;
    .overlay{
      position: absolute;
      top: 50px;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0,0,0,0.5);
      transition: all ease 0.4s;
    }
    .ul-nav{
      position: absolute;
      display: block;
      top: 0;
      right: 140px;
      bottom: 0;
      left: 0;
      border-top: 1px solid #222;
      box-shadow: 0 1px 1px #363636 inset;
      background: #282828;
      // transition: all ease 0.4s;
      a{
        display: block;
        padding: 0 16px;
        line-height: 50px;
        font-size: 14px;
        color: #9a9a9a;
        border-bottom: 1px dotted #333;
        span{
          font-size: 14px;
          color: #9a9a9a;
        }
        i{
          float: right;
        }
      }
    }
  }
  .s-sidebar .sideBar-enter-active, .s-sidebar .sideBar-leave-active{
    // transition: opacity 2.8s;
    transition: all ease 0.4s;
  }
  .s-sidebar .sideBar-enter{
    right: 180px;
    // transition: opacity 2s;
  }
  .s-sidebar .sideBar-leave-active{
    right: 140px;
  }

  .s-sidebar .sideBar1-enter-active, .s-sidebar .sideBar1-leave-active{
    // transition: opacity 2.8s;
    transition: all ease 0.4s;
  }
  .s-sidebar .sideBar1-enter{
    // right: 180px;
    // transition: opacity 2s;
    opacity: 0
  }
  .s-sidebar .sideBar1-leave-active{
    // right: 140px;
    opacity: 0
  }
</style>
