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
import {
  getUnavailabilities,
  getReferentiel,
  getProductionTypes,
} from '../../api';
import { actionTypes } from '../actionTypes';

function* fetchUnavailabilities() {
  try {
    const data = yield getUnavailabilities().then((response) => response);
    yield put({ type: actionTypes.UNAVAILABILITIES_RECEIVED_SUCCESS, data });
  } catch (e) {
    yield put({ type: actionTypes.UNAVAILABILITIES_RECEIVED_FAIL, message: e });
  }
}
function* fetchReferentiel() {
  try {
    const data = yield getReferentiel().then((response) => response);
    yield put({ type: actionTypes.REFERENTIEL_RECEIVED_SUCCESS, data });
  } catch (e) {
    yield put({ type: actionTypes.REFERENTIEL_RECEIVED_FAIL, message: e });
  }
}
function* fetchProductionTypes() {
  try {
    const data = yield getProductionTypes().then((response) => response);
    yield put({ type: actionTypes.PRODUCTION_TYPES_RECEIVED_SUCCESS, data });
  } catch (e) {
    yield put({ type: actionTypes.PRODUCTION_TYPES_RECEIVED_FAIL, message: e });
  }
}
function* refreshUnavailabilities() {
  try {
    const data = yield getUnavailabilities().then((response) => response);
    yield put({ type: actionTypes.UNAVAILABILITIES_REFRESHED_SUCCESS, data });
  } catch (e) {
    yield put({
      type: actionTypes.UNAVAILABILITIES_REFRESHED_FAIL,
      message: e,
    });
  }
}

function* actionWatcher() {
  const {
    LOAD_UNAVAILABILITIES_REQUEST,
    REFRESH_UNAVAILABILITIES_REQUEST,
    LOAD_REFERENTIEL_REQUEST,
    LOAD_PRODUCTION_TYPES_REQUEST,
  } = actionTypes;
  yield takeLatest(LOAD_UNAVAILABILITIES_REQUEST, fetchUnavailabilities);
  yield takeLatest(REFRESH_UNAVAILABILITIES_REQUEST, refreshUnavailabilities);
  yield takeLatest(LOAD_REFERENTIEL_REQUEST, fetchReferentiel);
  yield takeLatest(LOAD_PRODUCTION_TYPES_REQUEST, fetchProductionTypes);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
