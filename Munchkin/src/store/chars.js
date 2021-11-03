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
        state.chars.push(payload);
    },
    racesEd(state, payload) {
        for (let i=0; i<state.chars.length; i++) {
            if (state.chars[i].id == payload.id) {
                state.chars[i].race = payload.race
                state.chars[i].race2 = payload.race2
                break
            }
        }
    },
    jobsEd(state, payload) {
        for (let i=0; i<state.chars.length; i++) {
            if (state.chars[i].id == payload.id) {
                state.chars[i].job = payload.job
                state.chars[i].job2 = payload.job2
                break
            }
        }
    },
    addLvl(state, payload) {
        for (let i=0; i<state.chars.length; i++) {
            if (state.chars[i].id == payload) {
                state.chars[i].lvl++
                break
            }
        }
    },
    subLvl(state, payload) {
        for (let i=0; i<state.chars.length; i++) {
            if (state.chars[i].id == payload) {
                if(state.chars[i].lvl > 1)
                    state.chars[i].lvl--
                break
            }
        }
    },
    addBonus(state, payload) {
        for (let i=0; i<state.chars.length; i++) {
            if (state.chars[i].id == payload) {
                state.chars[i].bonus++
                break
            }
        }
    },
    subBonus(state, payload) {
        for (let i=0; i<state.chars.length; i++) {
            if (state.chars[i].id == payload) {
                if(state.chars[i].bonus > 0)
                    state.chars[i].bonus--
                break
            }
        }
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
        // console.log('adding char')
        commit('addChar', payload)
    },
    racesEd({commit}, payload) {
        // console.log('edit races')
        commit('racesEd', payload)
    },
    jobsEd({commit}, payload) {
        // console.log('edit jobs')
        commit('jobsEd', payload)
    },
    addLvl({commit}, payload) {
        // console.log('adding a lvl')
        commit('addLvl', payload)
    },
    subLvl({commit}, payload) {
        // console.log('subbing a lvl')
        commit('subLvl', payload)
    },
    addBonus({commit}, payload) {
        // console.log('adding a bonus point')
        commit('addBonus', payload)
    },
    subBonus({commit}, payload) {
        // console.log('subbing a bonus point')
        commit('subBonus', payload)
    },
    charDel({commit}, payload) {
        // console.log('deleting a char')
        commit('charDel', payload)
    },
    clearState({commit}) {
        // console.log('deleting all chars')
        commit('clearState')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
