import { combineReducers } from 'redux';
import unavailabilitiesReducer from './unavailabilitiesReducer';
import crossReducer from './crossReducer';

const rootReducer = combineReducers({
  unavailabilities: unavailabilitiesReducer,
  cross: crossReducer,
});

export default rootReducer;
