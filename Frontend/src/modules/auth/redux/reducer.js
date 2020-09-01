import SIGN_IN from './actionTypes';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...action.payload };
    default:
      return state;
  }
};

export default AuthReducer;
