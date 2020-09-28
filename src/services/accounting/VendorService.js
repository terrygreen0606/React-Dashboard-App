import querystring from 'querystring';
import Http from '../../Http';
import { loader } from '../../store/actions';
import * as action from '../../store/actions/accounting';
import { toastAction } from '../../store/actions/toast-actions';
import { LIMIT } from '../../utilities/constants';

/*********** Add Vendor ************/
const apiUrl = process.env.REACT_APP_API_URL;
export function addVendor(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(`${apiUrl}/api/v1/saveVendor`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { errors, message } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}
/*************** Update vendor ***************/
export function updateVendor(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/editVendor`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { errors, message } = err.response['data'] || {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}
/*********** Get Vendor list **************/
export function vendorListInChunk(params = {}) {
    return (dispatch, getState) => {
        const { Auth: { isAuthenticated }, accounting: { chunk_size, vendors } } = getState();
        const query = querystring.stringify(params);
        const url = `${apiUrl}/api/v1/listVendor?${query}`;
        return new Promise((resolve, reject) => {
            Http.get(url)
                .then((res) => {
                    dispatch(action.getVendor({ list: [...vendors, ...res.data.returnObject], total_rows: res.data.total_rows || 0, size: res.data.total_rows || 0 }));
                    dispatch(loader(false));
                    if (isAuthenticated && chunk_size !== 0 && res.data.returnObject.length !== 0) {
                        const page = chunk_size + 1;
                        dispatch(action.incChunkSize(page));
                        dispatch(vendorListInChunk({ page, size: LIMIT.ChunkSize }));
                    } else {
                        dispatch(action.incChunkSize(0));
                    }
                    return resolve();
                })
        })
    };
}
/*********** Get Vendor list **************/
export function vendorList(params = {}) {
    const isPage = params['page'] || 0;
    return (dispatch, getState) => {
        const { accounting: { chunk_size } } = getState();
        if (!params['page'] && chunk_size === 0) {
            params.page = 1;
            params.size = LIMIT.ChunkSize;
        }
        if (params['search']) {
            dispatch({ type: 'SEARCH_ID', payload: params['search'] })
        }
        const query = querystring.stringify(params);
        const url = query ? `${apiUrl}/api/v1/listVendor?${query}` : `${apiUrl}/api/v1/listVendor`;
        return new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(action.getVendor({ list: res.data.returnObject, total_rows: res.data.total_rows || 0, size: res.data.size || 0 }));
                    dispatch(loader(false));
                    if (!isPage && chunk_size === 0) {
                        dispatch(action.incChunkSize(chunk_size + 2));
                        dispatch(vendorListInChunk({ page: chunk_size + 2, size: LIMIT.ChunkSize }));
                    }
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
    };
}
/*********** Vendor delete **************/
export function vendorDelete(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.delete(`${apiUrl}/api/v1/deleteVendor/${id}`)
                .then(() => {
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response['data'] || {};
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
/*********** Save Invoice ************/
export function saveInvoice(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
              dispatch(loader(true));
               Http.post(`${apiUrl}/api/v1/saveInvoice`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { status, errors, message } = err.response['data'] || {};
                     dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors, message });
            });
        })
    );
}

/*********** Get Invoice list **************/
export function invoiceList(params = {}) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/listInvoices?${query}` : `${apiUrl}/api/v1/listInvoices`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(action.getInvoice({ list: res.data ?  res.data .returnObject : [], total_rows: res.data.total_rows || 0, size: res.data.size || 0 }));
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

/*********** Update Invoice ************/
export function updateInvoice(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/editInvoice`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { status, errors } = err.response['data'] || {};
                     dispatch(loader(false));
                    toastAction(false, errors);
                    return reject(false);
                });
        })
    );
}

/*********** Invoice delete **************/
export function deleteInvoice(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.delete(`${apiUrl}/api/v1/deleteInvoice/${id}`)
                .then(() => {
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response['data'] || {};
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

/*********** Save Credit ************/
export function saveCredit(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(`${apiUrl}/api/v1/saveCredit`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { status, errors } = err.response['data'] || {};
                     dispatch(loader(false));
                    toastAction(false, errors);
                    return reject(false);
                });
        })
    );
}
/*********** Payment Invoices ************/
export function payInvoice(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(`${apiUrl}/api/v1/payInvoice`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { status, errors } = err.response['data'] || {};
                      dispatch(loader(false));
                    toastAction(false, errors);
                    return reject(false);
                });
        })
    );
}

/*********** Vendor transactions ************/
export function vendorTransactions(params) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/vendorTransaction?${query}` : `${apiUrl}/api/v1/vendorTransaction`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            dispatch(action.getTransactions({ list: [], total_rows: 0, size:  0 }));
            Http.get(url)
                .then((res) => {
                    dispatch(loader(false));
                    dispatch(action.getTransactions({ list: res.data.returnObject || [], total_rows: res.data.total_rows || 0, size: res.data.size || 0 }));
                    return resolve(true);
                })
                .catch((err) => {
                    const { status, errors } = err.response['data'] || {};
                     dispatch(loader(false));
                    toastAction(false, errors);
                    return reject(false);
                });
        })
    );
}
/*********** Check Credit for vendor ************/
export function checkCredit(params) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/checkCredit?${query}` : `${apiUrl}/api/v1/checkCredit`;
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get(url)
                .then((res) => {
                    return resolve(res.data.returnObject);
                })
                .catch((err) => {
                    const { status, errors } = err.response ? err.response['data'] : {};
                   console.log(errors);
                      dispatch(loader(false));
                    toastAction(false, errors);
                    return reject(false);
                });
        })
    );
}