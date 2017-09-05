import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import App from '../../components/App';
import { setMenuHighlight, loadLogout, redirectLogin, setLoginResult, loadLogin } from '../../actions';

const mapStateToProps = (state) => {
  return {
    ...state.header,
    ...state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMenuClick: (key) => {
      dispatch(setMenuHighlight(key));
    },
    onLoadLogin: (success) => {
      dispatch(loadLogin(success));
    },
    onLoadLogout: () => {
      dispatch(loadLogout());
    },
    onRedirectLogin: redirectLogin,
    onInputError: (errMesg) => {
      dispatch(setLoginResult(!errMesg, ''));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
