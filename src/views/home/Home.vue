<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" 
                    class="tab-control" 
                    @tabClick="tabClick"
                    ref="tabControl1"
                    v-show="isCeiling"/>
    <!-- 中间可滚动区域 -->
    <scroll class="content" ref="scroll"
            @scroll="scroll" 
            :probe-type="3" 
            :pull-up-load="true" 
            @pullUpLoad="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @tabControlImageLoad="tabControlImageLoad"/>
      <!-- 轮播图下推荐区域 -->
      <recommend-list :recommends='recommends'/>
      <!-- 本周流行 -->
      <feature-view/>
      <!-- 切换商品的三个按钮 -->
      <tab-control :titles="['流行', '新款', '精选']" 
                    class="tab-control" 
                    @tabClick="tabClick"
                    ref="tabControl2"
                    :class="{ceiling: isCeiling}"/>
      <!-- 商品区域 -->
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- 返回到顶部按钮 -->
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
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
  import { getHomeMultiData, getHomeData } from 'network/home'
  // 工具方法导入
  // import { debounce } from 'common/tools'
  import { itemListenerMixin } from 'common/mixin.js'


  
  export default {
    name: 'Home',
    mixins: [itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {//用于存储商品数据
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        // 是否显示backtop
        isShowBackTop: false,
        tabOffsetTop: 0,
        isCeiling: false,
        saveY: 0
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
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.backTop(0, this.saveY, 0)
    },
    deactivated() {
      // 1、保存Y值
      this.saveY = this.$refs.scroll.scroll.y

      // 2、关闭事件监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    created() {
      // 1、请求顶部多个数据
      this.getHomeMultiData()
      // 2、请求商品数据
      this.getHomeData('pop')
      this.getHomeData('new')
      this.getHomeData('sell')
    },
    mounted() {
    },
    methods: {
      /* 
        事件监听相关的方法
      */
     // 加载轮播图图片
      tabControlImageLoad(){
        // 获取tabControl的offsetTop
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

     // 上拉加载商品数据
      loadMore(){
        // this.$refs.scroll.refresh()

        this.getHomeData(this.currentType)
      },

      // 点击按钮切换
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      // 点击按钮回到顶部
      backTop(){
        this.$refs.scroll.backTop(0, 0, 300)
      },

      scroll(position){
        // 1、决定backTop是否处于显示或者隐藏状态
        this.isShowBackTop = -position.y > 1000

        // 2、决定tabControl上拉到达的位置
        this.isCeiling = -position.y > this.tabOffsetTop
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
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
  }
</script>

<style scoped>
  #home{
    /* padding-top: 50px; */
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  
  .content{
    height: calc(100% - 99px);
    overflow: hidden;
  }

  .ceiling{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>