/*
 * @Author: Michael 
 * @Date: 2019-05-23 11:47:26 
 * @Last Modified by: Michael
 * @Last Modified time: 2019-05-23 15:44:01
 */

import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import LoginModal from '../LoginModal/LoginModal';
import './Header.scss';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      showLoginModal: false
    }
  }

  // 显示登录模态框
  handleShowLoginModal = () => {
    this.setState({
      showLoginModal: true
    });
  }

  render() {
    const { showLoginModal } = this.state;
    return (
      <div className="header">
        <div className="width-limit">
          <div className="wrap-right">
            <Button type="primary" className="login-btn" shape="round" size="small" onClick={this.handleShowLoginModal}><Icon type="login" />登录</Button>
            <Button className="reg-btn" shape="round" size="small">注册</Button>
            <Button type="dashed" className="write-btn" shape="round" size="small"><Icon type="edit" />写文章</Button>
          </div>
        </div>
        <LoginModal visible={showLoginModal}></LoginModal>
      </div>
    )
  }
}
