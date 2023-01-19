import moment from 'moment';
import { actionTypes } from '../actionTypes';

const initialState = {
  loadings: {
    unavailabilities: true,
    unavailabilitiesRefresh: false,
  },
  unavailabilities: [],
  error: '',
  overview: {},
  lastRefreshDate: '',
};
// eslint-disable-next-line default-param-last
const unavailabilitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_UNAVAILABILITIES_REQUEST: {
      return {
        ...state,
      };
    }
    case actionTypes.UNAVAILABILITIES_RECEIVED_SUCCESS: {
      return {
        ...state,
        unavailabilities: [...action.data.unavailabilities],
        loadings: {
          ...state.loadings,
          unavailabilities: false,
        },
        overview: { ...action.data.overview },
        lastRefreshDate: moment().format('DD/MM/YYYY - HH[h]mm'),
      };
    }
    case actionTypes.UNAVAILABILITIES_RECEIVED_FAIL: {
      return {
        ...state,
        loadings: {
          ...state.loadings,
          unavailabilities: false,
        },
        error: action.message.message,
      };
    }
    case actionTypes.REFRESH_UNAVAILABILITIES_REQUEST: {
      return {
        ...state,
        loadings: {
          ...state.loadings,
          unavailabilitiesRefresh: true,
        },
      };
    }
    case actionTypes.UNAVAILABILITIES_REFRESHED_SUCCESS: {
      return {
        ...state,
        unavailabilities: [...action.data.unavailabilities],
        loadings: {
          ...state.loadings,
          unavailabilitiesRefresh: false,
        },
        overview: { ...action.data.overview },
        lastRefreshDate: moment().format('DD/MM/YYYY - HH[h]mm'),
      };
    }
    case actionTypes.UNAVAILABILITIES_REFRESHED_FAIL: {
      return {
        ...state,
        loadings: {
          ...state.loadings,
          unavailabilitiesRefresh: false,
        },
        error: action.message.message,
      };
    }

    default: {
      return state;
    }
  }
};
export default unavailabilitiesReducer;
