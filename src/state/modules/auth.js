import axios from 'axios'

export const state = {
  clientId: '',
  secret: '',
  accessToken: 'foo',
  serviceUrl: 'https://r2.smarthealthit.org',
  patientId: 'smart-1137192',
  response: '',
  endpoints: {
    test: 'https://r2.smarthealthit.org',
  },
}

export const mutations = {
  SET_PATIENT_ID(state, newValue) {
    state.patientId = newValue
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
      .get(`/Observation?category=vital-signs&patient=${state.patientId}`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      })
      .then((response) => {
        commit('SET_RESPONSE', response)
      })
      .catch((error) => {
        commit('SET_RESPONSE', error)
      })
  },
  oauth({ state, commit }) {},
  authorization({ state, commit }) {
    // const authorizeRequest = {
    //   response_type: 'code',
    //   client_id: state.client_id,
    //   redirect_uri: state.redirect_uri,
    //   scope: 'launch/patient patient/*.read',
    //   // "uniqueHash",
    //   aud: "NOADU"
    // }
  },
}
