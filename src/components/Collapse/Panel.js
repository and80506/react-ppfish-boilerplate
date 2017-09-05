import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import PanelContent from './PanelContent';

class CollapsePanel extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick() {
    const { onItemClick } = this.props;
    onItemClick();
  }

  render() {
    const { className, prefixCls, header, children, isActive } = this.props;
    const headerCls = classNames({
      'clearfix': true,
      [`${prefixCls}-header`]: true,
    });
    const itemCls = classNames({
      // 'clearfix': true,
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-active`]: isActive,
      [className]: className,
    });
    const getArrowIcon = (isActive) => {
      if (isActive) {
        return (
          <i className="iconfont">&#xe602;</i>
        );
      }else {
        return (
          <i className="iconfont">&#xe603;</i>
        );
      }
    };
    return (
      <div className={itemCls}>
        <div
          className={headerCls}
          onClick={this.handleItemClick}
          role="tab"
          aria-expanded={isActive}
        >
          <div className="title">{header}</div>
          <div className="arrow">
            {getArrowIcon(isActive)}
          </div>
        </div>
        <PanelContent prefixCls={prefixCls} isActive={isActive}>
          {children}
        </PanelContent>
      </div>
    );
  }
}
CollapsePanel.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  children: PropTypes.any,
  openAnimation: PropTypes.object,
  prefixCls: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  isActive: PropTypes.bool,
  onItemClick: PropTypes.func,
};
CollapsePanel.defaultProps = {
  isActive: false,
  onItemClick() {
  }
};

export default CollapsePanel;
