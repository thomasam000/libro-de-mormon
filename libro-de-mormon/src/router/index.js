import { createRouter, createWebHistory } from "vue-router";
import PageHome from "../components/PageHome.vue";
import PageBook from "../components/PageBook.vue";
import PageChapter from "../components/PageChapter.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: PageHome,
  },
  {
    path: "/library",
    name: "Library",
    component: PageHome,
  },
  {
    path: "/book/:book_name",
    name: "Book",
    component: PageBook,
  },
  {
    path: "/book/:book_name/chapter/:chapter_name",
    name: "Chapter",
    component: PageChapter,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
