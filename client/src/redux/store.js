import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { addToCart } from './reducers';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default createStore(addToCart, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
