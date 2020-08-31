import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  count: 0
}

const userInitialState = {
  name: 'albert'
}

const update = {
  type: 'UPDATE',
  name: 'updated name'
}

export const add = (num) => {
  return {
    type: 'ADD',
    num
  }
}

const addAsync = (num) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add(num))
    }, 10000)
  }
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD': 
      return { count: state.count + action.num }
    default: 
      return state
  }
}

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        name: action.name
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  counter: counterReducer,
  user: userReducer
})


export default function initializeStore(state) {
  const store = createStore(
    reducer,
    Object.assign(
      {},
      {
        counter: initialState,
        user: userInitialState
      },
      state
    ),
    composeWithDevTools(applyMiddleware(thunk)))
  return store
}