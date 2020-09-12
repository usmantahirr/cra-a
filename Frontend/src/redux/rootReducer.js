import { combineReducers } from 'redux';
import AuthRedux from '../modules/auth/redux/index';
import { DashboardReducer } from '../modules/dashboard/redux';

// it will return all reducers to the redux store
export default combineReducers({
  auth: AuthRedux.AuthReducer,
  dashboard: DashboardReducer,
});
