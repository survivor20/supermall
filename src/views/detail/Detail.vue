<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar class="detail-topbar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="detailScroll" :probe-type="3">
      <detail-swiper :imageSlideshow="slideshowImages"/>
      <detail-item-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-item-param :paramInfo="itemParams" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSlideshow .vue'
  import DetailItemInfo from './childComps/DetailItemInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailInfo from './childComps/DetailInfo.vue'
  import DetailItemParam from './childComps/DetailItemParam.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  // 请求数据
  import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail.js'
  import { debounce } from 'common/tools.js'
  import { itemListenerMixin } from 'common/mixin.js'

  export default {
    name:'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailItemInfo,
      DetailShopInfo,
      DetailInfo,
      DetailItemParam,
      DetailCommentInfo,
      Scroll,
      GoodsList,
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        iid: null,
        slideshowImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        itemParams: {},
        commentInfo: {},
        recommends: [],
        themesOffsetTop: [],
        getOffsetTop: null,
        currentIndex: 0
      }
    },
    mounted() {

    },
    created() {
      // 1、获取iid
      this.iid = this.$route.params.iid

      // 2、获取详情页数据
      getDetail(this.iid).then(res => {
        const data = res.data.result
        // console.log(res);

        // 获取顶部图片数据
        this.slideshowImages = data.itemInfo.topImages

        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 获取商家信息
        this.shop = new Shop(data.shopInfo)

        // 获取商品详细数据
        this.detailInfo = data.detailInfo

        // 获取参数数据
        this.itemParams = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 获取评论信息
        if(data.rate.list){
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3、获取推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.data.list
      })

      this.getOffsetTop = debounce(() => {
        this.themesOffsetTop = []
        this.themesOffsetTop.push(0)
        this.themesOffsetTop.push(this.$refs.param.$el.offsetTop)
        this.themesOffsetTop.push(this.$refs.comment.$el.offsetTop)
        this.themesOffsetTop.push(this.$refs.recommend.$el.offsetTop)
        this.themesOffsetTop.push(Number.MAX_VALUE)
        console.log(this.themesOffsetTop);
      }, 200)
    },
    methods: {
      detailScroll(position){
        const positionY = -position.y
        let length = this.themesOffsetTop.length
	      for (let i = 0; i < length - 1; i++) {
		      /**
		       * 判断的方案:
		       *  方案一:
		       *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
		       *    优点: 不需要引入其他的内容, 通过逻辑解决
		       *    缺点: 判断条件过长, 并且不容易理解
		       *  方案二:
		       *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
		       *    优点: 简洁明了, 便于理解
		       *    缺点: 需要引入一个较大的int数字
		       * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
		       * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
		       */
		      if (this.currentIndex !== i && (positionY >= this.themesOffsetTop[i] && positionY < this.themesOffsetTop[i+1])) {
				    this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
		      }
        }
      },

      // 点击nav使得跳转
      titleClick(index){
        this.$refs.scroll.backTop(0, -this.themesOffsetTop[index], 500)
      },

      // 加载完图片更新页面
      imageLoad(){
        this.$refs.scroll.refresh()

        this.getOffsetTop()
      }
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }

  .content{
    height: calc(100% - 50px);
    overflow: hidden;
  }
  .detail-topbar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
