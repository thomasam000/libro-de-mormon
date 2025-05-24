<template>
    <div class="hello">
        <router-link :to="{name: $route.name, params: { book_name: this.next_book}}"> 
            <div class="nav-button" id="nav-button-right" :class="disable_next_button ? 'disabled':''">&gt;</div>
        </router-link>
        <router-link :to="{name: $route.name, params: { book_name: this.previous_book}}">
            <div class="nav-button" id="nav-button-left" :class=" disable_previous_button? 'disabled':''">&lt;</div>
        </router-link>

      <p>
        <router-link :to="{name:'Library'}">Libro de Mormón</router-link> / {{book.name}}
      </p>
      <div style="max-width:800px; margin:auto;">
        <h1>
          {{book.name}}
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
  import json_book from '@/assets/libro-de-mormon-americano'
  
  export default {
    name: 'HelloWorld',
    props: {

    },
    computed: {
      book() {
        return json_book.books.find(book => book.slug === this.$route.params['book_name'])
      },
      current_book_index() {
        return json_book.books.indexOf(this.book)
      },
      previous_book_index() {
        if (this.current_book_index == 0) {
          return -1
        } else {
          return this.current_book_index - 1
        }
      },
      previous_book() {
        if (this.previous_book_index >= 0) {
          return json_book.books[this.previous_book_index].slug
        } else {
          return this.book.slug
        }
      },
      disable_previous_button() {
        return this.previous_book_index < 0
      }, 
      next_book_index() {
        if (this.current_book_index == json_book.books.length - 1) {
          return 1000
        } else {
          return this.current_book_index + 1
        }
      },
      next_book() {
        if (this.next_book_index < 1000) {
          return json_book.books[this.next_book_index].slug
        } else {
          return this.book.slug
        }
      },
      disable_next_button() {
        return this.next_book_index > 999
      }, 
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
  color: #0a1c6b;
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

  .nav-button {
    background-color: white;
  }


  @media (max-width: 1000px) {
    .nav-button {
    position:fixed;
    bottom:0;
    height:45px;
    line-height:45px;
    width:50%;
    border:black solid 1px;
    text-align: center;
  }
  .nav-button:hover { 
    background-color:#eee
  }
  .chapter-container {
    margin: 0 auto 50px;
  }
  #nav-button-left {
    left:0;
}
#nav-button-right {
    right:0;
}

}

@media (min-width: 1001px) {
  .nav-button {
    position:fixed;
    top:50%;
    transform: translate(0, -50%);
    border-radius: 50%;
    height:45px;
    line-height:45px;
    width:45px;
    border:black solid 1px;
    text-align: center;
  }
  .nav-button:hover { 
    background-color:#eee
  }
  #nav-button-left {
    left:25px;
  }
  #nav-button-right {
      right:25px;
  }
  .chapter-container {
      margin: 0 auto;
  }

}
  .disabled {
    pointer-events:none;
    border:solid darkgrey 1px;
    background-color: #eee;

  }

  </style>
  