import GET_JSON_SCHEMA from './actionTypes';

const INITIAL_STATE = [];

const DashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_JSON_SCHEMA:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default DashboardReducer;
