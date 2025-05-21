<template>
    <div>
        <input type="text" v-model="current_word">
        <button @click="test_conjugator">test conjugator</button>
        <button @click="get_book_or_mormon">get bom text</button>
        {{how_many_chapters_complete}} complete
        <button @click="translate_from_spain_to_latin_american">Get rid of vosotros</button>
        currently translating: {{currently_translating}}
    </div>
    
</template>
<script>
// import json_book from '@/assets/libro-de-mormon'
import { load } from 'cheerio'
import axios from 'axios'

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data: function() {
        return {
            current_word: '',
            currently_translating: '',
            libro_de_mormon_info: {
                books: [
                    {slug: '1-ne', name: 'Nefi 1', chapters_count: 22, chapters: []},
                    // {slug: '2-ne', name: 'Nefi 2', chapters_count: 33, chapters: []},
                    // {slug: 'jacob', name: 'Jacob', chapters_count: 7, chapters: []},
                    // {slug: 'enos', name: 'Enós', chapters_count: 1, chapters: []},
                    // {slug: 'jarom', name: 'Jarom', chapters_count: 1, chapters: []},
                    // {slug: 'omni', name: 'Omni', chapters_count: 1, chapters: []},
                    // {slug: 'w-of-m', name: 'Palabras De Mormon', chapters_count: 1, chapters: []},
                    // {slug: 'mosiah', name: 'Mosíah', chapters_count: 29, chapters: []},
                    // {slug: 'alma', name: 'Alma', chapters_count: 63, chapters: []},
                    // {slug: 'hel', name: 'Helamán', chapters_count: 16, chapters: []},
                    // {slug: '3-ne', name: 'Nefi 3', chapters_count: 30, chapters: []},
                    // {slug: '4-ne', name: 'Nefi 4', chapters_count: 1, chapters: []},
                    // {slug: 'morm', name: 'Mormón', chapters_count: 9, chapters: []},
                    // {slug: 'ether', name: 'Éter', chapters_count: 15, chapters: []},
                    // {slug: 'moro', name: 'Moroni', chapters_count: 10, chapters: []}
                ]
            },
        }
    },
    methods: {
        async get_book_or_mormon() {
            try {
                this.libro_de_mormon_info.books.forEach(async (book) => {
                    for (let chapter = 1; chapter <= book.chapters_count; chapter++) {
                        var url = 'https://www.churchofjesuschrist.org/study/scriptures/bofm/' + book.slug + '/' + chapter + '?lang=spa'
                        const response = await axios.get(url);
                        const $ = load(response.data);
                        var verses = $('.verse');
                        // console.log(verses)
                        var chapter_json = {}
                        chapter_json['verses'] = []
                        chapter_json['chapter'] = chapter
                        chapter_json['reference'] = book.name + ' ' + chapter
                        for (let verse_index = 0; verse_index < verses.length; verse_index++) {
                            var verse_json = {}
                            verse_json['verse'] = verse_index + 1
                            var verse_text = ''
                            verses[verse_index].children.forEach(child => {
                                if (child.type == "text") {
                                    verse_text = verse_text + child.data
                                }
                                if (child.type == "tag" && child.attribs.class == "study-note-ref") {
                                    child.children.forEach(verse_child => {
                                        if (verse_child.type == "text") {
                                            verse_text = verse_text + verse_child.data
                                        }
                                    })
                                }
                            })
                            verse_json['text'] = verse_text
                            verse_json['reference'] = book.name + ' ' + chapter + ':' + (verse_index + 1)
                            chapter_json['verses'].push(verse_json)
                        }
                        book.chapters.push(chapter_json)
                    }
                });
            } catch (error) {
                console.log('hello');
            }
        },
        async translate_from_spain_to_latin_american() {
            try {
                this.libro_de_mormon_info.books.forEach(async (book) => {
                    book.chapters.forEach(chapter => {
                        chapter.verses.forEach(verse => {
                            this.currently_translating = book.name + ' ' + chapter.chapter + ' ' + verse.verse
                            var words = verse.text.match(/[\wáéíóúÁÉÍÓÚñÑ]+|\s+|[^\s\w]+/g)
                            for (let i = 0; i < words.length; i++ ) {
                                if (words[i] == ' ') {
                                    words[i]
                                } else if (words[i] == 'vosotros' || words[i] == 'vosotras') {
                                    words[i] = 'ustedes'
                                } else if (words[i] == 'vuestro' || words[i] == 'vuestra') {
                                    words[i] = 'su'
                                } else if (words[i] == 'vuestros' || words[i] == 'vuestras') {
                                    words[i] = 'sus'
                                } else if (words[i] == 'os') {
                                    words[i] = 'les'
                                } else {
                                    words[i]
                                    // var selected_class = 'h6gfJJSO'
                                    
                                }
                            }
                        })
                    })
                    this.currently_translating = 'done'
                })
            } catch (error) {
                console.log('hello');
            }
        },
        async test_conjugator() {
            // const response = await axios.get('https://www.spanishdict.com/conjugate/' + this.current_word)
            const response = await axios.get('https://conjugator.reverso.net/conjugation-spanish-verb-' + this.current_word + '.html')
            if (response.request.responseURL.includes('conjugate')) {
                const $ = load(response.data);
                var current_div = $('.hglhOver-parent');
                console.log(current_div)
                var subject = current_div[0].children[0].data
                console.log(subject)
            }
            // axios.get('https://www.spanishdict.com/conjugate/' + this.current_word).then(response => {
            //     if (response.request.responseURL.includes('conjugate')) {
            //         console.log('is a verb')
                    
            //     }
            // })
        }
    },
    computed: {
        how_many_chapters_complete () {
            var total_chapters = 0
            var chapters_complete = 0
            this.libro_de_mormon_info.books.forEach(book => {
                total_chapters += book.chapters_count
                chapters_complete += book.chapters.length
            })
            return (chapters_complete/total_chapters * 100).toFixed(2) + '%'
        }
    }
}

</script>
<style>
</style>
