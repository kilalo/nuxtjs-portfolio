export const state = () => ({
    loader: true
  })
  
  export const mutations = {
    'SWITCH' (state) {
      state.loader = !state.loader
    }
  }

  export const actions = {
    async 'LOADER' ({ commit }) {
        commit('SWITCH')
    }
  }