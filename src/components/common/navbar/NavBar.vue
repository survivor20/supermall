<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
  .nav-bar{
    line-height: 50px;
    display: flex;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  .left, .right{
    width: 60px;
  }
  .center{
    flex: 1;
    text-align: center;
  }
</style>