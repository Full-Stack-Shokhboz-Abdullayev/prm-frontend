export const state = () => ({
  projects: []
});
export const getters = {
  GET_PROJECT_BY_ID: state => id => state.projects.find(i => i.id == id)
};

export const mutations = {
  SET_PROJECTS(state, payload) {
    state.projects = payload;
  },
  DELETE_PROJECT(state, payload) {
    state.projects = state.projects.filter(p => p.id !== payload);
  },
  UPDATE_PROJECT(state, { id, data }) {
    const index = state.projects.findIndex(p => p.id === id);
    state.projects[index] = data;
  }
};

export const actions = {
  async GET_PROJECTS({ commit }) {
    const {
      data: { data: projects }
    } = await this.$axios.get("/projects");
    commit("SET_PROJECTS", projects);
  },
  async ADD_PROJECT({ dispatch }, payload) {
    let res;
    try {
      const {
        data: { success }
      } = await this.$protectedAxios.post("/projects", payload);
      if (success) {
        const promises = [
          dispatch("GET_PROJECTS"),
          dispatch("modules/cities.store/GET_CITIES", {}, { root: true })
        ];

        await Promise.all(promises);
      }
      res = success;
    } catch (err) {
      res = false;
    }
    return res;
  },
  async UPDATE_PROJECT({ dispatch }, { id, data: paramData, isCityChanged }) {
    let res = true;
    try {
      console.log(paramData.cancelled);
      const {
        data: { success }
      } = await this.$protectedAxios.patch("/projects/" + id, paramData);
      if (success) {
        const promises = [dispatch("GET_PROJECTS")];
        if (isCityChanged) {
          promises.push(
            dispatch("modules/cities.store/GET_CITIES", {}, { root: true })
          );
        }
        await Promise.all(promises);
      }
    } catch (err) {
      res = false;
    }
    return res;
  },
  async DELETE_PROJECT({ commit }, payload) {
    const {
      data: { success }
    } = await this.$protectedAxios.delete("/projects/" + payload);
    if (success) {
      commit("DELETE_PROJECT", payload);
    }
  }
};
