import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import GroupListing from './components/GroupListing'
import GroupDetail from './components/GroupDetail'

import './App.css'

const App = () => (
  <Router>
    <Fragment>
      <Route path="/" exact component={GroupListing} />
      <Route path="/group/:name" component={GroupDetail} />
    </Fragment>
  </Router>
)

export default App
