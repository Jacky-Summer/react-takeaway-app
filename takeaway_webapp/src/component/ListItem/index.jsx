import React from 'react'
import StarScore from '../StarScore'
import './ListItem.scss'

const ListItem = ({ itemData }) => {
  const renderBrand = data => {
    if (data.brand_type) {
      return <div className='brand brand-pin'>品牌</div>
    } else {
      return <div className='brand brand-xin'>新到</div>
    }
  }
  const renderMonthNum = data => {
    let num = data.month_sale_num

    // 大于999采用999+
    if (num > 999) {
      return '999+'
    }

    return num
  }

  const renderMeituanFlag = data => {
    if (data.delivery_type) {
      return <div className='item-meituan-flag'>美团专送</div>
    }

    return null
  }
  const renderOthers = data => {
    let array = data.discounts2

    return array.map((item, index) => {
      return (
        <div key={index} className='other-info'>
          <img src={item.icon_url} className='other-tag' />
          <div className='other-content'>{item.info}</div>
        </div>
      )
    })
  }

  return (
    <div className='r-item-content scale-1px'>
      <img className='item-img' src={itemData.pic_url} />
      {renderBrand(itemData)}
      <div className='item-info-content'>
        <p className='item-title'>{itemData.name}</p>
        <div className='item-desc clearfix'>
          <div className='item-score'>
            <StarScore score={itemData.wm_poi_score} />
          </div>
          <div className='item-count'>月售{renderMonthNum(itemData)}</div>
          <div className='item-distance'>&nbsp;{itemData.distance}</div>
          <div className='item-time'>{itemData.mt_delivery_time}&nbsp;|</div>
        </div>
        <div className='item-price'>
          <div className='item-pre-price'>{itemData.min_price_tip}</div>
          {renderMeituanFlag(itemData)}
        </div>
        <div className='item-others'>{renderOthers(itemData)}</div>
      </div>
    </div>
  )
}

export default ListItem
