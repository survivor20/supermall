<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="deeppink">
      <img slot="itemimg" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="itemactive" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="itemname">首页</div>
    </tab-bar-item >
    <tab-bar-item path="/category" activeColor="yellowgreen">
      <img slot="itemimg" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="itemactive" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="itemname">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcart" activeColor="greenyellow">
    <img slot="itemimg" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="itemactive" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="itemname">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="#41B883">
      <img slot="itemimg" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="itemactive" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="itemname">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
