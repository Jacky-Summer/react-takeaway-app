import React from 'react'
import './ListItem.scss'

const ListItem = ({ itemData }) => {
  const renderTotalPrice = (item, data, index) => {
    return (
      <div key={index} className='product-item'>
        <span>...</span>
        <div className='p-total-count'>
          总计{item.product_count}个菜，实付
          <span className='total-price'>¥{data.total}</span>
        </div>
      </div>
    )
  }
  const renderProduct = data => {
    let list = data.product_list

    // 复制数组防止引用
    let _list = JSON.parse(JSON.stringify(list))
    // push一个用来计算总计的{type：more}
    _list.push({ type: 'more' })

    return _list.map((item, index) => {
      if (item.type === 'more') {
        return renderTotalPrice(item, data, index)
      }
      return (
        <div className='product-item' key={index}>
          {item.product_name}
          <div className='p-count'>x{item.product_count}</div>
        </div>
      )
    })
  }

  const goDetail = () => {}

  const goEval = () => {}

  const renderComment = data => {
    let evaluation = !data.is_comment
    if (evaluation) {
      return (
        <div className='evaluation clearfix'>
          <div className='evaluation-btn' onClick={goEval}>
            评价
          </div>
        </div>
      )
    }

    return null
  }
  return (
    <div className='order-item'>
      <div className='order-item-inner'>
        <img className='item-img' src={itemData.poi_pic} />
        <div className='item-right'>
          <div className='item-top' onClick={goDetail}>
            <p className='order-name one-line'>{itemData.poi_name}</p>
            <div className='arrow'></div>
            <div className='order-state'>{itemData.status_description}</div>
          </div>
          <div className='item-bottom'>{renderProduct(itemData)}</div>
        </div>
      </div>
      {renderComment(itemData)}
    </div>
  )
}

export default ListItem
