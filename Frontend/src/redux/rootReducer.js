import { combineReducers } from 'redux';
import { AuthReducer } from '../modules/auth/redux';

// it will return all reducers to the redux store
export default combineReducers({
  auth: AuthReducer,
  // darboard: dashboardReducer,
});
