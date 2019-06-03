/*
 * @Author: Michael 
 * @Date: 2019-05-23 11:47:26 
 * @Last Modified by: Michael
 * @Last Modified time: 2019-05-31 17:13:41
 */

import React, { Component } from 'react';
import { Button, Icon, Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import LoginModal from '../LoginModal/LoginModal';
import { addToken, addUid, addNickname } from '../../store/action';
import fetch from '../../core/fetch';
import RegModal from '../RegModal/RegModal';
import './Header.scss';

const mapStateToProps = state => {
  return {
    token: state.user.token,
    uid: state.user.uid,
    nickName: state.user.nickName
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

const pullDownMenu = (
  <Menu>
    <Menu.Item>
      个人信息
    </Menu.Item>
    <Menu.Item>
      退出
    </Menu.Item>
  </Menu>
);

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showLoginModal: false,
      showRegModal: false
    }
  }

  componentDidMount() {
    const { addToken, addUid } = this.props;
    const token = window.localStorage.getItem("token");
    const uid = window.localStorage.getItem("uid");
    if (token && uid) {
      addToken(token);
      addUid(uid);
      this.getNickName();
    }
  }

  getNickName = () => {
    const { addNickname } = this.props;
    fetch.post('/user/get/nickname', {}).then(res => {
      addNickname(res.data.nickName);
    })
  }

  // 显示登录模态框
  handleShowLoginModal = () => {
    this.setState({
      showLoginModal: true
    });
  }

  // 关闭登录模态框
  handleHideLoginModal = () => {
    this.setState({
      showLoginModal: false
    })
  }

  // 显示注册模态框
  handleShowRegModal = () => {
    this.setState({
      showRegModal: true
    })
  }

  // 关闭注册模态框
  handleHideRegModal = () => {
    this.setState({
      showRegModal: false
    })
  }

  // 退出
  handleLogout = () => {

  }

  render() {
    const { showLoginModal, showRegModal } = this.state;
    const { token, nickName } = this.props;
    return (
      <div className="header">
        <div className="width-limit">
          <div className="wrap-right">
            {!token && <Button type="primary" className="login-btn" shape="round" size="small" onClick={this.handleShowLoginModal}><Icon type="login" />登录</Button>}
            {!token && <Button className="reg-btn" shape="round" size="small" onClick={this.handleShowRegModal}>注册</Button>}
            {token && <Dropdown overlay={pullDownMenu}>
              <span className="nick-name">{nickName}</span>
            </Dropdown>}
            <Button type="dashed" className="write-btn" shape="round" size="small"><Icon type="edit" />写文章</Button>
          </div>
        </div>
        <LoginModal visible={showLoginModal} hide={this.handleHideLoginModal}></LoginModal>
        <RegModal visible={showRegModal} hide={this.handleHideRegModal}></RegModal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
