<template>
    <div class="hello">
      <p>
        <router-link :to="{name:'Home'}">Libro de Mormón</router-link> / {{book.book}}
      </p>
      <div style="max-width:800px; margin:auto;">
        <h1>
          {{book.book}}
        </h1>
        <span v-for="chapter in book.chapters" :key="chapter.reference">
            <router-link :to="{name: 'Chapter', params: { book_name: $route.params['book_name'], chapter_name: chapter.chapter}}">
              <span class="chapter-box">
                {{chapter.chapter}}
              </span>
            </router-link>
          </span>
      </div>
  
    </div>
  </template>
  
  <script>
  import json_book from '@/assets/libro-de-mormon'
  
  export default {
    name: 'HelloWorld',
    props: {

    },
    computed: {
      book() {
        return json_book.books.find(book => book.book_slug === this.$route.params['book_name'])
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
  .chapter-box {
    width:45px; 
    margin:5px; 
    line-height:45px; 
    height:45px; 
    text-align:center; 
    display:inline-block; 
    border: solid black 1px; 
    border-radius: 5px;
  }
  .chapter-box:hover {
    background-color: #eee;
  }
  </style>
  