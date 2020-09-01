import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const userInitialState = {}

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
  user: userReducer
})

export default function initializeStore(state) {
  const store = createStore(
    reducer,
    Object.assign(
      {},
      {
        user: userInitialState
      },
      state
    ),
    composeWithDevTools(applyMiddleware(thunk)))
  return store
}