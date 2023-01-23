<template>
  <div>
    <custom-navbar></custom-navbar>
    <keep-alive include="showBlogs">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { bus } from "./main";

import showBlogs from "./components/showBlogs.vue";
export default {
  components: { showBlogs },
  data() {
    return {};
  },
  async beforeMount() {},
};
</script>

<style>
img {
  width: 50px;
  height: 50px;
}
</style>
