<template>
  <div id="app">
    <app-bar @search="search"/>
    <drawer/>
    <router-view :search="searchName"/>
  </div>
</template>

<script>
  import AppBar from './components/AppBar'
  import Drawer from './components/Drawer'

  export default {
    name: 'App',
    components: {AppBar, Drawer},
    data() {
      return {
        searchName: ''
      }
    },
    methods: {
      search(bookName) {
        this.searchName = bookName;
      }
    }
  }
</script>

<style>

</style>
