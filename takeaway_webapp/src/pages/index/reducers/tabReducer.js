import { CHANGE_TAB } from '../actions/actionTypes'
import { TABKEY } from '../config'
const initState = {
  tabs: [
    {
      key: TABKEY.home,
      name: '首页',
    },
    {
      key: TABKEY.order,
      name: '订单',
    },
    {
      key: TABKEY.my,
      name: '我的',
    },
  ],
  activeKey: TABKEY.order,
}

const tabReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return { ...state, activeKey: action.payload }
    default:
      return state
  }
}

export default tabReducer
