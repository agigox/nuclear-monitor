import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import Dashboard from './dashboard';
import Error from './Error';
import { loadProductionCategories } from '../../../redux/reducers/productionCategoriesReducer';
import {
  selectCategoriesPending,
  selectError,
} from '../../../redux/selectors/productionCategoriesSelectors';

function Body() {
  const pendingCategories = useSelector(selectCategoriesPending);

  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    const loadData = async () => {
      // dispatch(appActions.referentielActions.loadReferentiel());
      dispatch(loadProductionCategories());
    };

    loadData();
  }, []);

  if (pendingCategories) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }

  return <Dashboard />;
}

export default Body;
