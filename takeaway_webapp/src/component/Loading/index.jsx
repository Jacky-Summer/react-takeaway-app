import React from 'react'
import './Loading.scss'

const Loading = ({ isEnd }) => {
  let str = '加载中'
  if (isEnd) {
    str = '已完成'
  }
  return <div className='loading'>{str}</div>
}

export default Loading
