<template>
  <div>
    <swiper class="nav-slideshow">
      <swiper-item v-for="(item, index) in imageSlideshow" :key="index">
        <img :src="item" alt="" class="img-slideshow">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper/index.js'
  export default {
    name:'DetailSlideshow',
    props: {
      imageSlideshow: {
        type: Array,
        default(){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .nav-slideshow{
    height: 300px;
  }
</style>
