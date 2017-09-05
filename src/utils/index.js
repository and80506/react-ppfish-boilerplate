/* eslint-disable no-console */
import React from 'react';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import fetch from 'isomorphic-fetch';
import { getConfig } from '../config';
import { Modal } from '../components/';
import { redirectLogin } from '../actions/';
import constants from '../constants/';
const config = getConfig();
const ajaxPrefix = config.ajaxPrefix;
const { ACCESS_TOKEN, USER_INFO } = constants;

const noop = () => {};
export const getTimeBarStr = (timestamp) => {
  const targetTime = moment(timestamp);
  let diffTime = targetTime.diff(new Date());
  diffTime = diffTime * -1;
  // 超过一年
  if (diffTime > 365*24*60*60*1000) {
    return targetTime.format('YYYY MM DD HH:mm:ss');
  // 超过一天
  }else if(diffTime > 24*60*60*1000) {
    return targetTime.format('MM-DD HH:mm:ss');
  // 超过一分钟
  }else if(diffTime > 60*1000) {
    return targetTime.format('HH:mm:ss');
  }else {
    return '刚刚';
  }
};
// password 加密
export const generateAuthPassword = (password) => {
  return CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(password));
};
export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN);
};
export const setAccessToken = (accessToken) => {
  Cookies.set(ACCESS_TOKEN, accessToken);
};
export const removeAccessToken = () => {
  return Cookies.remove(ACCESS_TOKEN);
};
export const setUserInfo = (result) => {
  return Cookies.set(USER_INFO, JSON.stringify(result));
};
export const removeUserInfo = () => {
  return Cookies.remove(USER_INFO);
};
export const getUserInfo = () => {
  const userInfo = Cookies.get(USER_INFO);
  return userInfo && JSON.parse(decodeURIComponent(userInfo)) || {};
};
export const getHeadpic = (headpic) => {
  const defaultHeadpic = require('../assets/image/default-avatar.png');
  return (headpic && headpic.trim && headpic.trim()) || defaultHeadpic;
};

/**
 * @method 根据role_mark判断是否TO_COMPARE_ROLE身份
 * TO_COMPARE_ROLE: 0-匿名 1-会员 2-股长 4-股手 8-助理 16-主持人
*/
export const isRole = (TO_COMPARE_ROLE, role) => {
  return (role & TO_COMPARE_ROLE) != 0;
};

// 根据role_mark判断是否股手
export const isTrader = (roleMark) => {
  if (typeof roleMark == 'undefined' || isNaN(roleMark)) {
    return false;
  }
  return isRole(4, roleMark);
};
// 比率转换成百分比
export const getPercentRate = (percentRate) => {
  let rate = parseFloat(percentRate, 10);
  if (isNaN(rate)) {
    return '0.00';
  }
  return (rate * 10000/100).toFixed(2);
};
// 价格转换成数字和单位
export const getPriceWithUnit = (num, bit) => {
  if (isNaN(num)) {
    return num;
  }
  if (typeof bit != 'number') {
    bit = 2;
  }
  if (num >= 1e8 || num <= -1e8) {
    return (parseFloat(num, 10)*1e-8).toFixed(bit) + '亿';
  // 价格过10万后转换成带单位
  }else if (num > 1e5 || num <= -1e5) {
    return (parseFloat(num, 10)*1e-4).toFixed(bit) + '万';
  }else {
    return parseFloat(num, 10).toFixed(bit);
  }
};
// 数量转换成数字和单位
// 获取动态classNames
export const getDynamicCls = (clsArr, addCls, condition) => {
  let clsObj = {};
  if (typeof clsArr == 'string') {
    clsArr = [clsArr];
  }
  clsArr.forEach((item) => {
    clsObj[item] = true;
  });
  if (addCls && condition()) {
    clsObj[addCls] = true;
  }
  return classNames(clsObj);
};
const toQueryParam = (data) => {
  let returnVal;
  for (let key in data) {
    if (typeof returnVal == 'undefined') {
      returnVal = '';
    }else {
      returnVal += '&';
    }
    returnVal += key;
    returnVal += '=';
    returnVal += data[key];
  }
  return returnVal;
};
/**
 *
 * @param param {object}
 * @param param.id 接口id {string}
 * @param param.data body {object}
 * @param param.success ajax发送成功后执行的函数 {function}
 * @param param.fail ajax发送失败后执行的函数 {function}
 * @returns {*}
 */
export const ajaxFetch = (param) => {
  const accessToken = getAccessToken();
  let url = param.url ||
    `${ajaxPrefix}/json/${param.id}`;
  let fetchParam = {};
  fetchParam.method = param.method || 'POST';
  fetchParam.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  if (fetchParam.method == 'POST') {
    fetchParam.body = JSON.stringify(Object.assign({
      access_token: accessToken,
      credentials: 'include',
    }, param.data));
  }else {
    if (url.indexOf('?') == -1) {
      url += '?';
      url += toQueryParam(param.data);
    }
  }
  return fetch(url, fetchParam)
    .then(response => response.json())
    .then(json => {
      let errorNo = json.error_no;
      if (typeof errorNo != 'undefined' && errorNo != '0') {
        // 未登录或已超时
        if (errorNo == '20000020') {
          if (config.useFrontCookie) {
            removeAccessToken();
            removeUserInfo();
          }
          redirectLogin(undefined, true);
        }else {
          console.log(`请求${url}发生错误:`, json);
        }
        if (typeof param.fail == 'function') {
          param.fail.bind(this)(json);
        }
        // 接口返回预期数据
      }else {
        if (typeof param.success == 'function') {
          param.success.bind(this)(json);
        }
      }
      return json;
    }, json => {
      // 接口调用失败
      if (typeof param.fail == 'function') {
        param.fail.bind(this)(json);
      }
      return json;
    });
};
// 显示成功提示弹框
export const showSuccessModal = (title, content, tickTime) => {
  const modal = Modal.success({
    title: title,
    content: content || '',
  });
  setTimeout(() => modal.destroy(), tickTime || 1000);
};
// 显示失败提示弹框
export const showFailModal = (title, content) => {
  const modal = Modal.error({
    title: title,
    content: content || '',
  });
  return modal;
};
// 显示确认弹框
export const showConfirmModal = (title, content, onOK, onCancel) => {
  const modal = Modal.confirm({
    title: title,
    content: content || '',
    onOk() {
      if (typeof onOK == 'function') {
        onOK();
      }
    },
    onCancel() {
      if (typeof onCancel == 'function') {
        onCancel();
      }
    },
  });
  return modal;
};
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
export const getInternetExplorerVersion = () => {
  let rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer') {
    let ua = navigator.userAgent;
    let re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
};
/**
 * @method log日志
 * @param name {string} 日志级别: log、info、warn、error
 * @param arrArgs {arguments} 日志内容
 */
export const logger = (...arrArgs) => {
  let name = 'log';
  if (arrArgs[0] == 'info' || arrArgs[0] == 'warn' || arrArgs[0] == 'error') {
    name = arrArgs[0];
    arrArgs = arrArgs.slice(1);
  }
  arrArgs.unshift(new Date());
  if (typeof console[name] == 'function') {
    console[name].apply(console, arrArgs);
  }
};
