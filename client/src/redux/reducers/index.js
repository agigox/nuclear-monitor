import { combineReducers } from 'redux';
import unavailabilitiesReducer from './unavailabilitiesReducer';
import crossReducer from './crossReducer';
import referentielReducer from './referentielReducer';
import productionTypesReducer from './productionTypesReducer';

const rootReducer = combineReducers({
  unavailabilities: unavailabilitiesReducer,
  referentiel: referentielReducer,
  productionTypes: productionTypesReducer,
  cross: crossReducer,
});

export default rootReducer;
