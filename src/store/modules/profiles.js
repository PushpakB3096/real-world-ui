import { API } from "../api";

export default {
  namespaced: true,
  state: {
    profile: null,
  },
  getters: {},
  mutations: {
    setProfile(state, { profile }) {
      state.profile = profile;
    },
  },
  actions: {
    getProfile: async function({ commit }, { username }) {
      const profile = await API.get(`/profiles/${username}`);
      commit("setProfile", profile.data);
    },
  },
};
