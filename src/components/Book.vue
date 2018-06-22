<template>
  <section class="mdui-container">
    <div class="mdui-table-fluid">
      <table class="mdui-table mdui-table-hoverable">
        <thead>
        <tr>
          <th>书名</th>
          <th class="mdui-table-col-numeric">价格</th>
          <th class="mdui-table-col-numeric"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="book in bookList">
          <td>{{book.name}}</td>
          <td>{{book.price}}</td>
          <td>
            <button class="mdui-btn mdui-ripple" v-on:click="borrow(book.id)">借阅</button>
            <button class="mdui-btn mdui-ripple" v-on:click="update(book.id)">修改</button>
            <button class="mdui-btn mdui-ripple" v-on:click="delBook(book.id)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <button mdui-dialog="{target: '#dialog',history:false,modal:true}" v-on:click="dialogTitle='添加书籍'"
            class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-theme-accent"><i
      class="mdui-icon material-icons">add</i></button>
    <div class="mdui-dialog" id="dialog">
      <div class="mdui-dialog-title">{{dialogTitle}}</div>
      <div class="mdui-dialog-content">
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">书名</label>
          <input class="mdui-textfield-input" type="text" v-model="bookName"/>
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">价格</label>
          <input class="mdui-textfield-input" type="number" v-model="bookPrice"/>
        </div>
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" v-on:click="bookName='';bookPrice=''" mdui-dialog-close>取消</button>
        <button class="mdui-btn mdui-ripple" v-on:click="operateBook" mdui-dialog-close>确定</button>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Book",
    props: ['search'],
    data() {
      return {
        bookList: [],
        dialogTitle: '',
        upBookId: '',
        bookName: '',
        bookPrice: '',
        basePath: 'http://192.168.43.214:8080/'
      }
    },
    watch: {
      search(now, old) {
        this.findBookByName(now);
      }
    },
    methods: {
      findAllBook() {
        this.$http.get(this.basePath + 'findAllBook', {credentials: true}).then(response => {
          if (response.body.code === 200) {
            this.bookList = response.body.list;
          } else if (response.body.code === 403) {
            this.$router.push({path: '/login'})
          } else {
            mdui.alert(response.body.msg);
          }
        }, response => {
          console.error(response);
        });
      },
      saveBook() {
        this.$http.get(this.basePath + 'saveBook?name=' + this.bookName + '&price=' + this.bookPrice, {credentials: true}).then(response => {
          if (response.body.code === 200) {
            this.findAllBook();
            this.bookName = '';
            this.bookPrice = '';
          } else if (response.body.code === 403) {
            this.$router.push({path: '/login'})
          } else {
            mdui.alert(response.body.msg);
          }
        }, response => {
          console.error(response);
        });
      },
      deleteBook(delBookId) {
        this.$http.get(this.basePath + 'deleteBook?id=' + delBookId, {credentials: true}).then(response => {
          if (response.body.code === 200) {
            this.findAllBook();
          } else if (response.body.code === 403) {
            this.$router.push({path: '/login'})
          } else {
            mdui.alert(response.body.msg);
          }
        }, response => {
          console.error(response);
        });
      },
      updateBook() {
        this.$http.get(this.basePath + 'updateBook?id=' + this.upBookId + '&name=' + this.bookName + '&price=' + this.bookPrice, {credentials: true}).then(response => {
          if (response.body.code === 200) {
            this.findAllBook();
          } else if (response.body.code === 403) {
            this.$router.push({path: '/login'})
          } else {
            mdui.alert(response.body.msg);
          }
        }, response => {
          console.error(response);
        });
      },
      findBookByName(name) {
        this.$http.get(this.basePath + 'findBookByName?name=' + name, {credentials: true}).then(response => {
          if (response.body.code === 200) {
            this.bookList = response.body.list;
          } else if (response.body.code === 403) {
            this.$router.push({path: '/login'})
          } else {
            mdui.alert(response.body.msg);
          }
        }, response => {
          console.error(response);
        });
      },
      borrowId(userId, bookId) {
        this.$http.get(this.basePath + 'borrowId?userId=' + userId + '&bookId=' + bookId, {credentials: true}).then(response => {
          if (response.body.code === 200) {
            mdui.alert(response.body.msg);
          } else {
            mdui.alert(response.body.msg);
          }
        }, response => {
          console.error(response);
        });
      },


      /**
       * 图书操作
       */
      operateBook() {
        if (this.upBookId !== '') {
          this.update();
          return;
        }
        if (this.bookName !== '' && this.bookPrice !== '') {
          this.saveBook();
        }
      },
      /**
       * 删除图书
       * @param id 图书ID
       */
      delBook(id) {
        this.deleteBook(id);
      },
      /**
       * 修改图书:ID为undefined时调用修改操作,否则弹框
       * @param id 修改的ID
       */
      update(id) {
        if (id === undefined) {
          this.updateBook();
        } else {
          this.upBookId = id;
          this.dialogTitle = '修改书籍';
          this.bookList.forEach(book => {
            if (book.id === id) {
              this.bookName = book.name;
              this.bookPrice = book.price;
            }
          });
          new mdui.Dialog('#dialog', {history: false, modal: true}).open();
        }
      },
      /**
       * 借阅
       * @param id 借阅书的ID
       */
      borrow(id) {
        this.borrowId(sessionStorage.getItem('userId'), id);
      }
    },
    beforeMount() {
      this.findAllBook();
    },
    updated() {
      mdui.updateTables();
    }
  }
</script>

<style scoped>

</style>
