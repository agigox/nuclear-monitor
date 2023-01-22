// import { combineReducers } from 'redux';
// import unavailabilitiesReducer from './unavailabilitiesReducer';
// import referentielReducer from './referentielReducer';
import productionCategoriesReducer from './productionCategoriesReducer';

import crossReducer from './crossReducer';

/*
const rootReducer = combineReducers({
  unavailabilities: unavailabilitiesReducer,
  referentiel: referentielReducer,
  productionCategories: productionCategoriesReducer,
  cross: crossReducer,
});
*/
export default {
  // referentiel: referentielReducer,
  productionCategories: productionCategoriesReducer,
  cross: crossReducer,
};
