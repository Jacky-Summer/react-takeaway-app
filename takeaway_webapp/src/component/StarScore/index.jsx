import React from 'react'
import './StarScore.scss'

const StarScore = ({ score }) => {
  const renderScore = score => {
    let wm_poi_score = score || ''
    let scoreStr = wm_poi_score.toString()
    let scoreArray = scoreStr.split('.')

    let starArr = []

    let fullstar = parseInt(scoreArray[0])

    let halfstar = scoreArray[1] >= 5 ? 1 : 0

    let nulltar = 5 - fullstar - halfstar

    for (let i = 0; i < fullstar; i++) {
      starArr.push(<div key={`${i} full`} className='star fullstar'></div>)
    }

    for (let i = 0; i < halfstar; i++) {
      starArr.push(<div key={`${i} half`} className='star halfstar'></div>)
    }

    for (let i = 0; i < nulltar; i++) {
      starArr.push(<div key={`${i} null`} className='star nullstar'></div>)
    }

    return starArr.map(star => star)
  }
  return <div className='star-score'>{renderScore(score)}</div>
}

export default StarScore
