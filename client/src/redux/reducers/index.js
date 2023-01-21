import { combineReducers } from 'redux';
import unavailabilitiesReducer from './unavailabilitiesReducer';
import crossReducer from './crossReducer';
import referentielReducer from './referentielReducer';
import productionCategoriesReducer from './productionCategoriesReducer';

const rootReducer = combineReducers({
  unavailabilities: unavailabilitiesReducer,
  referentiel: referentielReducer,
  productionCategories: productionCategoriesReducer,
  cross: crossReducer,
});

export default rootReducer;
