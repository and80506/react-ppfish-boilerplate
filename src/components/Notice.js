import React, { Component, PropTypes } from 'react';
import { Icon } from '../components';
import { getInternetExplorerVersion } from '../utils/';
import './Notice.less';

export default class Notice extends Component {
  constructor(props) {
    super(props);
    this.handleCloseNotice = this.handleCloseNotice.bind(this);
  }

  handleCloseNotice() {
    const notice = this.refs.notice;
    notice.style.display = 'none';
  }

  render() {
    const ieVersion = getInternetExplorerVersion();
    if (ieVersion > -1 && ieVersion < 11.0) {
      return (
        <div className="full-notice" ref="notice">
          <p className="clearfix full-notice-bd">
            您的浏览器不受支持, 您需要更新您的浏览器才能使用该网站。
            <a href="/browser/index.html" target="_blank">点此升级浏览器</a>
            {/*
            <Icon type="cross-circle" onClick={this.handleCloseNotice} />
            */}
          </p>
        </div>
      );
    }
    return null;
  }
}

Notice.propTypes = {
};
