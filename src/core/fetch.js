/*
 * @Author: Michael
 * @Date: 2019-05-24 16:03:07
 * @Last Modified by: Michael
 * @Last Modified time: 2019-06-04 17:28:40
 */

import CONFIG from './config';
import axios from 'axios';
import { message } from 'antd';

class Fetch {
  constructor() {
    this.timeout = 30000;
    this.responseType = 'json';
    this.headers = {
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  }

  /**
   *
   * @param {*} method  请求方法
   * @param {*} url  
   * @param {*} data
   * @returns
   * @memberof Fetch
   */
  fetch(method, url, data) {
    return new Promise((resolve, reject) => {
      let SERVER = CONFIG.localServer;
      const instance = axios.create({
        timeout: this.timeout,
        responseType: this.responseType,
        headers: this.headers,
      });

      const token = window.localStorage.getItem('token'),
        uid = window.localStorage.getItem('uid');

      if (token && uid) {
        data.token = token;
        data.uid = uid;
      }

      if (method !== 'GET' && this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        instance.defaults.transformRequest = [queryParam => {
          let ret = '';
          const queryKeys = Object.keys(queryParam);
          queryKeys.forEach((item, index) => {
            if (index < queryKeys.length - 1) {
              ret += `${encodeURIComponent(item)}=${encodeURIComponent(queryParam[item])}&`;
            } else {
              ret += `${encodeURIComponent(item)}=${encodeURIComponent(queryParam[item])}`;
            }
          });
          ret.replace(/&$/, '');
          return ret;
        }]
      }

      instance.interceptors.request.use(config => {
        return config;
      }, (error) => {
        return Promise.reject(error);
      });

      instance.interceptors.response.use(response => {
        if (response.data.resultCode !== 0) {
          message.error(response.data.resultMsg);
          if (response.data.resultCode === 4) {
            localStorage.removeItem("token");
            localStorage.removeItem("uid");
          }
          return Promise.reject(response.data);
        }
        return response;
      }, (error) => {
        // if (error.resultCode !== 302 &&  error.message === 'Network Error') {
        //   window.weui.topTips(ResponseText.ERROR_DOWN);
        // }
        if (error.response.status === 400) {
        }
        if (error.response.status === 404) {
        } else if (error.response.status === 500) {
        }
        return Promise.reject(error.response.data.message);
      });

      let config;
      if (method === 'GET') {
        config = Object.assign({ params: data, url: SERVER + url, method });
      } else {
        config = Object.assign({ data, url: SERVER + url, method });
      }
      instance(config).then(res => {
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    });
  }
}

const httpTypeArray = ['post', 'get', 'put'];

httpTypeArray.forEach(item => {
  Fetch.prototype[item] = function (url, data, showLoading = true, serverType = 'server') {
    this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return this.fetch(item.toUpperCase(), url, data, showLoading, serverType);
  };
});

export default new Fetch();
