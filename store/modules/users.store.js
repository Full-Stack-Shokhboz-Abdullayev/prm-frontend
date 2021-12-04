export const state = () => ({
  users: [],
  errors: []
});

const ifAdmin = async (rootState, callback) => {
  if (rootState.modules["auth.store"].user.role === "admin") {
    return await callback();
  }
};

export const getters = {
  MODERATORS(state) {
    return state.users.filter(user => user.role === "moderator");
  },
  ADMINS(state) {
    return state.users.filter(user => user.role === "admin");
  },
  GET_USER_BY_ID: state => id => state.users.find(user => user.id === id)
};
export const mutations = {
  DELETE_USER(state, payload) {
    state.users = state.users.filter(u => u.id !== payload);
  },
  SET_USERS(state, payload) {
    state.users = payload;
  }
};

export const actions = {
  async GET_USERS({ commit }) {
    const {
      data: { data: users }
    } = await this.$axios.get("/users");
    commit("SET_USERS", users);
  },
  async ADD_USER({ rootState, dispatch }, payload) {
    return await ifAdmin(rootState, async () => {
      let res;
      try {
        const {
          data: { success }
        } = await this.$protectedAxios.post("/users", payload);
        if (success) {
          const promises = [
            dispatch("GET_USERS"),
            dispatch("modules/cities.store/GET_CITIES", {}, { root: true })
          ];

          await Promise.all(promises);
        }

        res = success;
      } catch (err) {
        res = false;
      }
      return res;
    });
  },
  async UPDATE_USER(
    { dispatch, rootState },
    { id, data: paramData, isCityChanged }
  ) {
    return await ifAdmin(rootState, async () => {
      let res = true;
      try {
        const {
          data: { success }
        } = await this.$protectedAxios.patch("/users/" + id, paramData);
        if (success) {
          const promises = [dispatch("GET_USERS")];
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
    });
  },
  async DELETE_USER({ commit, rootState }, payload) {
    return await ifAdmin(rootState, async () => {
      const {
        data: { success }
      } = await this.$protectedAxios.delete("/users/" + payload);
      if (success) {
        commit("DELETE_USER", payload);
      }
    });
  }
};
