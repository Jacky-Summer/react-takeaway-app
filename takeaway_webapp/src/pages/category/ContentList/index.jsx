import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ListItem from 'component/ListItem'
import ScrollView from 'component/ScrollView'
import { getListData } from '../actions/contentListAction'
import './ContentList.scss'

const Category = props => {
  useEffect(() => {
    props.getListData()
  }, [])

  const onLoadPage = () => {
    if (props.page <= 3) {
      props.getListData()
    }
  }

  return (
    <div className='list-content'>
      <ScrollView isEnd={props.isEnd} loadCallback={() => onLoadPage()}>
        {props.list.map((item, index) => {
          return <ListItem key={index} itemData={item}></ListItem>
        })}
      </ScrollView>
    </div>
  )
}

export default connect(
  state => ({
    list: state.contentList.list,
    isEnd: state.contentList.isEnd,
    page: state.contentList.page,
  }),
  disaptch => ({
    getListData: () => disaptch(getListData({})),
  })
)(Category)
