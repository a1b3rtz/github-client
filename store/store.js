import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

const userInitialState = {}

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {}
    default:
      return state
  }
}

const reducer = combineReducers({
  user: userReducer
})

// action types
const LOGOUT = 'LOGOUT'

// action creators
export const logout = () => {
  return dispatch => {
    axios.post('/logout')
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: LOGOUT
          })
        } else {
          console.log('logout failed', res)
        }
      }).catch(err => console.log('logout failed err', err))
  }
}

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