
const redux = require('redux');
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const reduxLogger = require("redux-logger")
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware

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
        numberOfIceCreams: state.numberOfIceCreams - action.payload
      }
    case RESTOCK_ICE_CREAM: 
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams + action.payload
      }
    default: 
      return state
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

const store = redux.createStore(rootReducer, applyMiddleware(logger))

const actions = bindActionCreators({ orderCake, restockCakes, orderIceCream, restockIceCream }, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCakes(4)

actions.orderIceCream()
actions.restockIceCream(3)
