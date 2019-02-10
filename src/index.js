import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { render } from 'react-dom'
import GroupListing from './components/GroupListing'
import GroupDetail from './components/GroupDetail'

import './style.css'

const App = () => (
  <Router>
    <Fragment>
      <Route path="/" exact component={GroupListing} />
      <Route path="/group/:name" component={GroupDetail} />
    </Fragment>
  </Router>
)

render(<App />, document.getElementById('fiskelAppRoot'))
