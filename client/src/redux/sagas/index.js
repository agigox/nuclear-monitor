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
  getProductionCategories,
} from '../../api';
import { actionTypes } from '../actionTypes';
import { loadProductionCategoriesSuccess } from '../reducers/productionCategoriesReducer';

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
function* fetchProductionCategories() {
  try {
    const data = yield getProductionCategories().then((response) => response);
    yield put(loadProductionCategoriesSuccess(data));
  } catch (e) {
    yield put({
      type: actionTypes.PRODUCTION_CATEGORIES_RECEIVED_FAIL,
      message: e,
    });
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
    LOAD_PRODUCTION_CATEGORIES_REQUEST,
  } = actionTypes;
  yield takeLatest(LOAD_UNAVAILABILITIES_REQUEST, fetchUnavailabilities);
  yield takeLatest(REFRESH_UNAVAILABILITIES_REQUEST, refreshUnavailabilities);
  yield takeLatest(LOAD_REFERENTIEL_REQUEST, fetchReferentiel);
  yield takeLatest(
    LOAD_PRODUCTION_CATEGORIES_REQUEST,
    fetchProductionCategories,
  );
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
