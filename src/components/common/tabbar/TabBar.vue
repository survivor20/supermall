<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
  .tab-bar{
    display: flex;
    background: #F5F4F6 ;
    height: 49px;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
