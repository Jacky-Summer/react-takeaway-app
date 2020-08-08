import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeTab } from '../actions/tabActions'
import './BottomBar.scss'

const BottomBar = props => {
  const changeTab = tabKey => {
    props.changeTab(tabKey)
  }

  const renderItems = () => {
    return props.tabs.map(tab => {
      let cls = tab.key + ' btn-item'
      let name = tab.name
      return (
        <NavLink
          key={tab.key}
          to={`/${tab.key}`}
          className={cls}
          activeClassName='active'
          onClick={() => changeTab(tab.key)}
        >
          <div className='tab-icon'></div>
          <div className='btn-name'>{name}</div>
        </NavLink>
      )
    })
  }

  return <div className='bottom-bar'>{renderItems()}</div>
}

export default withRouter(
  connect(
    state => ({
      tabs: state.tab.tabs,
      activeKey: state.tab.activeKey,
    }),
    { changeTab }
  )(BottomBar)
)
