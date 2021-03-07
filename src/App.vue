<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }

}
</script>

<style>
  #app {
    align-items: center;
    display: grid;
    height: 100vh;
    place-items: center;
    width: 100%;
  }
</style>
