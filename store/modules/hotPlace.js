const state = () => ({
  hotName: {}
});

const mutations = {
  setHotName(state,val){
    state.hotName = val
  }
}

const actions = {
  setHotName({commit},name){
    commit('setHotName',name)
  }
}

export default  {
  namespaced: true,
  state,
  mutations,
  actions
}
