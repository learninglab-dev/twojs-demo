import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Two from './Two'
import YoYo from './YoYo'


export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route
          exact path='/'>
          <Two/>
        </Route>
        <Route
          path='/yoyo'
          >
          <YoYo/>
        </Route>
      </Switch>
    </Router>
  )
}
