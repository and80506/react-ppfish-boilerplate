import React, { Component, PropTypes } from 'react';
import { Avatar } from '../components';
import { getUserInfo } from '../utils/';
import './Sidebar.less';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userInfo = getUserInfo();
    return (
      <div className="sidebar-panel">
        <div className="info-container">
          <Avatar
            ltbHeadpic={userInfo.ltb_headpic}
          />
          <div className="ellipsis full-name">{userInfo.nick_name}</div>
          <div className="ellipsis-multiple-line-3 introduction">{userInfo.signature}</div>
          <div className="sidebar-panel-extra">
            <ol className="clearfix items">
              <li className="sidebar-panel-extra-item sidebar-panel-follows">
                <div className="number">{userInfo.total_concern}</div>
                <div className="text">关注</div>
              </li>
              <li className="sidebar-panel-extra-item sidebar-panel-separator">
                <div />
              </li>
              <li className="sidebar-panel-extra-item sidebar-panel-fans">
                <div className="number">{userInfo.total_fans}</div>
                <div className="text">粉丝</div>
              </li>
            </ol>
          </div>
        </div>
        {/*
        <ul className="sidebar-panel-menu">
          <li className="sidebar-panel-item">
            <a href="/" className="anchor"><i className="iconfont">&#xe606;</i> 工作室</a>
          </li>
          <li className="sidebar-panel-item">
            <a href="/" className="anchor"><i className="iconfont">&#xe606;</i> 观点</a>
          </li>
          <li className="sidebar-panel-item">
            <a href="/" className="anchor"><i className="iconfont">&#xe606;</i> 能力数据</a>
          </li>
          <li className="sidebar-panel-item">
            <a href="/" className="anchor"><i className="iconfont">&#xe606;</i> 调仓</a>
          </li>
        </ul>
         */}
      </div>
    );
  }
}
