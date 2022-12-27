/*
 unusual syntax of ES6 GENERATORS like ‘yield’ and ‘*’.
 We export from this file function rootSaga in which we call function actionWatcher.
 To put it simple it’s like I’m telling SAGA to wait for action ‘GET_NEWS’ to get dispatched.
 And ones ‘GET_NEWS’ was dispathced to call fetchNews function.
 Inside of fetchNews function happens asynchronous call to API and
when request arrived next action { type: “NEWS_RECEIVED”, json: json.articles, } 
is dispatched. As you can see we don’t even need 
to write action “NEWS_RECEIVED” in actions/index.js file because it’s fully described here.
*/

import { put, takeLatest, all } from 'redux-saga/effects';
import { getUnavailabilities } from '../../api';
import { actionTypes } from '../actionTypes';

function* fetchUnavailabilities() {
  const data = yield getUnavailabilities().then(response => {
    return response;
  });
  yield put({ type: actionTypes.UNAVAILABILITIES_RECEIVED, data });
}

function* actionWatcher() {
  yield takeLatest(
    actionTypes.LOAD_UNAVAILABILITIES_REQUEST,
    fetchUnavailabilities,
  );
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
