import referentielReducer from './referentielReducer';
import productionCategoriesReducer from './productionCategoriesReducer';

import crossReducer from './crossReducer';
import productionsReducer from './productionsReducer';
import dataReducer from './dataReducer';
import pmaxReducer from './pmaxReducer';

export default {
  referentiel: referentielReducer,
  productionCategories: productionCategoriesReducer,
  productions: productionsReducer,
  data: dataReducer,
  pmax: pmaxReducer,
  cross: crossReducer,
};
