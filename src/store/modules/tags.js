import { API } from "../api";

export default {
  namespaced: true,
  state: {
    allTags: [],
  },
  getters: {
    tags(state) {
      return state.allTags || [];
    },
  },
  mutations: {
    setTags(state, payload) {
      state.allTags = payload;
    },
  },
  actions: {
    async getTags({ commit }) {
      let route = "/tags";

      const response = await API.get(route);
      commit("setTags", response.data.tags);
    },
  },
};
