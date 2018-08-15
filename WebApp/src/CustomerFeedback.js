import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AllCustomerFeedback from './AllCustomerFeedback'
import Customer from './Customer'

const CustomerFeedback = () => (
  <Switch>
    <Route exact path='/customerfeedback' component={AllCustomerFeedback}/>
    <Route path='/customerfeedback/:col' component={Customer}/>
  </Switch>
)

export default CustomerFeedback
