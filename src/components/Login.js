import React, { Component, PropTypes } from 'react';
import { Form, Input } from './index';
import './Login.less';
import { getConfig } from '../config';
const url = getConfig().url;
const createForm = Form.create;
const FormItem = Form.Item;
const onFieldsChange = (props, fields) => {
  if (typeof fields.password != 'undefined') {
    props.fields.password = fields.password.value;
  }
  if (typeof fields.username != 'undefined') {
    props.fields.username = fields.username.value;
  }
};
const mapPropsToFields = (props) => {
  return {
    username: {
      value: props.fields.username,
    },
    password: {
      value: props.fields.password,
    },
  };
};
const LoginForm = createForm({
  onFieldsChange,
  mapPropsToFields,
})(props => {
  const { getFieldDecorator, getFieldError, isFieldValidating } = props.form;
  const { isLoginErrorVisible, loginErrorText, validUsername, validPassword, handleSubmit } = props;
  const formItemLayout = {};
  return (
    <Form horizontal>
      <FormItem
        {...formItemLayout}
        hasFeedback
        help={isFieldValidating('username') ? '校验中...' : (getFieldError('username') || []).join(', ')}
        prefixCls="username"
      >
        {getFieldDecorator('username', {
          rules: [
            { validator: validUsername },
          ],
          validateTrigger: 'onBlur',
        })(
          <Input
            type="text"
            placeholder="操作员编号"
            autoComplete="off"
            addonBefore={<i className="iconfont">&#xe616;</i>}
          />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        hasFeedback
        prefixCls="password"
      >
        {getFieldDecorator('password', {
          rules: [
            { validator: validPassword },
          ],
        })(
          <Input
            type="password"
            placeholder="密码"
            autoComplete="off"
            addonBefore={<i className="iconfont">&#xe617;</i>}
            onPressEnter={handleSubmit}
          />
        )}
      </FormItem>
      <div className="login-result" style={{display: isLoginErrorVisible ? 'block' : 'none'}}>{loginErrorText}</div>
    </Form>
  );
});
class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectAfterLogin = this.redirectAfterLogin.bind(this);
    this.validUsername = this.validUsername.bind(this);
    this.validPassword = this.validPassword.bind(this);
  }

  componentDidMount() {
  }

  // 登录成功后跳工作台页面
  redirectAfterLogin() {
    location.replace(url.list);
  }

  handleSubmit() {
    const login = this.refs.loginForm;
    const { onLoadLogin } = login.props;
    const form = login.getForm();
    const { validateFields, getFieldValue } = form;
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      onLoadLogin(() => {
        this.redirectAfterLogin();
      });
    });

  }

  validUsername(rule, value, callback) {
    const { onInputError } = this.props;
    let errMesg;
    if (!value) {
      errMesg = '账号不能为空';
      callback([new Error(errMesg)]);
      onInputError(errMesg);
    } else {
      if (!/\d{11}/.test(value)) {
        errMesg = '请输入正确的手机号码';
        callback([new Error(errMesg)]);
        onInputError(errMesg);
      }
    }
    callback();
  }

  validPassword(rule, value, callback) {
    const { onInputError } = this.props;
    let errMesg;
    if (!value.trim()) {
      errMesg = '请输入密码';
      callback([new Error('请输入密码')]);
      onInputError(errMesg);
    }
    callback();
  }

  render() {
    return (
      <div className="ant-row login-wrap">
        <i className="iconfont logo">&#xe601;</i>
        <h3 className="title">客服管理平台</h3>
        <LoginForm
          ref="loginForm"
          {...this.props}
          validUsername={this.validUsername}
          validPassword={this.validPassword}
          handleSubmit={this.handleSubmit}
        />
        <button className="login-btn" onClick={this.handleSubmit}><i className="iconfont">&#xe620;</i></button>
      </div>
    );
  }
}

App.propTypes = {
  fields: PropTypes.object,
  isLoginErrorVisible: PropTypes.bool,
  loginErrorText: PropTypes.string,
  onLoadLogin: PropTypes.func,
  onInputError: PropTypes.func,
};

App.defaultProps = {
  isLoginErrorVisible: false,
  loginErrorText: '',
  onInputError: () => {},
};

export default App;
