<template>
  <section class="mdui-container">
    <div class="mdui-table-fluid">
      <table class="mdui-table mdui-table-hoverable">
        <thead>
        <tr>
          <th>书名</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="borrow in borrowList">
          <td>{{borrow.bookId.name}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
  export default {
    name: "User",
    data() {
      return {
        borrowList: [],
        basePath: 'http://192.168.43.214:8080/'
      }
    },
    beforeMount() {
      this.$http.get(this.basePath +'borrowFindAll', {credentials: true}).then(response => {
        if (response.body.code === 200) {
          this.borrowList = response.body.list;
        } else if (response.body.code === 403) {
          this.$router.push({path: '/login'})
        } else {
          mdui.alert(response.body.msg);
        }
      }, response => {
        console.error(response);
      });
    },
  }
</script>

<style scoped>

</style>
