import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import Home from './containers/Home/Home';
import List from './containers/List/List';
import NotFound from './components/NotFound/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="list" component={List}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
