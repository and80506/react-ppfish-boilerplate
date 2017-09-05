// 网站头部菜单选中状态
import queryString from 'query-string';
import { getAccessToken, setAccessToken, removeAccessToken, removeUserInfo, generateAuthPassword,
  setUserInfo, ajaxFetch } from '../utils/';
import { getConfig } from '../config';
const config = getConfig();

// 获取登录信息
const fetchLogin = (fields, success) => {
  // 登录编号
  const opCompanyId = '100000';
  return dispatch => {
    return ajaxFetch({
      id: '70301300',
      data: {
        // 手机号
        mobile_code: fields.username,
        // 操作员密码
        operator_pwd: generateAuthPassword(fields.password),
        // operator_pwd: fields.password,
        // 运营商编号
        op_company_id: opCompanyId,
      }
    })
      .then((result) => {
        const redirectURL = queryString.parse(location.search).redirectURL;
        // 登录成功
        if (result.access_token) {
          // 开发环境下写cookie方便测试
          if (config.useFrontCookie) {
            setAccessToken(result.access_token);
            setUserInfo(result);
          }
        }
        dispatch(setLoginResult(result.error_no != '0', result.error_info));
        // 登录成功
        if (result.access_token) {
          if (typeof success == 'function') {
            success();
          }
          if (redirectURL) {
            location.replace(decodeURIComponent(redirectURL));
          }
        }
      });
  };
};
// 获取登出信息
const fetchLogout = (success) => {
  // 登录编号
  const opCompanyId = '100000';
  return dispatch => {
    return ajaxFetch({
      id: '70301306',
      data: {
        // 运营商编号
        op_company_id: opCompanyId,
      }
    })
      .then((result) => {
        if (config.useFrontCookie) {
          removeAccessToken();
          removeUserInfo();
        }
        if (result.error_no === '0') {
          redirectLogin();
        }
        if (typeof success == 'function') {
          success();
        }
      });
  };
};
// 跳登录页面
export const redirectLogin = (originUrl, isForce) => {
  const accessToken = getAccessToken();
  const encodeUrl = encodeURIComponent(originUrl || location.href);
  if (isForce || !accessToken) {
    location.replace(`${config.url.home}?redirectURL=${encodeUrl}&isForce=1`);
  }
};
// 点击登录按钮
export const loadLogin = (success) => {
  return (dispatch, getState) => {
    const { fields } = getState().login;
    return dispatch(fetchLogin(fields, success));
  };
};
// 点击退出按钮
export const loadLogout = () => {
  return (dispatch, getState) => {
    return dispatch(fetchLogout());
  };
};
// 高亮导航当前项
export const setMenuHighlight = (key) => {
  return {
    type: 'SET_MENU_HIGHLIGHT',
    key,
  };
};
// 设置登录结果
export const setLoginResult = (isLoginErrorVisible, loginErrorText) => {
  return {
    type: 'SET_LOGIN_RESULT',
    isLoginErrorVisible,
    loginErrorText,
  };
};
