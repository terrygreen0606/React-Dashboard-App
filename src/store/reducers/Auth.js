import * as ActionTypes from '../action-types';
import Http from '../../Http';

const defaultUser = {
  id: null,
  name: null,
  email: null,
};

const initialState = {
  isAuthenticated: false,
  user: defaultUser,
};

const authLogin = (state, payload) => {
  
  const { access_token: AccessToken, returnObject:user } = payload;
  sessionStorage.setItem('access_token', AccessToken);
  sessionStorage.setItem('user', JSON.stringify(user));
  Http.defaults.headers.common.Authorization = `Bearer ${AccessToken}`;
  const stateObj = Object.assign({}, state, {
    isAuthenticated: true,
    user,
  });
  return stateObj;
};

const checkAuth = (state) => {
  const stateObj = Object.assign({}, state, {
    isAuthenticated: !!sessionStorage.getItem('access_token'),
    user: JSON.parse(sessionStorage.getItem('user')),
  });
  if (state.isAuthenticated) {
    Http.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem('access_token')}`;
  }
  return stateObj;
};

const logout = (state) => {
  sessionStorage.clear();
  const stateObj = Object.assign({}, state, {
    isAuthenticated: false,
    user: defaultUser,
  });
  return stateObj;
};

const Auth = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.AUTH_LOGIN:
      return authLogin(state, payload);
    case ActionTypes.AUTH_CHECK:
      return checkAuth(state);
    case ActionTypes.AUTH_LOGOUT:
      return logout(state);
    default:
      return state;
  }
};

export default Auth;
