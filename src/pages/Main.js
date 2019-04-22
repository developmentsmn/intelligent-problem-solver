import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./home/index";
import Solver from "./solver/solver";
import Search from "./search/search";
import Test from "./__test__/test";

export default () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/solver" component={Solver} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </main>
  );
};
