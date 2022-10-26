import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { load } from 'cheerio'
import axios from 'axios'

const BOM = createApp(App)
BOM.use(router)

BOM.mount('#app')

// libro_de_mormon_json = {}
const libro_de_mormon_info = {
    books: [
        {slug: '1-ne', name: 'Nefi 1', chapters_count: 22, chapters: []},
        {slug: '2-ne', name: 'Nefi 2', chapters_count: 33, chapters: []},
        {slug: 'jacob', name: 'Jacob', chapters_count: 7, chapters: []},
        {slug: 'enos', name: 'Enós', chapters_count: 1, chapters: []},
        {slug: 'jarom', name: 'Jarom', chapters_count: 1, chapters: []},
        {slug: 'omni', name: 'Omni', chapters_count: 1, chapters: []},
        {slug: 'w-of-m', name: 'Palabras De Mormon', chapters_count: 1, chapters: []},
        {slug: 'mosiah', name: 'Mosíah', chapters_count: 29, chapters: []},
        {slug: 'alma', name: 'Alma', chapters_count: 63, chapters: []},
        {slug: 'hel', name: 'Helamán', chapters_count: 16, chapters: []},
        {slug: '3-ne', name: 'Nefi 3', chapters_count: 30, chapters: []},
        {slug: '4-ne', name: 'Nefi 4', chapters_count: 1, chapters: []},
        {slug: 'morm', name: 'Mormón', chapters_count: 9, chapters: []},
        {slug: 'ether', name: 'Éter', chapters_count: 15, chapters: []},
        {slug: 'moro', name: 'Moroni', chapters_count: 10, chapters: []}
    ]
}

// var url = 'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/1?lang=eng'
var cheerio_function = async () => {
    try {
        libro_de_mormon_info.books.forEach(async (book) => {
            for (let chapter = 1; chapter <= book.chapters_count; chapter++) {
                var url = 'https://www.churchofjesuschrist.org/study/scriptures/bofm/' + book.slug + '/' + chapter + '?lang=eng'
                const response = await axios.get(url);
                const $ = load(response.data);
                var verses = $('.verse');
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
                    })
                    verse_json['text'] = verse_text
                    verse_json['reference'] = book.name + ' ' + chapter + ':' + (verse_index + 1)
                    chapter_json['verses'].push(verse_json)
                }
                book.chapters.push(chapter_json)
            }
        });
        console.log(libro_de_mormon_info)
    
    //     const response = await axios.get(url);
    //     const $ = load(response.data);

    //     console.log($('.verse'));
    } catch (error) {
        console.log('hello');
    }
}
cheerio_function
// cheerio_function();

