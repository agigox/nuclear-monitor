// import { combineReducers } from 'redux';
// import unavailabilitiesReducer from './unavailabilitiesReducer';
import referentielReducer from './referentielReducer';
import productionCategoriesReducer from './productionCategoriesReducer';

import crossReducer from './crossReducer';
import productionsReducer from './productionsReducer';
import pmaxReducer from './pmaxReducer';

/*
const rootReducer = combineReducers({
  unavailabilities: unavailabilitiesReducer,
  referentiel: referentielReducer,
  productionCategories: productionCategoriesReducer,
  cross: crossReducer,
});
*/
export default {
  referentiel: referentielReducer,
  productionCategories: productionCategoriesReducer,
  productions: productionsReducer,
  pmax: pmaxReducer,
  cross: crossReducer,
};
