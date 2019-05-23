/*
 * @Author: Michael 
 * @Date: 2019-05-23 11:42:49 
 * @Last Modified by: Michael
 * @Last Modified time: 2019-05-23 11:54:04
 */
import React, { Component } from 'react';
import Header from '../components/Header/Header';

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
      </div>
    )
  }
}