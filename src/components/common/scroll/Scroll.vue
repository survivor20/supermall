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
      // 回到顶部
      backTop(x, y, time){
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 更新scroll高度
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      // 继续上拉加载数据
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      // 获取离开home是的当前所在位置的y值
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
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
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        })
      }
      
      // 检测拉到底
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          // 拉到底发出事件
          this.$emit('pullUpLoad')
        })
      }
    },
  }
</script>

<style scoped>

</style>
