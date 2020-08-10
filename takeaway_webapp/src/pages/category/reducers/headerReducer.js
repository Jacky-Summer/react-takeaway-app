import { TABKEY } from '../config'
import { CHANGE_TAB, GET_FILTER_DATA } from '../actions/actionTypes'

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

const headerReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return { ...state, activeKey: action.payload }
    case GET_FILTER_DATA:
      return { ...state, filterData: action.obj.data }
    default:
      return state
  }
}

export default headerReducer
