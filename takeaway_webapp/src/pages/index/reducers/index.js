import { combineReducers } from 'redux'
import tabReducer from './tabReducer'
import categoryReducer from './categoryReducer'
import contentListReducer from './contentListReducer'

const reducers = combineReducers({
  tab: tabReducer,
  category: categoryReducer,
  contentList: contentListReducer,
})

export default reducers
