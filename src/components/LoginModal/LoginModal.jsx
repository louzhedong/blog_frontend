/*
 * @Author: Michael 
 * @Date: 2019-05-23 15:31:08 
 * @Last Modified by: Michael
 * @Last Modified time: 2019-05-30 21:43:40
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';
import { Modal, Form, Input, Icon, Button, message } from 'antd';
import { addToken, addUid, addNickname } from '../../store/action';
import fetch from '../../core/fetch';
import './LoginModal.scss';

const Item = Form.Item;

const mapStateToProps = state => {
  return {
    token: state.user.token,
    uid: state.user.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToken: token => {
      dispatch(addToken(token));
    },
    addUid: uid => {
      dispatch(addUid(uid));
    },
    addNickname: nickName => {
      dispatch(addNickname(nickName));
    }
  }
}

class LoginModal extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  handleLogin = () => {
    const { username, password } = this.state;
    const { addToken, addUid, addNickname } = this.props;
    if (!username) {
      message.error("请输入用户名");
      return;
    }
    if (!password) {
      message.error("请输入密码")
      return;
    }

    const param = {
      username,
      password: md5(password)
    };

    fetch.post('/auth/login', param).then(res => {
      const data = res.data;
      addToken(data.token);
      addUid(data.uid);
      addNickname(data.nickName);
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('uid', data.uid);
      this.setState({
        username: '',
        password: '',
      });
      message.success('登录成功');
      this.props.hide();
    })
  }

  render() {
    const { username, password } = this.state;
    return (
      <Modal
        title="登录"
        visible={this.props.visible}
        width={400}
        footer={null}
        onCancel={this.props.hide}
      >
        <Form className="login-form">
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
            <span className="login-form-forgot">
              修改密码
          </span>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleLogin}>
              登录
          </Button>
          </Item>
        </Form>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);