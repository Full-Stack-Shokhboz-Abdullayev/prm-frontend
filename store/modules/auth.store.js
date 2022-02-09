import { persistTokens } from "../../utils/tokens.util";

export const state = () => ({
  user: {},
  errors: [],
  profileErrors: []
});

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_ERRORS(state, payload) {
    console.log("mutation", payload);
    if (Array.isArray(payload)) {
      state.errors = payload;
    } else {
      if (!state.errors.some(error => error === payload)) {
        state.errors.push(payload);
      }
    }
    console.log(state.errors);
  },
  SET_PROFILE_ERRORS(state, payload) {
    console.log("mutation", payload);
    if (Array.isArray(payload)) {
      state.profileErrors = payload;
    } else {
      if (!state.profileErrors.some(error => error === payload)) {
        state.profileErrors.push(payload);
      }
    }
    console.log(state.profileErrors);
  }
};

export const actions = {
  async LOGIN({ dispatch, commit }, payload) {
    console.log("login");
    try {
      const {
        data: { data: tokensData }
      } = await this.$axios.post("/auth/login", payload);

      persistTokens(tokensData);

      await dispatch("GET_USER_DATA");
      this.$router.push("/");
    } catch (err) {
      commit("SET_ERRORS", err.response.data.message);
    }
  },
  async LOGOUT({ state, commit }) {
    await this.$axios.post("auth/logout", {
      id: state.user.id
    });
    localStorage.clear();
    commit("SET_USER", {});
    this.$router.push({ name: "base-login" });
  },
  async GET_USER_DATA({ commit }) {
    try {
      const {
        data: { data: user }
      } = await this.$protectedAxios.get("/user-profile");
      commit("SET_USER", user);
    } catch {
      commit("SET_USER", {});
    }
  },
  async UPDATE_USER({ commit }, payload) {
    let res = true;
    try {
      const {
        data: { success, data: user },
      } = await this.$protectedAxios.patch("/user-profile", payload);
      commit("SET_USER", user);
      res = success
    } catch {
      commit("SET_PROFILE_ERRORS", err.response.data.message);
      res = false
    }
    console.log('Res', res);
    return res
  },
  async DELETE_USER({ commit }) {
    const {data: {success}} = await this.$protectedAxios.delete('/user-profile')
    
    if (success) {
      commit("SET_USER", {});
    }

    return success
  
  }
};
