const state = {
    chars: []
}

const mutations = {
    addChar(state, payload) {
        state.chars.push(payload);
    }
}

const actions = {
    setId({commit}, payload) {
        console.log('adding char')
        commit('addchar', payload)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
