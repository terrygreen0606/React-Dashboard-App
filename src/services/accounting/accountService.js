import querystring from 'querystring';
import Http from '../../Http';
import { loader } from '../../store/actions';
import * as action from '../../store/actions/accounting';
import { toastAction } from '../../store/actions/toast-actions';
/*********** Add Account Type ************/
const apiUrl = process.env.REACT_APP_API_URL;
export function accountType(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(`${apiUrl}/api/v1/saveAccountType`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}
/*********** Update Account Type ************/
export function updateAccountType(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/editAccountType`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}
/*********** Get Account type list **************/
export function accountTypeList(params = {}) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/getAccountsType?${query}` : `${apiUrl}/api/v1/getAccountsType`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(action.getAccountTypes({ list: res.data.returnObject, total_rows: res.data.total_rows || 0, size: res.data.size }));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}

/*********** Get Tax LIne list **************/
export function accountTaxLine() {
    const url = `${apiUrl}/api/v1/getTaxData`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(action.getTaxLine({ list: res.data.returnObject}));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}

/*********** Get Account type delete **************/
export function accountTypeDelete(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.delete(`${apiUrl}/api/v1/deleteAccountType/${id}`)
                .then(() => {
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}
/*********** Add Accounts **************/
export function addAccount(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(`${apiUrl}/api/v1/saveAccount`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}
/*********** Add Accounts **************/
export function editAccount(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/editAccount`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}
/*********** Get Account type list **************/
export function accountsList(params = {}) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/listAccount?${query}` : `${apiUrl}/api/v1/listAccount`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(action.getAccounts({ list: res.data.returnObject, total_rows: res.data.total_rows || 0, size: res.data.size || 0 }));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}
/*********** Get Account type list **************/
export function accountsLedgerList(params = {}, payload) {
    const query = querystring.stringify(params);
    const url = `${apiUrl}/api/v1/searchAccount?${query}`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(url, payload)
                .then((res) => {
                    dispatch(action.getAccountLedger({ list: res.data.returnObject, total_rows: res.data.total_rows || 0, size: res.data.size  || 0}));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors);
                    return reject({ status, message, errors });
                });
        })
    );
}
/*********** Get Account delete **************/
export function accountDelete(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.delete(`${apiUrl}/api/v1/deleteAccount/${id}`)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors, message } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, message, errors });
                });
        })
    );
}

export function saveTransaction(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(`${apiUrl}/api/v1/saveGeneralEntry`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}

export function updateSingleTransaction(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/updateTransactions`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}

/*********** Get Transaction Date **************/
export function getTransactionDate(params = {}, callback) {
    const query = querystring.stringify(params);
    const url = `${apiUrl}/api/v1/getTransactionDate?${query}`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    callback(res.data.returnObject);
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response['data'] || {};
                    callback(false);
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}

/*********** Get Transactions **************/
export function getTransactions(params = {}, callback) {
    const query = querystring.stringify(params);
    const url = `${apiUrl}/api/v1/getTransactions?${query}`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(action.getTransactions({ list: res.data.returnObject || [], total_rows: res.data.total_rows || 0, size: res.data.size }));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response['data'] || {};
                    callback(false);
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}
/*********** Transactions delete **************/
export function transactionsDelete(id, type = 'multiple') {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.delete(`${apiUrl}/api/v1/deleteTransactions/${id}/delete/${type}`)
                .then(() => {
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}
export function getRenewalNoticeList(data) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiUrl + '/api/v1/getRenewalNotice', {
          params: {
            ...data
          },
        })
  
        .then((res) => {
            if (res.status === 200) {
                dispatch(action.getRenewalNoticeList(res.data)); 
                return resolve();
              } else {
                reject()
              }
          })
      })
    );
  }

  export function printRenewalNotice(data) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.post(apiUrl + '/api/v1/getRenewalNotice',data)
          .then((res) => {
            return resolve(res.data);
          })
      })
    );
  }
