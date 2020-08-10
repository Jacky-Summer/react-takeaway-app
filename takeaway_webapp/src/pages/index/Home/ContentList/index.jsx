import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ListItem from 'component/ListItem'
import ScrollView from 'component/ScrollView'
import { getListData } from '../../actions/contentListAction'
import './ContentList.scss'

const Category = ({ list, getListData }) => {
  let page = 0
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    getListData()
  }, [])

  const onLoadPage = () => {
    page++
    if (page <= 3) {
      getListData(page)
    } else {
      setIsEnd(true)
    }
  }

  return (
    <div className='list-content'>
      <h4 className='list-title'>
        <span className='title-line'></span>
        <span>附近商家</span>
        <span className='title-line'></span>
      </h4>
      <ScrollView isEnd={isEnd} loadCallback={onLoadPage}>
        {list.map((item, index) => {
          return <ListItem key={index} itemData={item}></ListItem>
        })}
      </ScrollView>
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
