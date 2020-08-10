import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import tabReducer from './tabReducer'
import categoryReducer from './categoryReducer'
import contentListReducer from './contentListReducer'
import orderReducer from './orderReducer'

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    tab: tabReducer,
    category: categoryReducer,
    contentList: contentListReducer,
    order: orderReducer,
  })

export default reducers
