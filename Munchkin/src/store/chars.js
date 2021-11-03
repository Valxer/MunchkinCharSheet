const state = {
    chars: []
}

const mutations = {
    addChar(state, payload) {
        let newId = 0
        for (let i=0; i<state.chars.length; i++) {
            newId =  state.chars[i].id + 1
        }
        payload.id = newId
        console.log('payload : ', payload)
        state.chars.push(payload);
    },
    charDel(state, payload) {
        let position
        for (let i=0; i<state.chars.length; i++) {
            if (state.chars[i].id == payload) {
                position = i
            }
        }
        state.chars.splice(position, 1)
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
    charDel({commit}, payload) {
        console.log('resetting char store')
        commit('charDel', payload)
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
