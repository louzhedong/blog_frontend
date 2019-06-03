/*
 * @Author: Michael 
 * @Date: 2019-05-24 16:08:28 
 * @Last Modified by: Michael
 * @Last Modified time: 2019-05-29 19:50:24
 */
import React, { Component } from 'react';
import md5 from 'md5';
import { Modal, Form, Input, Icon, Button, message } from 'antd';
import fetch from '../../core/fetch';
import './RegModal.scss';

const Item = Form.Item;

export default class RegModal extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      repassword: '',
      nickname: ''
    }
  }

  handleSave = () => {
    const { username, password, repassword, nickname } = this.state;
    if (password !== repassword) {
      message.error("两次密码不一样");
      return;
    }
    if (!username) {
      message.error("请输入用户名");
      return;
    }
    if (password.length < 6) {
      message.error("密码至少为6位");
      return;
    }
    if (!nickname) {
      message.error("请输入昵称");
      return;
    }
    const query = {
      username,
      password: md5(password),
      nickname
    };

    fetch.post('/auth/add', query).then(res => {
      if (res.resultCode === 0) {
        this.props.hide();
        message.success("注册成功");
        this.setState({
          username: "",
          password: "",
          repassword: "",
          nickname: ""
        });
      } else {
        message.error(res.resultMsg);
      }
    })
  }

  render() {
    const { username, password, repassword, nickname } = this.state;
    return (
      <Modal
        title="注册"
        visible={this.props.visible}
        width={400}
        footer={null}
        onCancel={this.props.hide}
      >
        <Form className="reg-form">
          <Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
              value={username}
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
            />
          </Item>
          <Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            />
          </Item>
          <Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="确认密码"
              value={repassword}
              onChange={(e) => {
                this.setState({ repassword: e.target.value });
              }}
            />
          </Item>
          <Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="昵称"
              value={nickname}
              onChange={(e) => {
                this.setState({ nickname: e.target.value });
              }}
            />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="reg-form-button" onClick={this.handleSave}>
              注册
          </Button>
          </Item>
        </Form>
      </Modal>
    )
  }
}