import axios from 'axios'

export const state = {
  accessToken: '',
  serviceUrl: 'https://r2.smarthealthit.org',
  clientId: 'smart-1137192',
  response: '',
  endpoints: {
    test: 'https://r2.smarthealthit.org',
  },
}

export const mutations = {
  SET_CLIENT_ID(state, newValue) {
    state.clientId = newValue
  },
  SET_SERVICE_URL(state, newValue) {
    state.serviceUrl = newValue
  },
  SET_RESPONSE(state, newValue) {
    state.response = newValue
  },
}

export const getters = {}

export const actions = {
  testCall({ state, commit }) {
    axios.defaults.baseURL = state.serviceUrl
    axios
      .get('/patient/' + state.clientId, {
        headers: {
          Authorization: `Bearer ${state.access_token}`,
        },
      })
      .then((response) => {
        commit('SET_RESPONSE', response)
      })
      .catch((error) => {
        commit('SET_RESPONSE', error)
      })
  },
}
