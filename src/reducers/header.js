// 网站头部reducers
import initialState from './initialState';
const DEFAULT_STATE = initialState.header;
const defaultHandlers = {
  'SET_MENU_HIGHLIGHT': (state, action) => {
    return Object.assign({}, state, {
      current: action.key,
    });
  }
};
export const header = (state = DEFAULT_STATE, action) => {
  if (defaultHandlers.hasOwnProperty(action.type)) {
    return defaultHandlers[action.type](state, action);
  } else {
    return state;
  }
};
export const createHeaderReducer = (initialState, handlers) => {
  const initState = Object.assign({}, DEFAULT_STATE, initialState);
  handlers = Object.assign({}, defaultHandlers, handlers);
  return (state = initState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};
