// import { createStore, applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import rootReducer from './reducers';
import { pokemonApi } from '../api/pokemon';

// import rootSaga from './sagas';

// const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore({
  reducer: { ...rootReducer, [pokemonApi.reducerPath]: pokemonApi.reducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokemonApi.middleware);
  },
});
setupListeners(store.dispatch);
export default store;
// sagaMiddleware.run(rootSaga);
