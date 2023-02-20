<template>
  <base-nav-bar />
  <slot />
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "App",
  components: {
    BaseNavBar: NavBar,
  },
};
</script>
