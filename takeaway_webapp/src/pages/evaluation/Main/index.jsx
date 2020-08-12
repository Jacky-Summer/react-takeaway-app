import React, { useState, useRef, useEffect } from 'react'
import NavHeader from 'component/NavHeader'
import 'component/common.scss'
import './Main.scss'

const MAX_COUNT = 140

const Main = () => {
  const [count, setCount] = useState(MAX_COUNT) // 剩余可输入字符数
  const [startIndex, setStartIndex] = useState(0)
  const refCommentInput = useRef()
  const [inputMethod, setInputMethod] = useState(false) // 输入法

  // 解决中文输入法截断问题
  useEffect(() => {
    refCommentInput.current.addEventListener('compositionstart', function () {
      setInputMethod(true)
      console.log(inputMethod)
    })
    refCommentInput.current.addEventListener('compositionend', function (e) {
      setInputMethod(false)
      onIuput(e.target.value)
    })
  }, [])

  const doEva = index => {
    setStartIndex(index + 1)
  }

  const renderStar = () => {
    let array = []
    for (let i = 0; i < 5; i++) {
      let cls = i < startIndex ? 'star-item light' : 'star-item'
      array.push(<div onClick={() => doEva(i)} key={i} className={cls}></div>)
    }

    return array
  }

  const onIuput = value => {
    let num = value.length
    console.log('onIuput', inputMethod)
    if (!inputMethod) {
      setCount(MAX_COUNT - num)
    }
  }

  return (
    <div className='content'>
      <NavHeader title='评价' />
      <div className='eva-content'>
        <div className='star-area'>{renderStar()}</div>
        <div className='comment'>
          <textarea
            ref={refCommentInput}
            onChange={e => onIuput(e.target.value)}
            minLength='140'
            placeholder='亲，菜品的口味如何，商家的服务是否周到?'
            className='comment-input'
          ></textarea>
          <span className='count'>{count}</span>
        </div>
        <p className='one-line product-name'>+厚切鸡排 香辣口水鸡饭. 中辣</p>
      </div>
      <div className='submit'>提交评价</div>
    </div>
  )
}

export default Main
