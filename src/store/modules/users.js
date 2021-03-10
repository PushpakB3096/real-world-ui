import { API, setToken, clearToken } from "../api";

export default {
  namespaced: true,
  state: {
    // 'user 'will hold the current logged in user
    user: null,
    // 'profile' will hold the user whose profile I am looking at
    profile: null,
  },
  getters: {
    user(state) {
      return state.user || null;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setProfile(state, { profile }) {
      state.profile = profile;
    },
  },
  actions: {
    getUser: async function({ commit }) {
      const user = await API.get("/user");
      commit("setUser", user);
    },
    loginUser: async function({ commit }, { email, password }) {
      // clearing out any existing jwt tokens, if any
      clearToken();
      try {
        const response = await API.post("/users/login", {
          user: {
            email,
            password,
          },
        });

        if (response.data.user) {
          // gets the jwt token from the response and stores it in the auth header
          const token = response.data.user.token;
          setToken(token);
          // setting the logged in user as the current user
          commit("setUser", response.data.user);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    getProfile: async function({ commit }, { username }) {
      const profile = await API.get(`/profiles/${username}`);
      commit("setProfile", profile.data);
    },
  },
};
