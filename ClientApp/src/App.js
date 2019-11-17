import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './components/Home';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <div className="m-5">
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
    );
  }
}
