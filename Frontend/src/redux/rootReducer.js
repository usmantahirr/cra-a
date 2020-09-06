import { combineReducers } from 'redux';
import AuthRedux from '../modules/auth/redux/index';

// it will return all reducers to the redux store
export default combineReducers({
  auth: AuthRedux.AuthReducer,
  // darboard: dashboardReducer,
});
