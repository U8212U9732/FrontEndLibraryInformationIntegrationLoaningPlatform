<template>
  <nav class="mdui-drawer mdui-card" id="left-drawer">
    <div class="mdui-card-media">
      <img src="../assets/card.jpg"/>
      <div class="mdui-card-media-covered">
        <div class="mdui-card-primary">
          <div class="mdui-card-primary-title">舒露</div>
          <div class="mdui-card-primary-subtitle">欢迎</div>
        </div>
      </div>
    </div>
    <ul class="mdui-list mdui-card-content" mdui-collapse="{accordion: true}">
      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-list-item-icon mdui-icon material-icons">nature_people</i>
        <router-link to="/book" class="mdui-list-item-content">图书</router-link>
      </li>
      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-list-item-icon mdui-icon material-icons">nature_people</i>
        <router-link to="/borrow" class="mdui-list-item-content">借阅</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
    export default {
        name: "Drawer"
    }
</script>

<style scoped>

</style>
