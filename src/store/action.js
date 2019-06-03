/*
 * @Author: Michael 
 * @Date: 2019-05-29 20:15:50 
 * @Last Modified by: Michael
 * @Last Modified time: 2019-05-30 21:40:51
 */

import { ADD_TOKEN, ADD_UID, ADD_NICKNAME } from './types';

export function addToken(token) {
  return { type: ADD_TOKEN, token }
}

export function addUid(uid) {
  return { type: ADD_UID, uid }
}

export function addNickname(nickName) {
  return { type: ADD_NICKNAME, nickName }
}
