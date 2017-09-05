// 网站头部reducers
import initialState from './initialState';
const DEFAULT_STATE = initialState.login;
const login = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_LOGIN_RESULT':
      return Object.assign({}, state, {
        isLoginErrorVisible: action.isLoginErrorVisible,
        loginErrorText: action.loginErrorText,
      });
    default:
      return state;
  }
};

export default login;
