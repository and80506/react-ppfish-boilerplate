import React, { Component, PropTypes, Children } from 'react';
import classNames from 'classnames';
import './index.less';
import { getDynamicCls } from '../../utils/';
import { Input, Button } from 'antd';
const InputGroup = Input.Group;

class StockPrice extends Component {
  constructor(props) {
    super(props);
    let defaultVal = '';
    if (!isNaN(props.defaultVal)) {
      defaultVal = props.defaultVal;
      this.state = {
        value: defaultVal,
        focus: false
      };
    }else {
      this.state = {
        value: props.value,
        focus: false
      };
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePressEnter = this.handlePressEnter.bind(this);
    this.createHandleClick = this.createHandleClick.bind(this);
    this.getFloatNumber = this.getFloatNumber.bind(this);
    this.lastValue = undefined;
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if ('value' in nextProps) {
      if (value != this.lastValue) {
        this.setState({
          value: value,
        });
        this.lastValue = value;
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if ('focus' in nextProps && nextProps.focus) {
      this.focus();
    }
  }

  focus() {
    let input = this.refs.input;
    input = input.refs.input;
    input.focus();
  }

  getFloatNumber(num) {
    if (isNaN(num)) {
      num = '0.00';
    }
    if (num < 0) {
      num = '0.00';
    }
    return parseFloat(Math.round(num * 100) / 100).toFixed(2);
  }

  handleInputChange(e) {
    const { onChange } = this.props;
    let newVal = e.currentTarget.value;
    newVal = newVal.replace(/[^\d\.]+/, '');
    this.setState({
      value: newVal
    });
    onChange(newVal);
  }

  handlePressEnter(e) {
  }

  createHandleClick(ratio) {
    const { step, onChange } = this.props;
    return () => {
      const lastVal = this.state.value;
      const newVal = this.getFloatNumber(Number(lastVal) + ratio*step);
      this.setState({
        value: newVal
      });
      onChange(newVal);
    };
  }

  render() {
    const { style, placeholder, type } = this.props;
    const btnCls = classNames({
      'stock-price-btn': true,
      'stock-price-btn-noempty': !!this.state.value,
    });
    const searchCls = classNames({
      'stock-price-input-focus': this.state.focus,
    });
    const wrapperCls = getDynamicCls(['stock-price-wrapper'], 'stock-price-wrapper-sell', () => {
      return type == 2;
    });
    return (
      <div className={wrapperCls}>
        <InputGroup className={searchCls}>
          <div className="stock-price-btn-wrap stock-price-btn-l">
            <Button type="primary" icon="minus" className={btnCls} onClick={this.createHandleClick(-1)}/>
          </div>
          <Input
            ref="input"
            placeholder={placeholder}
            value={this.state.value}
            onChange={this.handleInputChange}
            onPressEnter={this.handlePressEnter}
            style={style}
          />
          <div className="stock-price-btn-wrap  stock-price-btn-r">
            <Button type="primary" icon="plus" className={btnCls} onClick={this.createHandleClick(1)}/>
          </div>
        </InputGroup>
      </div>
    );
  }
}
StockPrice.propTypes = {
  style: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  defaultVal: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  step: PropTypes.number,
  type: PropTypes.number,
  onChange: PropTypes.func,

};
StockPrice.defaultProps = {
  style: {
    width: 187,
    height: 36
  },
  placeholder: '',
  step: 1,
  type: 1,
  onChange: () => {},
};

export default StockPrice;
