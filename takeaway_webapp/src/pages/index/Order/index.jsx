import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import ScrollView from 'component/ScrollView'
import { getOrderData } from '../actions/orderAction'
import './Order.scss'

const Order = ({ list, getOrderData }) => {
  let page = 0
  const [isEnd, setIsEnd] = useState(false)
  useEffect(() => {
    getOrderData()
  }, [])

  const onLoadPage = () => {
    page++
    if (page <= 3) {
      getOrderData(page)
    } else {
      setIsEnd(true)
    }
  }

  return (
    <div className='order'>
      <div className='header'>订单</div>
      <ScrollView loadCallback={onLoadPage} isEnd={isEnd}>
        <div className='order-list'>
          {list.map((item, index) => {
            return <ListItem itemData={item} key={index}></ListItem>
          })}
        </div>
      </ScrollView>
    </div>
  )
}

export default connect(
  state => ({
    list: state.order.list,
  }),
  disaptch => ({
    getOrderData: () => disaptch(getOrderData()),
  })
)(Order)
