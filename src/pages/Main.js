import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home/index';
import Solver from './solver/solver';

export default () => {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/solver' component={Solver}/>
      </Switch>
    </main>
  );
}