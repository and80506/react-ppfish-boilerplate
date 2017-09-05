import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { header } from './header';
import list from './list';
import login from './login';
import reducersGenerate from './reducersGenerate';

const rootReducer = combineReducers({
  routing: routerReducer,
  header,
  list,
  login,
});

export default rootReducer;
