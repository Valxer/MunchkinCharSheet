const state = {
    chars: []
}

const mutations = {
    addChar(state, payload) {
        state.chars.push(payload);
    },
    clearState(state) {
        while (state.chars.length) {
            state.chars.pop()
        }
    }
}

const actions = {
    addChar({commit}, payload) {
        console.log('adding char')
        commit('addChar', payload)
    },
    clearState({commit}) {
        console.log('resetting char store')
        commit('clearState')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
