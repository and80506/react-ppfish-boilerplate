// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from '../middleware/promise';
import DevTools from '../utils/DevTools';

export default function configureStore(preloadedState) {
  const logger = createLogger();
  const router = routerMiddleware(browserHistory);
  const enhancer = compose(
    applyMiddleware(
      thunk,
      promiseMiddleware(),
      logger,
      router
    ),
    DevTools.instrument()
  );
  const store = createStore(
    rootReducer,
    preloadedState,
    enhancer
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
