import { createStore } from "vuex";
import users from "./modules/users";
import articles from "./modules/articles";
import tags from "./modules/tags";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    articles,
    tags,
  },
});
