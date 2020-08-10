import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import BottomBar from '../BottomBar'
import Home from '../Home'
import Order from '../Order'
import My from '../My'

const Main = () => (
  <div>
    <Route exact path='/home' component={Home} />
    <Route path='/order' component={Order} />
    <Route path='/my' component={My} />
    <BottomBar />
  </div>
)

export default withRouter(Main)
