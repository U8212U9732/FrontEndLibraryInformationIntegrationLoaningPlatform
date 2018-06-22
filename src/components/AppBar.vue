<template>
  <header class="mdui-appbar mdui-appbar-fixed">
    <div class="mdui-toolbar mdui-color-theme">
      <a href="javascript:" class="mdui-btn mdui-btn-icon" mdui-drawer="{target: '#left-drawer'}"><i
        class="mdui-icon material-icons">menu</i></a>
      <p>图书馆信息一体化管理平台</p>
      <div class="mdui-toolbar-spacer"></div>
      <div class="mdui-col">
        <div class="mdui-textfield mdui-textfield-expandable mdui-textfield-expanded mdui-float-right">
          <button class="mdui-textfield-icon mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">search</i>
          </button>
          <input class="mdui-textfield-input" type="text" placeholder="Search" v-model="bookName" @keyup.enter="search">
          <button class="mdui-textfield-close mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">close</i>
          </button>
        </div>
      </div>
      <a href="javascript:window.location.reload();" class="mdui-btn mdui-btn-icon"><i
        class="mdui-icon material-icons">refresh</i></a>
    </div>
  </header>
</template>

<script>
  export default {
    name: "AppBar",
    data() {
      return {
        bookName: ''
      }
    },
    methods: {
      search() {
        if (this.bookName !== '') {
          this.$emit('search', this.bookName);
        }
      }
    }
  }
</script>

<style scoped>

</style>
