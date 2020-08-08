import { CHANGE_TAB } from './actionTypes'

export const changeTab = payload => {
  return {
    type: CHANGE_TAB,
    payload,
  }
}
