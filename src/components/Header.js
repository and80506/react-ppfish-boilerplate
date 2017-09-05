import React, { Component, PropTypes } from 'react';
import { getAccessToken, getUserInfo, getHeadpic, isRole } from '../utils/';
import { Menu, Tooltip, Button } from '../components';
import './Header.less';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.onMenuClick = props.onMenuClick.bind(this);
    this.onLoadLogout = props.onLoadLogout.bind(this);
    this.onRedirectLogin = props.onRedirectLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    const accessToken = getAccessToken();
    const { isCheckLogin, onRedirectLogin } = this.props;
    // 是否需要检查用户登录状态
    if (isCheckLogin) {
      // 未登录用户跳转到首页登录框
      onRedirectLogin();
    }
    // 判断用户已登录
    if (accessToken) {
      // 为登录后获取用户信息预留功能
    }
  }

  componentDidMount() {
  }

  handleLogin(e) {
    // 跳登录
    this.onRedirectLogin();
    //e.preventDefault();
  }

  getMenu() {
    const { current } = this.props;
    const accessToken = getAccessToken();
    // 未登录
    if (!accessToken) {
      // return null;
    }

    return (
      <Menu
        className="header-l"
        onClick={(e)=>this.onMenuClick(e.key)}
        selectedKeys={[current]}
        mode="horizontal"
      >
       <Menu.Item key="home">
       <a href="/">首页</a>
       </Menu.Item>
       <Menu.Item key="list">
       <a href="/list/">文章列表</a>
       </Menu.Item>
      </Menu>
    );
  }

  getHeaderRight() {
    const { isCheckLogin } = this.props;
    const accessToken = getAccessToken();
    const userInfo = getUserInfo();
    const qrcodeimg = require('../assets/image/appqrcode.png');
    const hoverContent = (
      <div className="app-download">
        <div className="qr-wrap">
          <img src={qrcodeimg} alt="二维码"/>
        </div>
        <p className="tip">IOS/Android扫码直接下载应用</p>
        {/*<div className="btn-group">
          <Button type="primary" size="large">IOS下载</Button>
          <Button type="primary" size="large">Android下载</Button>
        </div>*/}
      </div>
    );
    // 未登录
    if (!accessToken) {
      if (!isCheckLogin) {
        return null;
      }
      return (
        <ul className="clearfix header-r">
          <li className="header-r-item">
            <Tooltip title={hoverContent} trigger="click" overlayClassName="qr-tip" placement="top">
              <div className="qr-code">
                <i className="iconfont">&#xe606;</i>
              </div>
            </Tooltip>
          </li>
          <li className="header-r-item">
            <div className="separator">|</div>
          </li><li className="header-r-item">
            <a className="anchor" href="/">注册</a>
          </li>
          <li className="header-r-item">
            <a className="anchor"  onClick={this.handleLogin}>登录</a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="clearfix header-r">
        <li className="header-r-item">
          <Tooltip title={hoverContent} trigger="click" overlayClassName="qr-tip" placement="top">
          <div className="qr-code">
              <i className="iconfont">&#xe606;</i>
          </div>
          </Tooltip>
        </li>
        <li className="header-r-item">
          <div className="separator">|</div>
        </li>
        <li className="header-r-item">
          <div className="clearfix my-info">
            <span className="avatar"><img src={getHeadpic(userInfo.ltb_headpic)} /></span>
            {' '}
            <span className="full-name">
              <span>{userInfo.nick_name}</span>
              <span className="icon-" />
            </span>
            <a href="javascript:;" className="logout" onClick={this.onLoadLogout}>
              <span>退出</span>
            </a>
          </div>
        </li>
      </ul>
    );
  }

  render() {
    const logo = require('../assets/image/logo-dayiner@2x.png');
    return (
      <div className="header">
        <div className="header-bd clearfix" id="header">
          <div className="ant-row">
            <div className="ant-col-4 icon">
              <a className="logo" href="/">
                <img src={logo} alt="股手" />
              </a>
            </div>
            <div className="ant-col-20">
              {this.getMenu()}
              {this.getHeaderRight()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  isCheckLogin: PropTypes.bool.isRequired,
  current: PropTypes.string,
  onMenuClick: PropTypes.func,
  onLoadLogout: PropTypes.func,
  onRedirectLogin: PropTypes.func,
};
