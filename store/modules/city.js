const state = () => ({
  citys: ""
});

const mutations = {
  setCity(state, val) {
    state.citys = val;
  }
};

const actions = {
  setCity({ commit }, city) {
    commit("setCity", city);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

