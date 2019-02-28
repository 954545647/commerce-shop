const state = () => ({
  position: {
    city: null,
  }
});

const mutations = {
  setPosition(state, val) {
    state.position.city = val.city;
  }
};

const actions = {
  setPosition: ({ commit }, position) => {
    commit("setPosition", position);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

