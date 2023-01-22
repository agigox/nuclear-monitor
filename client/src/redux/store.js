// import { createStore, applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';

// import rootSaga from './sagas';

// const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default configureStore({
  reducer: rootReducer,
});

// sagaMiddleware.run(rootSaga);
