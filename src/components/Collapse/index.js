import React, { Component, PropTypes, Children }from 'react';
import classNames from 'classnames';
import CollapsePanel from './Panel';
import './index.less';

function toArray(activeKey) {
  let currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
  }
  return currentActiveKey;
}
class Collapse extends Component {
  static Panel = CollapsePanel;

  constructor(props) {
    super(props);
    const { activeKey, defaultActiveKey } = props;
    let currentActiveKey = defaultActiveKey;
    if ('activeKey' in props) {
      currentActiveKey = activeKey;
    }
    this.state = {
      activeKey: toArray(currentActiveKey),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: toArray(nextProps.activeKey),
      });
    }
  }

  onClickItem(key) {
    return () => {
      let activeKey = this.state.activeKey;
      // 手风琴效果,只展开一项,收起其他项
      if (this.props.accordion) {
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = [...activeKey];
        const index = activeKey.indexOf(key);
        const isActive = index > -1;
        if (isActive) {
          // remove active state
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }
      }
      this.setActiveKey(activeKey);
    };
  }

  getItems() {
    const activeKey = this.state.activeKey;
    const { prefixCls, accordion } = this.props;
    return Children.map(this.props.children, (child, index) => {
      // If there is no key provide, use the panel order as default key
      const key = child.key || String(index);
      const header = child.props.header;
      let isActive = false;
      if (accordion) {
        isActive = activeKey[0] === key;
      } else {
        isActive = activeKey.indexOf(key) > -1;
      }

      const props = {
        key,
        header,
        isActive,
        prefixCls,
        children: child.props.children,
        onItemClick: this.onClickItem(key).bind(this),
      };

      return React.cloneElement(child, props);
    });
  }

  setActiveKey(activeKey) {
    if (!('activeKey' in this.props)) {
      this.setState({
        activeKey,
      });
    }
    this.props.onChange(this.props.accordion ? activeKey[0] : activeKey);
  }

  render() {
    const { prefixCls, extraCls } = this.props;
    let clsObj = {};
    clsObj[prefixCls] = true;
    if (extraCls) {
      clsObj[extraCls] = true;
    }
    return (
      <div className={classNames(clsObj)}>
        {this.getItems()}
      </div>
    );
  }
}

Collapse.propTypes = {
  children: PropTypes.any,
  prefixCls: PropTypes.string,
  activeKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  defaultActiveKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChange: PropTypes.func,
  accordion: PropTypes.bool,
  extraCls: PropTypes.string,
};

Collapse.defaultProps = {
  prefixCls: 'collapse',
  onChange() {},
  accordion: false,
};

export default Collapse;
