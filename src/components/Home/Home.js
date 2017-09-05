import React, { Component, PropTypes } from 'react';
import './Home.less';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div style={{paddingTop: 200, minHeight: 560}}>
        <h3 className="title">welcome to 客服管理平台</h3>
      </div>
    );
  }
}

App.propTypes = {
  handleLogin: PropTypes.func,
};

export default App;
