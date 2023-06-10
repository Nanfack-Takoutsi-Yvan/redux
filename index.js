
const redux = require('redux');
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const ODER_CAKE = "ODER_CAKE"
const RESTOCK_CAKE = "RESTOCK_CAKE"
const ORDER_ICE_CREAM = "ORDER_ICE_CREAM"
const RESTOCK_ICE_CREAM = "RESTOCK_ICE_CREAM"

function orderCake(qty = 1) {
  return {
    type: ODER_CAKE,
    payload: qty
  }
}

function restockCakes(qty = 1) {
  return {
    type: RESTOCK_CAKE,
    payload: qty
  }
}

function orderIceCream(qty = 1) {
  return {
    type: ORDER_ICE_CREAM,
    payload: qty
  }
}

function restockIceCream(qty = 1) {
  return {
    type: RESTOCK_ICE_CREAM,
    payload: qty
  }
}

const initialCakeState = {
  numberOfCakes: 10
}

const initialIceCreamState = {
  numberOfIceCreams: 20
}

function cakeReducer(state = initialCakeState, action ) {
  switch(action.type){
    case ODER_CAKE: 
      return {
        ...state, 
        numberOfCakes: state.numberOfCakes - action.payload
      }
    case RESTOCK_CAKE: 
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload
      }
    default: 
      return state
  }
}

function iceCreamReducer(state = initialIceCreamState, action ) {
  switch(action.type){
    case ORDER_ICE_CREAM: 
      return {
        ...state, 
        numberOfCakes: state.numberOfCakes - action.payload
      }
    case RESTOCK_ICE_CREAM: 
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload
      }
    default: 
      return state
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

const store = redux.createStore(rootReducer)

console.group("View changes in the state")
console.log("initial state", store.getState())

const actions = bindActionCreators({ orderCake, restockCakes }, store.dispatch)

const unsubscribe = store.subscribe(() => console.log("The state changed to", store.getState()))

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCakes(4)

console.groupEnd()

unsubscribe()