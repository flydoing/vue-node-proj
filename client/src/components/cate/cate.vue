<template>
  <div class="s-cate">
    <div class="cate-nav">
      <div class="nav-out">
        <div class="nav">
          <a class="nav-a" href="javascript:;"
              v-for="(type, index) in types"
              :class="{'nav-a-act': index==nowIndex}"
              @click="clickType(type.type_now, index)">
              {{type.type_name}}
          </a>
          <!-- <a class="nav-a" href="javascript:;" @click="clickType('type_man')">男装</a>
          <a class="nav-a" href="javascript:;" @click="clickType('type_girl')">女装</a>
          <a class="nav-a" href="javascript:;" @click="clickType('type_man')">男装</a>
          <a class="nav-a" href="javascript:;" @click="clickType('type_man')">男装</a>
          <a class="nav-a" href="javascript:;" @click="clickType('type_girl')">女装</a>
          <a class="nav-a" href="javascript:;" @click="clickType('type_girl')">女装</a>
          <a class="nav-a" href="javascript:;" @click="clickType('type_man')">男装</a>
          <a class="nav-a" href="javascript:;" @click="clickType('type_man')">男装</a>
          <a class="nav-a" href="javascript:;" @click="clickType('type_man')">男装</a> -->
        </div>
      </div>
    </div>
    <div class="cate-cont">
      <ul>
        <li v-for="brand in allBrand" v-if="nowType==brand.brand_cate || nowType=='type_all'">
          <router-link :to="'detail/'+brand.brand_id" class="cont-li" href="javascript:;">
            <!--<img class="pic" :src="brand.brand_pic"/>-->
            <img class="pic" v-lazy="brand.brand_pic"/>
            <span class="name">{{brand.brand_name}}</span>
            <span class="price">{{brand.brand_price}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import '../../css/cate.scss'

  export default {
    data () {
      return {
        nowType: 'type_all',
        nowIndex: 0,
        types: {},
        dataCate: {},
        allBrand: {}
      }
    },
    created () {
      this.$store.dispatch('changeHeaderTitle', '分类')
      this.getDataCate()
    },
    methods: {
      showSideBar () {
        return this.$store.dispatch('changeSideBarState', true)
        // return this.$store.commit('changeSideBarState', true)
      },
      hideSideBar () {
        return this.$store.dispatch('changeSideBarState', false)
      },
      getDataCate () {
//        this.$http.get('../../static/data/cate.json').then((response) => {
//          this.dataCate = response.data
//          this.types = this.dataCate.data.types
//          this.allBrand = this.dataCate.data.allBrand
//        }, (response) => {
//          // error
//        })
        // 左侧导航条的数据暂时默认写死
        this.types = [
          {
            'type_name': '全部',
            'type_now': 'type_all'
          },
          {
            'type_name': '男装',
            'type_now': 'type_man'
          },
          {
            'type_name': '女装',
            'type_now': 'type_girl'
          },
          {
            'type_name': '男装',
            'type_now': 'type_man'
          },
          {
            'type_name': '男装',
            'type_now': 'type_man'
          },
          {
            'type_name': '女装',
            'type_now': 'type_girl'
          },
          {
            'type_name': '女装',
            'type_now': 'type_girl'
          }
        ]

        this.$http({
          url: '/api/goods/cate',
          method: 'GET'
        })
          .then((res) => {
            let data = res.data
            console.log(data)
            if (data.code === 200) {
              // 数据
//              this.dataCate = response.data
//              this.types = this.dataCate.data.types
              this.allBrand = data.data
            } else {
              console.log(data.msg)
            }
          })
      },
      clickType (type, index) {
        this.nowType = type
        this.nowIndex = index
      }
    }
  }
</script>

<style lang="scss" scope>

</style>
