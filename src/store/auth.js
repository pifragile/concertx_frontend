import auth from '../api/auth'
import session from '../api/session'
import {
  LOGIN_BEGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REMOVE_TOKEN,
  SET_TOKEN,
  SET_USER_ID,
} from './types'

const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY'

const initialState = {
  userId: null,
  authenticating: false,
  error: false,
  token: null,
}

const getters = {
  isAuthenticated: state => !!state.userId,
}

const actions = {
  login({ commit }, { username, password }) {
    commit(LOGIN_BEGIN)
    commit(REMOVE_TOKEN)
    return auth.login(username, password)
      .then(({ data }) => commit(SET_TOKEN, data.key))
      .then(() => commit(LOGIN_SUCCESS))
      .catch(() => commit(LOGIN_FAILURE))
  },
  logout({ commit }) {
    return auth.logout()
      .then(() => commit(LOGOUT))
      .finally(() => commit(REMOVE_TOKEN))
  },
  initialize({ commit }) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (token) {
      commit(SET_TOKEN, token)
    } else {
      commit(REMOVE_TOKEN)
    }
    return auth.getAccountDetails()
      .then(({ data }) => commit(SET_USER_ID, data.pk))
      .catch(() => commit(SET_USER_ID, null))
  },
}

const mutations = {
  [LOGIN_BEGIN](state) {
    state.authenticating = true
    state.error = false
  },
  [LOGIN_FAILURE](state) {
    state.authenticating = false
    state.error = true
  },
  [LOGIN_SUCCESS](state) {
    state.authenticating = false
    state.error = false
  },
  [LOGOUT](state) {
    state.authenticating = false
    state.error = false
  },
  [SET_TOKEN](state, token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
    session.defaults.headers.Authorization = `Token ${token}`
    state.token = token
  },
  [REMOVE_TOKEN](state) {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    delete session.defaults.headers.Authorization
    state.token = null
  },
  [SET_USER_ID](state, userId) {
    state.userId = userId
  },
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
}
