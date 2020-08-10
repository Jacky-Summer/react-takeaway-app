import React, { useEffect } from 'react'
import Loading from '../Loading'

const ScrollView = ({ isEnd, loadCallback, children }) => {
  const onLoadPage = () => {
    let clientHeight = document.documentElement.clientHeight
    let scrollHeight = document.body.scrollHeight
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    let preLoadDistance = 30 // 提前加载的距离

    if (clientHeight + scrollTop >= scrollHeight - preLoadDistance) {
      if (!isEnd) {
        loadCallback && loadCallback()
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onLoadPage)
    return () => {
      window.removeEventListener('scroll', onLoadPage)
    }
  }, [])

  return (
    <div className='scrollview'>
      {children}
      <Loading isEnd={isEnd} />
    </div>
  )
}

export default ScrollView
