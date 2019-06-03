/*
 * @Author: Michael 
 * @Date: 2019-05-29 20:21:08 
 * @Last Modified by: Michael
 * @Last Modified time: 2019-05-30 21:40:11
 */
import { combineReducers } from 'redux';
import initialState from './state';
import { ADD_TOKEN, ADD_UID, ADD_NICKNAME } from './types';

function user(state = initialState, action) {
  switch (action.type) {
    case ADD_TOKEN:
      return Object.assign({}, state, {
        token: action.token
      });
    case ADD_UID:
      return Object.assign({}, state, {
        uid: action.uid
      });

    case ADD_NICKNAME:
      return Object.assign({}, state, {
        nickName: action.nickName
      });
    default:
      return state;
  }
}

const todoApp = combineReducers({
  user
});

export default todoApp;

