import { combineReducers } from 'redux'
import headerReducer from './headerReducer'
import contentListReducer from './contentListReducer'

const reducers = combineReducers({
  header: headerReducer,
  contentList: contentListReducer
})

export default reducers
