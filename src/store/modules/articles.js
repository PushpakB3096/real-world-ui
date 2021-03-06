import { API } from "../api";

export default {
  namespaced: true,
  state: {
    feed: [],
    count: 0,
  },
  mutations: {
    setArticles(state, { articles, articleCount }) {
      state.feed = articles;
      state.count = articleCount;
    },
  },
  actions: {
    async getGlobalFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles";

      if (payload) {
        const {
          tag = null,
          author = null,
          favourited = null,
          page = 1,
        } = payload;

        // constructing route based on payload
        route += tag ? `?tag=${tag}&` : "";
        route += author ? `?author=${author}&` : "";
        route += favourited ? `?favorited=${favourited}` : "";
        route += page ? `?offset=${(page - 1) * 10}&limit=10` : "";
      }

      const response = await API.get(route);
      commit("setArticles", response.data);
    },
    async getUserFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles/feed";

      if (payload) {
        const { page = 1 } = payload;

        route += page ? `?offset=${(page - 1) * 10}&limit=10` : "";
      }
      const response = await API.get(route);
      commit("setArticles", response.data);
    },
  },
  getters: {},
};
