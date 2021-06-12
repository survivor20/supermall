<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll" @scroll='scroll' :probe-type="3 ">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-list :recommends='recommends'></recommend-list>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendList from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  // 网络请求导入
  import {getHomeMultiData, getHomeData} from 'network/home'

  
  export default {
    name: 'Home',
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendList,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    methods: {
      tabClick(index){
        switch(index){
          case 0: 
          this.currentType = 'pop'
          break
          case 1: 
          this.currentType = 'new'
          break
          case 2: 
          this.currentType = 'sell'
        }
      },

      backTop(){
        this.$refs.scroll.backTop(0, 0, 300)
      },

      scroll(position){
        this.isShowBackTop = -position.y > 1000
      },

      /*
        网络请求的方法      
      */
      getHomeMultiData(){
        getHomeMultiData().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
       })
      },
      getHomeData(type){
        let page = this.goods[type].page + 1
        getHomeData(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page++
        })
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultiData()
      this.getHomeData('pop')
      this.getHomeData('new')
      this.getHomeData('sell')
    },
  }
</script>

<style scoped>
  #home{
    padding-top: 50px;
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 50px;
    z-index: 9;
  }
  .content{
    height: calc(100% - 49px);
    overflow: hidden;
  }
</style>