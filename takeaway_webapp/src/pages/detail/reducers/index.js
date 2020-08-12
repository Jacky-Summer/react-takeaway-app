import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import tabReducer from './tabReducer'

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    tab: tabReducer,
  })

export default reducers
