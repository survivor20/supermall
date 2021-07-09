<template>
  <!-- :interval='1000' -->
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="tabControlImageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: 'HomeSwiper',
    data() {
      return {
        isImageLoad: true
      }
    },
    props: {
      banners: {
        type: Array,
        defalut(){
          return []
        }
      }
    },
    methods: {
      tabControlImageLoad(){
        if(this.isImageLoad){
          this.$emit('tabControlImageLoad')
          this.isImageLoad = false
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>