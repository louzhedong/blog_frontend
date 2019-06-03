/*
 * @Author: Michael 
 * @Date: 2019-05-23 11:42:49 
 * @Last Modified by: Michael
 * @Last Modified time: 2019-06-03 17:12:50
 */
import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Main from '../Main/Main';
import UserInfo from '../../components/UserInfo/UserInfo';
import './Home.scss';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: 'michael'
    }
  }

  render() {
    return (
      <div className="home">
        <Header></Header>
        <div className="base-content">
          <Main></Main>
          <UserInfo></UserInfo>
        </div>
      </div>
    )
  }
}