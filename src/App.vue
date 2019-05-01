<template>
  <div id="app">
    <navbar v-if="isAuthenticated"></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Navbar from './components/Navbar';

export default {
  name: 'app',
  components: {
    Navbar,
  },
  computed: mapGetters('auth', [
    'isAuthenticated',
  ]),
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
  background: url("assets/soundcheck.jpg") fixed;
  background-color: rgba(255, 255, 255, 0.7) !important;
  background-blend-mode: color;
}
</style>
