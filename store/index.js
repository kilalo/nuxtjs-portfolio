export const state = () => ({
    loader: false
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
