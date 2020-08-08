import { HEAD_DATA } from '../actions/actionTypes'

const initState = {
  items: [],
}

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case HEAD_DATA:
      return {
        ...state,
        items: action.obj.primary_filter,
      }
    default:
      return state
  }
}

export default categoryReducer
