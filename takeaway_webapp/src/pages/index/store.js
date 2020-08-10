import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import reducers from './reducers'

// 创建基于hash的history
export const history = createHashHistory()

// 创建初始化tab
history.replace('home')

// 创建history的Middleware
const historyMiddleware = routerMiddleware(history)

const store = createStore(reducers(history), applyMiddleware(thunk, historyMiddleware))

if (module.hot) {
  module.hot.accept('./reducers/index', () => {
    const nextRootReducer = require('./reducers/index.js').default
    store.replaceReducer(nextRootReducer)
  })
}
export default store
