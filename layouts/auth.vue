<script>
import themeLoaderMixin from "~/mixins/themeLoader.js";

export default {
  mixins: [themeLoaderMixin]
};
</script>

<template>
  <div>
    <div class="account-pages mt-5 mb-5">
      <div class="container">
        <Nuxt />
      </div>
      <!-- end container -->
    </div>
    <!-- end page -->
    <footer class="footer footer-alt">
      {{ new Date().getFullYear() }} &copy; PRM Platformasi |
      <a target="_blank" href="https://shox-pro.netlify.app">Shokhboz Abdullaev</a>
      tomonidan ishlab chiqildi.
    </footer>
  </div>
</template>
