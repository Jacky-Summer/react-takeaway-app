import React from 'react'
import './NavHeader.scss'

const NavHeader = props => {
  const goBack = () => {
    window.history.back()
  }
  return (
    <div className='nav'>
      <div onClick={goBack} className='back-icon'></div>
      <h4 className='title'>{props.title}</h4>
    </div>
  )
}
export default NavHeader
