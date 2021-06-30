<template>
  <div class="wrapper">
    <div class="center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name:'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },  
    data() {
      return {
        scroll: null,
      }
    },
    methods: {
      backTop(x, y, time){
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh(){
        this.scroll.refresh()
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      }
      
    },
    mounted() {
      // 创建BScroll对象
      this.scroll = new BScroll('.wrapper', {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 监听滚动的位置
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })

      // 上拉加载更多
      this.scroll.on('pullingUp', () => {
        this.$emit('pullUpLoad')
      })
    },
  }
</script>

<style scoped>

</style>
