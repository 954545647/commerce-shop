const state = () => ({
  position: {
    city: null,
    // province: null
  }
});

const mutations = {
  setPosition(state, val) {
    // Vue.$set(state.position,'city',val.city)
    // Vue.$set(state.position,'city',val.province)
    // this.$set(state.position,'city',val.city)
    // this.$set(state.position,'province',val.province)
    state.position.city = val.city;
    // state.position.province = val.province;
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





// export default {
//   namespaced: true,
//   state: {
//     position: {}
//   },
//   mutations: {
//     setPosition(state, val) {
//       state.position = val;
//     }
//   },
//   actions: {
//     setPosition({commit},position){
//       commit('setPosition',position)
//     }
//   }
// };
