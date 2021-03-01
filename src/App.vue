<template>
  <div id="app">
    <Navbar></Navbar>
  </div>
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar
  }
};
</script>

<style></style>
