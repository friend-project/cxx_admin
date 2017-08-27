import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Form, Input } from 'antd';
import md5 from 'md5';

import cfg from  './../../../config/app';
import { loginCheck } from './action';

const FormItem = Form.Item;

class Login extends Component {
  _login() {
    const {
      form: {
        validateFieldsAndScroll,
      },
    } = this.props;
    validateFieldsAndScroll((error, value) => {
      if (error) return false;

      value.password = md5(value.password)
      const { dispatch } = this.props;
      dispatch(loginCheck(value));
    });
  }

  render() {
    const {
      isFetching,
      response,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
    } = this.props;
    if (response && response.code === 0) {
      this.props.history.push('/main');
    }
    return (
      <div>
        <div>
          <img src={cfg.logo} alt={cfg.name} />
        </div>
        <form>
          <FormItem hasFeedback>
            {
              getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                  },
                ],
                })(<Input size="large" ref={c => (this.username = c)} placeholder="username" />)
            }
          </FormItem>
          <FormItem hasFeedback>
            {
              getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  }
                ],
                })(<Input size="large" ref={c => (this.username = c)} placeholder="password" />)
            }
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={() => this._login()} loading={isFetching}>Sign in</Button>
            <p>{isFetching ? '账号验证中' : ''}</p>
            <p>{response ? response.message : ''}</p>
          </Row>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { error, isFetching, response } = state.login;

  return { error, isFetching, response };
};

export default connect(mapStateToProps)(Form.create()(Login));

