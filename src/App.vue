<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/auth">Authentification</router-link> -->
    <router-view/>
      <!-- <Switcher>
      </Switcher> -->
  </div>
</template>

<script>
// import Switcher from './components/Switcher.vue'

export default {
  name: 'App',
  components: {
    // Switcher
  }

}
</script>

<style>
  #app {
    align-items: center;
    display: grid;
    height: 100vh;
    place-items: center;
    max-width: 758px;
    width: 100%;
  }
</style>
