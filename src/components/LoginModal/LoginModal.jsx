/*
 * @Author: Michael 
 * @Date: 2019-05-23 15:31:08 
 * @Last Modified by: Michael
 * @Last Modified time: 2019-05-23 18:27:40
 */
import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Button } from 'antd';
import './LoginModal.scss';

const Item = Form.Item;

export default class LoginModal extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <Modal
        title="登录"
        visible={this.props.visible}
        width={400}
        footer={null}
      >
        <Form className="login-form">
          <Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              value={username}
            />
          </Item>
          <Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              value={password}
            />
          </Item>
          <Item>
            <a className="login-form-forgot" href="">
              Forgot password
          </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>
          </Item>
        </Form>
      </Modal>
    )
  }
}