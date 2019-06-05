/*
 * @Author: Michael 
 * @Date: 2019-06-03 14:16:10 
 * @Last Modified by: Michael
 * @Last Modified time: 2019-06-04 10:26:00
 */
import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { withRouter } from 'react-router';
import Index from '@/pages/Index/Index';
import Article from '@/pages/Article/Article';
import AddArticle from '@/pages/AddArticle/AddArticle';
import './Main.scss';

class Main extends Component {

  render() {
    return (
      <div className="main-page">
        <Route path="/" exact component={Index} />
        <Route path="/article" component={Article} />
        <Route path="/add_article" component={AddArticle} />
      </div>
    )
  }
}

export default withRouter(Main);