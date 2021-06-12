<template>
  <div class="tob-bar-item" @click="clickItem">
    <div v-if="!isActive"><slot name="itemimg"></slot></div>
    <div v-else><slot name="itemactive"></slot></div>
    <div :style="activeStyle"><slot name="itemname"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'deeppink'
    }
  },
  data() {
    return {
      // active: true
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    clickItem(){
      this.$router.push(this.path)
    }
  },
}
</script>

<style scoped>
  .tob-bar-item{
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .tob-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
  .active{
    color: rebeccapurple;
  }
</style>
