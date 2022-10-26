<template>
  
  <div class="hello">
    <p>
      Libro de Mormón
    </p>
    <div style="max-width:800px; margin:auto;">
      <h1>Libro de Mormón</h1>
      <div v-for="book in book_of_mormon_text.books" :key="book">
        <router-link :to="{ name: 'Book', params: { book_name: book.slug }}">{{book.name}}</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import json_book from '@/assets/libro-de-mormon'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    book_of_mormon_text() {
      return json_book
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
