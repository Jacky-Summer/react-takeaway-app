import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { TABKEY } from '../config'
import { changeTab, getFilterData, changeFilter } from '../actions/headerAction'
import './Header.scss'

const Header = ({
  tabs,
  activeKey,
  filterData,
  changeTab,
  getFilterData,
  changeFilter,
}) => {
  const [isShowPanel, setIsShowPanel] = useState(false)
  useEffect(() => {
    getFilterData()
  }, [])

  const handleChangeTab = key => {
    if (activeKey === key) {
      setIsShowPanel(!isShowPanel)
    } else {
      setIsShowPanel(true)
    }

    changeTab(key)
  }

  const renderTabs = () => {
    let tabArr = []

    for (const key in tabs) {
      let cls = `item ${key}`
      let item = tabs[key]
      if (item.key === activeKey) {
        cls += ' current'
      }
      tabArr.push(
        <div
          className={cls}
          key={item.key}
          onClick={() => {
            handleChangeTab(item.key)
          }}
        >
          {item.text}
        </div>
      )
    }
    return tabArr
  }
  // 重置其他item的active状态
  const revertActive = (key, dataList) => {
    if (key === TABKEY.cate) {
      for (let i = 0; i < dataList.length; i++) {
        for (let j = 0; j < dataList[i].sub_category_list.length; j++) {
          dataList[i].sub_category_list[j].active = false
        }
      }
    } else if (key === TABKEY.type) {
      for (let i = 0; i < dataList.length; i++) {
        dataList[i].active = false
      }
    } else {
      for (let i = 0; i < dataList.length; i++) {
        for(let j = 0; j < dataList[i].items.length; j++) {
          dataList[i].items[j].active = false
        }
      }
    }
  }

  // 变化当前点击的item状态 同时发起filter的请求
  const changeDoFilter = (item, key, dataList) => {
    revertActive(key, dataList)
    item.active = true
    changeFilter({ item, key })
    setIsShowPanel(false)
  }

  // 全部分类里面的每个条目
  const renderCateInnerContent = (item, cateList) => {
    return item.sub_category_list.map((item, index) => {
      let cls = item.active ? 'cate-box-inner active' : 'cate-box-inner'
      return (
        <div
          onClick={() => changeDoFilter(item, TABKEY.cate, cateList)}
          key={index}
          className='cate-box'
        >
          <div className={cls}>
            {item.name}({item.quantity})
          </div>
        </div>
      )
    })
  }

  // 全部分类外类目
  const renderCateContent = () => {
    let cateList = filterData.category_filter_list || []
    return cateList.map((item, index) => {
      return (
        <li key={index} className='cate-item'>
          <p className='item-title'>
            {item.name}
            <span className='item-count'>{item.quantity}</span>
          </p>
          <div className='item-content clearfix'>
            {renderCateInnerContent(item, cateList)}
          </div>
        </li>
      )
    })
  }

  // 综合排序类目
  const renderTypeContent = () => {
    let typeList = filterData.sort_type_list || []
    return typeList.map((item, index) => {
      let cls = item.active ? 'type-item active' : 'type-item'
      return (
        <li
          onClick={() => changeDoFilter(item, TABKEY.type, typeList)}
          key={index}
          className={cls}
        >
          {item.name}
        </li>
      )
    })
  }
  // 筛选内部的每个类目
  const renderFilterInnerContent = (items, filterList) => {
    return items.map((item, index) => {
      let cls = item.icon ? 'cate-box-inner has-icon' : 'cate-box-inner'
      if (item.active) {
        cls += ' active'
      }
      return (
        <div
          onClick={() => changeDoFilter(item, TABKEY.filter, filterList)}
          key={index}
          className='cate-box'
        >
          <div className={cls}>
            {item.icon ? <img src={item.icon} /> : null}
            {item.name}
          </div>
        </div>
      )
    })
  }

  // 筛选外面类目
  const renderFilterContent = () => {
    let filterList = filterData.activity_filter_list || []
    return filterList.map((item, index) => {
      return (
        <li key={index} className='filter-item'>
          <p className='filter-title'>{item.group_title}</p>
          <div className='item-content clearfix'>
            {renderFilterInnerContent(item.items, filterList)}
          </div>
        </li>
      )
    })
  }

  const renderContent = () => {
    let contentArr = []

    for (const key in tabs) {
      let item = tabs[key]
      let cls = item.key + '-panel'
      if (item.key === activeKey) {
        cls += ' current'
      }
      if (item.key === TABKEY.cate) {
        contentArr.push(
          <ul key={item.key} className={cls}>
            {renderCateContent()}
          </ul>
        )
      } else if (item.key === TABKEY.type) {
        contentArr.push(
          <ul key={item.key} className={cls}>
            {renderTypeContent()}
          </ul>
        )
      } else {
        contentArr.push(
          <ul key={item.key} className={cls}>
            {renderFilterContent()}
          </ul>
        )
      }
    }
    return contentArr
  }

  return (
    <div className='header'>
      <div className='header-top'>{renderTabs()}</div>
      {isShowPanel && (
        <div className='panel'>
          <div className='panel-inner'>{renderContent()}</div>
        </div>
      )}
    </div>
  )
}

export default connect(
  state => ({
    tabs: state.header.tabs,
    activeKey: state.header.activeKey,
    filterData: state.header.filterData,
  }),
  { changeTab, getFilterData, changeFilter }
)(Header)
