/*
 * @Author: Michael
 * @Date: 2019-06-03 14:23:55
 * @Last Modified by: Michael
 * @Last Modified time: 2019-06-03 14:42:40
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserInfo.scss';

const avatarImg = require('../../assets/image/iron_man.jpeg');

const mapStateToProps = state => {
  return {
    nickName: state.user.nickName
  }
}

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className="user-info">
        <img className="user-avatar" src={avatarImg} alt="" />
        <div className="user-name">{this.props.nickName}</div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(UserInfo);
