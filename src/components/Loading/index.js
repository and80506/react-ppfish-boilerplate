import React, { Component, PropTypes, Children }from 'react';
import './index.less';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const loadingIcon = require('../../assets/image/loading.gif');
    return (
        <div className="comn-loading">
          <div className="comn-bg comn-loading-bg"><img src={loadingIcon}/></div>
          <p className="comn-loading-text">加载中...</p>
        </div>
    );
  }
}

Loading.propTypes = {
  children: PropTypes.node,
};

export default Loading;
