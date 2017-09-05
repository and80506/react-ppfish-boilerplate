import React, { Component, PropTypes } from 'react';
import '../assets/css/lib/base.less';
import './App.less';
import Login from './Login';
import Header from './Header';
import Notice from './Notice';
import Footer from './Footer';

const App = (props) => {
  const { style, children, isAuthenticated } = props;
  if ( isAuthenticated ) {
    return (
      <div className="main-layout">
        <Header
          {...props}
        />
        <Notice />
        <div className="main-wrapper" style={style}>
          {children}
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <Login
      {...props}
    />
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  isCheckLogin: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func,
  onLoadLogout: PropTypes.func,
  onRedirectLogin: PropTypes.func,
  fields: PropTypes.object,
  isLoginErrorVisible: PropTypes.bool,
  loginErrorText: PropTypes.string,
  onLoadLogin: PropTypes.func,
  onInputError: PropTypes.func,
};

export default App;
