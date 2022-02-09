export const state = () => ({
  cities: []
});

export const getters = {
  GET_CITY_BY_ID: state => id => state.cities.find(i => i.id == id)
};

export const mutations = {
  SET_CITIES(state, payload) {
    state.cities = payload;
  },
  DELETE_CITY(state, payload) {
    state.cities = state.cities.filter(p => p.id !== payload);
  },
  UPDATE_CITY(state, { id, data }) {
    const index = state.cities.findIndex(p => p.id === id);
    state.cities[index] = data;
  }
};

export const actions = {
  async GET_CITIES({ commit }) {
    const {
      data: { data: cities }
    } = await this.$axios.get("/cities");
    commit("SET_CITIES", cities);
  },
  async ADD_CITY({ dispatch }, payload) {
    let res;
    try {
      const {
        data: { success }
      } = await this.$protectedAxios.post("/cities", payload);
      if (success) {
        await dispatch("GET_CITIES");
      }
      res = success;
    } catch (err) {
      res = false;
    }
    return res;
  },
  async UPDATE_CITY({ dispatch }, { id, data: paramData }) {
    let res = true;
    try {
      const {
        data: { success }
      } = await this.$protectedAxios.patch("/cities/" + id, paramData);
      if (success) {
        await dispatch("GET_CITIES");
      }
    } catch (err) {
      res = false;
    }
    return res;
  },
  async DELETE_CITY({ commit }, payload) {
    const {
      data: { success }
    } = await this.$protectedAxios.delete("/cities/" + payload);
    if (success) {
      commit("DELETE_CITY", payload);
    }
  }
};
