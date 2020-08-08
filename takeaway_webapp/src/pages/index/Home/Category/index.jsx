import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getHeaderData } from '../../actions/categoryAction'
import './Category.scss'

const Category = ({ items, getHeaderData }) => {
  const goCategory = () => {
    window.location.href = './category.html'
  }

  useEffect(() => {
    getHeaderData()
  }, [])

  return (
    <div className='category-content clearfix'>
      {items.slice(0, 8).map((item, index) => {
        return (
          <div key={index} className='category-item' onClick={goCategory}>
            <img className='item-icon' src={item.url} />
            <p className='item-name'>{item.name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default connect(
  state => ({
    items: state.category.items,
  }),
  disaptch => ({
    getHeaderData: () => disaptch(getHeaderData()),
  })
)(Category)
