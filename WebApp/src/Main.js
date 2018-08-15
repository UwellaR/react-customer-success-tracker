import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import CustomerFeedback from './CustomerFeedback'


// The Main component renders one of the three provided
// Routes (provided that one matches).

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/customerfeedback' component={CustomerFeedback}/>
    </Switch>
  </main>
)

export default Main
