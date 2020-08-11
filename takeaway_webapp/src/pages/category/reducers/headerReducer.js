import { TABKEY } from '../config'
import { CHANGE_TAB, GET_FILTER_DATA, CHANGE_FILTER } from '../actions/actionTypes'

let tabs = {}

tabs[TABKEY.cate] = {
  key: TABKEY.cate,
  text: '全部分类',
  obj: {},
}

tabs[TABKEY.type] = {
  key: TABKEY.type,
  text: '综合排序',
  obj: {},
}

tabs[TABKEY.filter] = {
  key: TABKEY.filter,
  text: '筛选',
  obj: {},
}

const initState = {
  tabs: tabs,
  activeKey: TABKEY.cate,
  filterData: {},
}

const changeFilter = (state, action) => {
  let _tabs = JSON.parse(JSON.stringify(state.tabs))
  _tabs[action.obj.key] = {
    key: action.obj.key,
    text: action.obj.item.name,
    obj: action.obj.item,
  }
  return { ...state, tabs: _tabs }
}

const headerReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return { ...state, activeKey: action.payload }
    case GET_FILTER_DATA:
      return { ...state, filterData: action.obj.data }
    case CHANGE_FILTER:
      return changeFilter(state, action)
    default:
      return state
  }
}

export default headerReducer
