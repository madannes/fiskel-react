import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { GroupListing } from './GroupListing.jsx';
import { FundListing } from './FundListing.jsx';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={GroupListing} />
          <Route path="/:name" component={FundListing} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('fiskelReactApp'));
