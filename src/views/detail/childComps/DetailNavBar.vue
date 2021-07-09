<template>
  <nav-bar>
    <div slot="left" @click="imgClick">
      <img src="~assets/img/common/back.svg" alt="" class="left-img" />
    </div>
    <div slot="center" class="center">
      <div v-for="(item, index) in title"
          :key="index"
          class="center-item"
          @click="titleClick(index)"
          :class="{ active: index === currentIndex }">
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  // 详情页导航栏功能
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "TabBar",
    components:{
      NavBar
    },
    data() {
      return {
        title: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      imgClick(){
        this.$router.back()
      },
      titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick', index)
      }
    },
  };
</script>

<style scoped>
  .left-img{
    width: 20px;
    /* padding-top: 15px; */
    position: relative;
    top: 5px;
  }
  .center{
    display: flex;
    font-size: 14px;
  }
  .center-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text)
  }
</style>
