<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    props: {
      recommends: {
        type: Array,
        defalut(){
          return []
        }
      }
    }
  }
</script>

<style>
  .recommend{
    display: flex;
    font-size: 14px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    flex: 1;
    margin-top: 10px;
    text-align: center;
    padding-bottom: 30px;
  }

  .recommend-item img{
    width: 88px;
    height: 88px;
    margin-bottom: 10px;
  }
  
</style>