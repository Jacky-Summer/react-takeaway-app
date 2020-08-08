import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ListItem from 'component/ListItem'
import { getListData } from '../../actions/contentListAction'
import './ContentList.scss'

const Category = ({ list, getListData }) => {
  useEffect(() => {
    getListData()
  }, [])

  return (
    <div className='list-content'>
      <h4 className='list-title'>
        <span className='title-line'></span>
        <span>附近商家</span>
        <span className='title-line'></span>
      </h4>
      {list.map((item, index) => {
        return <ListItem key={index} itemData={item}></ListItem>
      })}
    </div>
  )
}

export default connect(
  state => ({
    list: state.contentList.list,
  }),
  disaptch => ({
    getListData: () => disaptch(getListData()),
  })
)(Category)
