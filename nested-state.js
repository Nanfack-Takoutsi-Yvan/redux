const redux = require('redux');
const produce = require("immer").produce
const bindActionCreators = redux.bindActionCreators

const initialState = {
  name: "Yvan Nanfack",
  address: {
    street: "Simbock",
    city: "Yaounde",
    state: "Cameroon"
  }
}

const UPDATE_ADDRESS = "UPDATE_ADDRESS"

function updateAddress(address) {
  return {
    type: UPDATE_ADDRESS,
    payload: address
  }
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_ADDRESS: 
      return produce(state, (draft) => { draft.address.street = action.payload })
    default: 
      return state
  }
}

const store = redux.createStore(reducer)
const actions = bindActionCreators({ updateAddress }, store.dispatch)

console.group("View state changes")
console.log("initial state", store.getState())

const unsubscribe = store.subscribe(() => console.log("the state changed to", store.getState()))

actions.updateAddress("entrée Simbock")

console.groupEnd()

unsubscribe()