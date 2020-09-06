import SIGN_IN from './actionTypes';
import { SignIn, Login as LoginAction } from './actions';
import AuthReducer from './reducer';

export { SIGN_IN, SignIn, LoginAction, AuthReducer };

// NOTE:
// do not use this index js in actionTypes.js / reducer.js / actions it will cause cyclic dependency
// solution use redux related file directly  ex: use actionTypes directly in actions
// no need to export SIGN_IN const until used in container or any other file.
