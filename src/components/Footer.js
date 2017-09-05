import React, { Component, PropTypes } from 'react';
import './Footer.less';

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer temp-class">
        <div className="clearfix footer-bd" id="footer">
          <div className="ant-row">
            <div className="ant-col-24">
              <p className="copyright">©2017 XXXX公司 版权所有.<a href="http://www.miitbeian.gov.cn/" target="_blank">浙ICP备XXXXXXX号-2</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
