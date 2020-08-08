import React from 'react'
import SearchBar from '../SearchBar'
import bannerImg from './img/banner.jpg'
import './Header.scss'
const Header = () => {
  return (
    <div className='header'>
      <SearchBar />
      <img className='banner-img' src={bannerImg} />
    </div>
  )
}

export default Header
