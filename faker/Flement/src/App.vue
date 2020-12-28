<template>
  <div id="app">
    <timelineDemo></timelineDemo>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import timelineDemo from "./components/timeline/timelineDemo.vue";

export default {
  name: "App",
  components: {
    timelineDemo
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
