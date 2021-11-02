const state = {
    name: null,
    sex: null,
    race: null,
    race2: null,
    job: null,
    job2: false,
    lvl: 1,
    bonus: 0
}

const mutations = {
    setName(state, name) {
        state.name = name
    },
    setSex(state, sex) {
        state.sex = sex
    },
    setRace(state, race) {
        state.race = race
    },
    setRace2(state, race2) {
        state.race2 = race2
    },
    setJob(state, job) {
        state.job = job
    },
    setJob2(state, job2) {
        state.job2 = job2
    },
    setLvl(state, lvl) {
        state.lvl = lvl
    },
    setBonus(state, bonus) {
        state.bonus = bonus
    }
}

const actions = {
    setName({commit}, name) {
        console.log('setting up name')
        commit('setName', name)
    },
    setSex({commit}, sex) {
        console.log('setting up sex')
        commit('setSex', sex)
    },
    setRace({commit}, race) {
        console.log('setting up race')
        commit('setRace', race)
    },
    setRace2({commit}, race2) {
        console.log('setting up 2nd race')
        commit('setRace2', race2)
    },
    setJob({commit}, job) {
        console.log('setting up job')
        commit('setJob', job)
    },
    setJob2({commit}, job2) {
        console.log('setting up 2nd job')
        commit('setJob2', job2)
    },
    setLvl({commit}, lvl) {
        console.log('setting up lvl')
        commit('setLvl', lvl)
    },
    setBonus({commit}, bonus) {
        console.log('setting up bonus')
        commit('setBonus', bonus)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
