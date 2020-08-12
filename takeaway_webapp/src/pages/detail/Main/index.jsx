import React from 'react'
import { Route, withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import NavHeader from 'component/NavHeader'
import Menu from '../Menu'
import Comment from '../Comment'
import Restanurant from '../Restanurant'
import './Main.scss'

const Main = ({ tabs }) => {
  const changeTab = item => {}

  const renderTabs = () => {
    return tabs.map(item => {
      return (
        <NavLink
          activeClassName='active'
          onClick={() => changeTab(item)}
          replace={true}
          to={'/' + item.key}
          key={item.key}
          className='tab-item'
        >
          {item.name}
        </NavLink>
      )
    })
  }

  const showChooseContent = () => {}

  return (
    <div className='detail'>
      <NavHeader title='黄焖鸡' />
      <div className='tab-bar'>{renderTabs()}</div>
      <Route exact path='/menu' component={Menu} />
      <Route path='/comment' component={Comment} />
      <Route path='/restanurant' component={Restanurant} />
      {showChooseContent ? <div className='mask'></div> : null}
    </div>
  )
}

export default withRouter(
  connect(state => ({
    tabs: state.tab.tabs,
  }))(Main)
)
