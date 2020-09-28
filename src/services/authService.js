import Http from '../Http';
import * as action from '../store/actions';
import { toastAction } from '../store/actions/toast-actions';

const apiUrl = process.env.REACT_APP_API_URL;
export function checkPermissions(data, callback) {
  return dispatch => (
    new Promise((resolve, reject) => {
      dispatch(action.loader(true));
      Http.post(apiUrl + '/api/v1/check_permission', data)
        .then((res) => {
          callback(null);
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          dispatch(action.loader(false));
          toastAction(false, errors);
          //reject(data);
          callback(errors)
        });
    })
  );
}
export function login(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      dispatch(action.loader(true));
      Http.post(apiUrl + '/api/v1/login', credentials)
        .then((res) => {
          dispatch(action.authLogin(res.data));
          return resolve();
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          dispatch(action.loader(false));
          toastAction(false, errors);
          return reject(data);
          // console.log(err);
        });
    })
  );
}

export function register(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl + '/api/v1/auth/register', credentials)
        .then(res => resolve(res.data))
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          return reject(data);
        });
    })
  );
}

export function resetPassword(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl + '/api/v1/auth/forgot-password', credentials)
        .then(res => resolve(res.data))
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          return reject(data);
        });
    })
  );
}

export function updatePassword(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl + '/api/v1/auth/password-reset', credentials)
        .then((res) => {
          const { status } = res.data.status;
          if (status === 202) {
            const data = {
              error: res.data.message,
              status,
            };
            return reject(data);
          }
          return resolve(res);
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          return reject(data);
        });
    })
  );
}

export function getQuoteBaseData(params) {
  return dispatch => {
    new Promise((resolve, reject) => {
      Http.post(apiUrl + '/api/v1/getQuoteBaseData', params)
        .then(res => {
          const { status } = res.data.status;
          if (status === 202) {
            const data = {
              error: res.data.message,
              status
            };
            return reject(data);
          }
          return resolve(res);
        })
        .catch(err => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors
          };
          return reject(data)
        })
    })
  }
}

export function getQuotesByParams(params) {
  return dispatch => {
    new Promise((resolve, reject) => {
      Http.post(apiUrl + '/api/v1/getQuoteBaseData', params)
        .then(res => {
          const { status } = res.data.status;
          console.log(res);
          if (status === 202) {
            const data = {
              error: res.data.message,
              status
            };
            return reject(data);
          }
          return resolve(res);
        })
        .catch(err => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors
          };
          return reject(data)
        })
    })
  }
}
