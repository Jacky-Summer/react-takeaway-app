import { combineReducers } from 'redux'
import headerReducer from './headerReducer'

const reducers = combineReducers({
  header: headerReducer,
})

export default reducers
