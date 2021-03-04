import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: "/editor",
    name: "editor_new",
    component: () =>
      import(/* webpackChunkName: "article-add" */ "../views/ArticleAdd.vue")
  },
  {
    path: "/editor/:articleSlug",
    name: "editor_edit",
    component: () =>
      import(/* webpackChunkName: "article-edit" */ "../views/ArticleEdit.vue")
  },
  {
    path: "/article/:articleSlug",
    name: "article",
    component: () =>
      import(/* webpackChunkName: "article" */ "../views/ArticleView.vue")
  },
  {
    path: "/:username",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
