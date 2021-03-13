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
    setArticleInList(state, data) {
      state.feed = state.feed.map((article) => {
        /* we are only concerned with updating the article on which the favourtie button was clicked.
        Returning the article as is, if that is the case.
        */
        if (article.slug !== data.slug) {
          return article;
        }

        // when we encounter the article on which the favourite icon was clicked, we are updating the favourating info and returning
        article.favorited = data.favorited;
        article.favoritesCount = data.favoritesCount;
        return article;
      });
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

      // constructing route based on payload
      if (payload) {
        const { page = 1 } = payload;

        route += page ? `?offset=${(page - 1) * 10}&limit=10` : "";
      }
      const response = await API.get(route);
      commit("setArticles", response.data);
    },

    async createArticle(
      state,
      { title, description, body, tagList = ["test"] }
    ) {
      if (!title) {
        throw new Error("Title cannot be empty");
      }
      if (!description) {
        throw new Error("Description cannot be empty");
      }
      if (!body) {
        throw new Error("Body cannot be empty");
      }

      let route = "articles";
      const response = await API.post(route, {
        article: {
          title,
          description,
          body,
          tagList,
        },
      });

      // if a post is created successfully then it is returned
      if (response.data.article) {
        return response.data.article;
      }
    },
    async favouriteArticle({ commit }, { slug }) {
      let route = "/articles/";

      if (slug) {
        route += `${slug}/favorite`;
      }

      const response = await API.post(route);

      if (response.data) {
        // on success, updating the favourite info about the article in our home page feeds
        commit("setArticleInList", response.data.article);
      }
    },
  },
  getters: {
    // feed is added in getters so that dynamic behaviour is achieved in case the feed information changes.
    feed(state) {
      return state.feed || [];
    },
  },
};
