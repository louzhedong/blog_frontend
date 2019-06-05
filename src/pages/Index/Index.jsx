/*
 * @Author: Michael 
 * @Date: 2019-06-03 19:42:50 
 * @Last Modified by: Michael
 * @Last Modified time: 2019-06-04 17:53:20
 */

import React, { Component } from 'react';
import fetch from '@/core/fetch';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      blogList: []
    }
  }

  componentDidMount() {
    this.getBlogList();
  }

  getBlogList = () => {
    const query = {
      pageNo: 0,
      pageSize: 10
    };
    fetch.post('/blog/list', query).then(res => {
      this.setState({
        blogList: res.data
      });
    })
  }

  render() {
    return (
      <div className="index">
        index
      </div>
    )
  }
}

export default Index;