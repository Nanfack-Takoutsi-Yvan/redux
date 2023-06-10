const redux = require('redux')
const axios = require("axios")
const reduxLogger = require("redux-logger")
const thunkMiddleware = require("redux-thunk").default

const createStore = redux.createStore
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware
const bindActionCreators = redux.bindActionCreators

const initialState = {
  loading: false,
  users: [],
  error: null
}

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED"
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED"
const FETCH_USER_FAILED= "FETCH_USER_FAILED"

function fetchUserRequested() {
  return {
    type: FETCH_USER_REQUESTED
  }
}

function fetchUserSucceeded(users) {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users
  }
}

function fetchUserFailed(error) {
  return {
    type: FETCH_USER_FAILED,
    payload: error
  }
}

function fetchUser() {
  return function (dispatch) {
    dispatch(fetchUserRequested())

    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        const payload = res.data
        dispatch(fetchUserSucceeded(payload))
      })
      .catch(error => {
        dispatch(fetchUserFailed(error))
      })
  }
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case FETCH_USER_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: null
      }
    case FETCH_USER_FAILED: 
      return {
        loading: false,
        users: [],
        error: action.payload
      }
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))
const actions = bindActionCreators({
  fetchUser
}, store.dispatch)

actions.fetchUser()