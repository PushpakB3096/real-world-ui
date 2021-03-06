import { createStore } from "vuex";
import users from "./modules/users";
import articles from "./modules/articles";
import profiles from "./modules/profiles";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    articles,
    profiles
  },
});
