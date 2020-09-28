import querystring from 'querystring';
import Http from '../../Http';
import { loader } from '../../store/actions';
import * as action from '../../store/actions/accounting';
import { toastAction } from '../../store/actions/toast-actions';
/*********** Add Account Type ************/
const apiUrl = process.env.REACT_APP_API_URL;
/*********** Get Account type list **************/
export function bankingList(params = {}) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/listBankAccount?${query}` : `${apiUrl}/api/v1/listBankAccount`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    if(params.type === 'expense'){
                        dispatch(action.getBankingList({ expenseBank: res.data.returnObject, total_rows: res.data.total_rows, size: !params['page'] ? res.data.total_rows : res.data.size }));
                    } else {
                        dispatch(action.getBankingList({ bankingList: res.data.returnObject, total_rows: res.data.total_rows, size: !params['page'] ? res.data.total_rows : res.data.size }));
                    }                    
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response ? err.response['data'] : {};
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loader(false));
                    return reject(data);
                });
        })
    );
}
/*********** Make deposit action **************/
export function makeDeposit(params = {}) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(`${apiUrl}/api/v1/makeDeposit`, params)
                .then((res) => {
                    toastAction(true, res.data.message);
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response ? err.response['data'] : {};
                    const data = {
                        status,
                        errors,
                    };
                    toastAction(false, errors);
                    dispatch(loader(false));
                    return reject(data);
                });
        })
    );
}

/*********** Write Check action **************/
export function writeCheck(params = {}) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(`${apiUrl}/api/v1/writeCheck`, params)
                .then((res) => {
                    toastAction(true, res.data.message);
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response ? err.response['data'] : {};
                    const data = {
                        status,
                        errors,
                    };
                    toastAction(false, errors);
                    dispatch(loader(false));
                    return reject(data);
                });
        })
    );
}

/*********** Make transfer action **************/
export function makeTransfer(params = {}) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(`${apiUrl}/api/v1/makeTransfer`, params)
                .then((res) => {
                    toastAction(true, res.data.message);
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response ? err.response['data'] : {};
                    const data = {
                        status,
                        errors,
                    };
                    toastAction(false, errors);
                    dispatch(loader(false));
                    return reject(data);
                });
        })
    );
}
/*********** Get Ending Balance action **************/
export function getEndingBalance(params = {}, callBack) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/getEndingBalance?${query}` : `${apiUrl}/api/v1/getEndingBalance`;
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get(url)
                .then((res) => {
                    callBack(res.data.returnObject);
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response ? err.response['data'] : {};
                    const data = {
                        status,
                        errors,
                    };
                    toastAction(false, errors);
                    callBack(null);
                    return reject(data);
                });
        })
    );
}

export function getReconcileOpeningBalance(params = {}, callBack) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/getReconcileOpeningBalance?${query}` : `${apiUrl}/api/v1/getReconcileOpeningBalance`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(loader(false));
                    callBack(res.data.returnObject);
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response ? err.response['data'] : {};
                    const data = {
                        status,
                        errors,
                    };
                    toastAction(false, errors);
                    dispatch(loader(false));
                    callBack(null);
                    return reject(data);
                });
        })
    );
}
/*********** Make transfer action **************/
export function getTransactionDetails(params = {}) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(`${apiUrl}/api/v1/getTransactionDetails`, params)
                .then((res) => {
                    toastAction(true, res.data.message);
                    dispatch(action.getReconcileBank({ ...res.data.returnObject, Common: { ...res.data.returnObject["Common"], ...params } }))
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response ? err.response['data'] : {};
                    const data = {
                        status,
                        errors,
                    };
                    toastAction(false, errors);
                    dispatch(loader(false));
                    return reject(data);
                });
        })
    );
}

/*********** Save reconcile transaction action **************/
export function saveReconcileTransactions(params = {}) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(`${apiUrl}/api/v1/saveReconcileTransactions`, params)
                .then((res) => {
                    toastAction(true, res.data.message);
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response ? err.response['data'] : {};
                    const data = {
                        status,
                        errors,
                    };
                    toastAction(false, errors);
                    dispatch(loader(false));
                    return reject(data);
                });
        })
    );
}