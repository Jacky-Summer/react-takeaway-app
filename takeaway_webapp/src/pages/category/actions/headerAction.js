import { CHANGE_TAB, GET_FILTER_DATA } from './actionTypes'
import axios from 'axios'

export const changeTab = payload => {
  return {
    type: CHANGE_TAB,
    payload,
  }
}

export const getFilterData = () => async dispatch => {
  let resp = await axios({
    url: './json/filter.json',
    method: 'get',
  })

  dispatch({
    type: GET_FILTER_DATA,
    obj: resp.data,
  })
}
