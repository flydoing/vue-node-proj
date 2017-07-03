<template>
  <div class="s-index">
    <comSwiper></comSwiper>

    <div class="cont">
      <p class="cont-head">
        <span class="head-title">特卖</span>
        <!-- <a class="head-right" >更多></a> -->
        <router-link to="/cate" class="head-right">更多 ></router-link>
      </p>
      <div class="cont-main cont-temai">
        <router-link to="/detail" class="cont-one" href="javascript:;" v-for="brand in temai" :key="brand.id">
          <span class="name">{{brand.brand_name}}</span>
          <span class="price">￥{{brand.brand_price}}</span>
          <img class="pic" :src="brand.brand_pic_url"/>
        </router-link>
      </div>
    </div>

    <div class="cont">
      <p class="cont-head">
        <span class="head-title">热销</span>
        <!-- <a class="head-right" >更多></a> -->
        <router-link to="/cate" class="head-right">更多 ></router-link>
      </p>
      <div class="cont-main cont-rexiao">
        <router-link to="/detail" class="cont-left" href="javascript:;"
            v-for="(brand, key, index) in rexiao"
            v-if="key==0"
            :key="brand.id">
          <span class="name">{{brand.brand_name}}</span>
          <span class="desc">{{brand.brand_desc}}</span>
          <img class="pic" :src="brand.brand_pic_url"/>
        </router-link>
        <div class="cont-right">
          <router-link to="/detail" class="cont-right-one" href="javascript:;"
              v-for="(brand, key, index) in rexiao"
              v-if="key>=1"
              :key="brand.id">
            <p class="text">
              <span class="name">{{brand.brand_name}}</span>
              <span class="desc">{{brand.brand_desc}}</span>
            </p>
            <img class="pic" :src="brand.brand_pic_url"/>
          </router-link>
        </div>
      </div>
    </div>

    <div class="cont">
      <p class="cont-head">
        <span class="head-title">精品</span>
        <!-- <a class="head-right" >更多></a> -->
        <router-link to="/cate" class="head-right">更多 ></router-link>
      </p>
      <div class="cont-main cont-jingpin">
        <ul>
          <li v-for="brand in jingpin">
            <router-link to="detail" class="cont-li" href="javascript:;">
              <img class="pic" :src="brand.brand_pic_url"/>
              <span class="name">{{brand.brand_name}}</span>
              <span class="price">￥{{brand.brand_price}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- <div class="bot">bot</div> -->
  </div>
</template>

<script>
  import comSwiper from '../com/swiper'
  import '../../css/index.scss'

  export default {
    data () {
      return {
        dataIndex: {},
        temai: {},
        rexiao: {},
        jingpin: {}
      }
    },
    components: {
      comSwiper: comSwiper
    },
    created () {
      this.$store.dispatch('changeHeaderTitle', '首页')
      this.getDataIndex()
    },
    methods: {
      showSideBar () {
        return this.$store.dispatch('changeSideBarState', true)
        // return this.$store.commit('changeSideBarState', true)
      },
      hideSideBar () {
        return this.$store.dispatch('changeSideBarState', false)
      },
      getDataIndex () {
        this.$http.get('../../static/data/index.json').then((response) => {
          this.dataIndex = response.data
          this.temai = this.dataIndex.data.temai
          this.rexiao = this.dataIndex.data.rexiao
          this.jingpin = this.dataIndex.data.jingpin
        }, (response) => {
          // error
        })

        this.$http({
          url: '/api/goods/list',
          method: 'GET'
        })
          .then((res) => {
            let data = res.data
            console.log(data)
            if (data.code === 200) {
              // 处理数据
            } else {
              console.log(data.msg)
            }
          })
      }
    }
  }
</script>

<style lang="scss" scope>

</style>
