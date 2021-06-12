<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" 
      class="tab-control-item"
      :class="{active: currentIndex==index}"
      @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    data() {
      return {
        currentIndex:0
      }
    },
    props: {
      titles: {
        type: Array,
        defalut(){
          return []
        }
      }
    },
    methods: {
      tabClick(index){
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    },
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .active{
    color: var(--color-tint);
  }
  .active span{
    padding: 3px;
    border-bottom: 2px solid var(--color-high-text);
  }
</style>