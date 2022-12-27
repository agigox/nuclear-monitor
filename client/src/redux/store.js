import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import getNuclearData from './reducers';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  getNuclearData,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
