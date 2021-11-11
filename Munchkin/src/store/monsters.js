const state = {
    monsters: []
}

const mutations = {
    addMonster(state, payload) {
        let newId = 0
        for (let i=0; i<state.monsters.length; i++) {
            newId =  state.monsters[i].id + 1
        }
        payload.id = newId
        state.monsters.push(payload)
    },
    deleteMonster(state, payload) {
        let position
        for (let i=0; i<state.chars.length; i++) {
            if (state.chars[i].id == payload) {
                position = i
            }
        }
        state.chars.splice(position, 1)
    },
    clearMonsters(state) {
        while (state.monsters.length) {
            state.monsters.pop()
        }
    }
}

const actions = {
    addMonster({commit}, payload) {
        // console.log('adding char')
        commit('addMonster', payload)
    },
    deleteMonster({commit}, payload) {
        // console.log('adding char')
        commit('deleteMonster', payload)
    },
    clearMonsters({commit}, payload) {
        // console.log('adding char')
        commit('clearMonsters', payload)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
