/*
 * @Author: Michael 
 * @Date: 2019-06-03 19:49:36 
 * @Last Modified by: Michael
 * @Last Modified time: 2019-06-04 17:01:13
 * 新建文章
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Tabs, Button, message } from 'antd';
import marked from 'marked';
import hljs from 'highlight.js';
import fetch from '@/core/fetch';
import './AddArticle.scss';

const Item = Form.Item;
const { TabPane } = Tabs;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

@withRouter
class AddArticle extends Component {
  constructor() {
    super();
    this.state = {
      title: "",  // 文章title
      content: ""  // 文章内容
    }
  }

  componentDidMount() {
    // marked相关配置
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
    });
  }

  handleChangeTitle = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  handleChangeContent = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  handleSave = () => {
    const { title, content } = this.state;
    if (!title) {
      message.info("title不能为空");
      return;
    }
    if (!content) {
      message.info("content不能为空");
      return;
    }
    const query = {
      uid: window.localStorage.getItem('uid'),
      title,
      content
    };

    fetch.post('/blog/add', query).then(res => {
      if (res.resultCode === 0) {
        message.success('保存成功');
        this.props.history.push('/');
      }
    })

  }

  render() {
    const { title, content } = this.state;
    return (
      <div className="add-article">
        <Form  {...formItemLayout}>
          <Item label="标题">
            <Input value={title} onChange={this.handleChangeTitle}></Input>
          </Item>
          <Item label="内容">
            <Tabs type="card">
              <TabPane tab="write" key="write">
                <TextArea rows={20} className="write-textarea" value={content} onChange={this.handleChangeContent}></TextArea>
              </TabPane>
              <TabPane tab="preview" key="preview">
                <div
                  id="content"
                  className="article-detail"
                  dangerouslySetInnerHTML={{
                    __html: content ? marked(content) : null,
                  }}
                />
              </TabPane>
            </Tabs>
          </Item>
          <Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" className="save-btn" onClick={this.handleSave}>保存</Button>
          </Item>
        </Form>
      </div >
    )
  }
}

export default AddArticle;
