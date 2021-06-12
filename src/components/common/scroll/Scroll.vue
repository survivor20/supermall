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
      probeType: Number,
      default: 0
    },  
    data() {
      return {
        scroll: null,
      }
    },
    methods: {
      backTop(x, y, time){
        this.scroll.scrollTo(x, y, time)
      }
    },
    mounted() {
      this.scroll = new BScroll('.wrapper', {
        click: true,
        probeType: this.probeType
      })

      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
    },
  }
</script>

<style scoped>

</style>
