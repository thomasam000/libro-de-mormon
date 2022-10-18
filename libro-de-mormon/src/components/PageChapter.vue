<template>
    <div>
        <p>
            <router-link :to="{name:'Home'}">Libro de Mormón</router-link> / <router-link :to="{name:'Book', params: { book_name: book.book_slug }}">{{book.book}}</router-link> / Capítulo {{chapter.chapter}}
        </p>
        <div class="hello" style="max-width:800px; margin:auto;">
            <h1>{{chapter.reference}}</h1>
            <div v-for="verse in chapter.verses" :key="verse.reference">
                <p style="">{{verse.verse}}. {{verse.text}}</p>
                <!-- <div v-for="chapter in book.chapters" :key="chapter.reference">{{chapter.chapter}}</div> -->
            </div>
    
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
    },
    chapter() {
        var chapter;
        if (this.book) {
            chapter = this.book.chapters.find(chapter => chapter.chapter == this.$route.params['chapter_name'])
        } else {
            chapter = null
        }
        return chapter
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
  