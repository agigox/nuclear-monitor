import { combineReducers } from 'redux';
import unavailabilitiesReducer from './unavailabilitiesReducer';
import othersReducer from './othersReducer';

const rootReducer = combineReducers({
  unavailabilities: unavailabilitiesReducer,
  others: othersReducer,
});

export default rootReducer;
