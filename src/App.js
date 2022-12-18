import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GroupListing from './components/GroupListing'
import GroupDetail from './components/GroupDetail'

import './App.css'

const App = () => (
  <>
    <Router>
      <Switch>
        <Route path="/" exact component={GroupListing} />
        <Route path="/group/:name" component={GroupDetail} />
      </Switch>
    </Router>
    <footer>{process.env.REACT_APP_VERSION} ({process.env.REACT_APP_COMMIT})</footer>
  </>
)

export default App
