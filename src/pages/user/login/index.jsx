import { Alert } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import LoginComponents from './components/Login';
import styles from './style.less';

const { UserName, Password, Submit } = LoginComponents;

@connect(({ userLogin, loading }) => ({
  userLogin,
  submitting: loading.effects['userLogin/login'],
}))
class Login extends Component {
  loginForm = undefined;

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userLogin/login',
        payload: { ...values },
      });
    }
  };

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { submitting } = this.props;
    return (
      <div className={styles.main}>
        <p style={{color: 'red'}}>Đăng nhập bằng admin placeholder input. Tài khoản resgiter không đủ quyền Login</p>
        <LoginComponents
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <UserName
            name="email"
            placeholder="Email xuanduyrn@gmail.com"
            rules={[
              {
                required: true,
                message: 'Nhập email!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="Mật khẩu 12345678"
            rules={[
              {
                required: true,
                message: 'Nhập mật khẩu!',
              },
            ]}
            onPressEnter={e => {
              e.preventDefault();
              this.loginForm.validateFields(this.handleSubmit);
            }}
          />
          <Submit loading={submitting}>Đăng nhập</Submit>
          <div>
            <Link className={styles.register} to="/user/register">
              Đăng kí tài khoản
            </Link>
            <Link
              style={{
                float: 'right',
              }}
              to="/user/forgot-password"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
