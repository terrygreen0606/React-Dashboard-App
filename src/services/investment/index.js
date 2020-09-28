import querystring from 'querystring';
import Http from '../../Http';
import { loader } from '../../store/actions';
import * as action from '../../store/actions/investment';
import { toastAction } from '../../store/actions/toast-actions';

const apiUrl = process.env.REACT_APP_API_URL;
/*********** Get Investment list **************/
export function getInvestment(params = {}) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/listFolioBond?${query}` : `${apiUrl}/api/v1/listFolioBond`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(action.getInvestment({ list: res.data.returnObject || [], total_rows: res.data.total_rows, size: res.data.size }));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}

/*********** Get view security list **************/
export function getViewSecurity(endPoint, params = {}) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/${endPoint}?${query}` : `${apiUrl}/api/v1/${endPoint}`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(action.getInvestment({ viewSecurity: res.data.returnObject || [], total_rows: 0, size: 0 }));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}

/*********** Get security data **************/
export function getSecurityData(params = {}) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/getSecurityData?${query}` : `${apiUrl}/api/v1/getSecurityData`;
    
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(action.getSecurityData(res.data.returnObject));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}

/*********** Get category data **************/
export function getCategoryData(params = {}) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/getSecurityCategory?${query}` : `${apiUrl}/api/v1/getSecurityCategory`;  
    return dispatch => (        
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            dispatch(action.getCetagory({ subcategories: [] }));
            Http.get(url)
                .then((res) => {
                    if (params.id) {
                        dispatch(action.getCetagory({ subcategories: res.data.returnObject }));
                    } else {
                        dispatch(action.getCetagory({ categories: res.data.returnObject }));                       
                    }
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}

// ****** Edit Security*******/
export function editSecurity(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/editSecurity`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}




/******************Get Brokers************/
export function getBrokers(params) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/listBroker?${query}` : `${apiUrl}/api/v1/listBroker`;  
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(loader(false));
                    dispatch(action.getBrokers({brokers: res.data.returnObject || [], total_rows: res.data.total_rows, size: res.data.size }));
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}


// ****** add update brokers*******/
export function addUpdateBroker(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/addUpdateBroker`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}

/*********** Broker delete **************/
export function brokerDelete(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.delete(`${apiUrl}/api/v1/deleteBroker/${id}`)
                .then((res) => {
                    toastAction(true, res.data.message);
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


/******************Get Coupons************/
export function getCoupons(params) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/listCoupon?${query}` : `${apiUrl}/api/v1/listCoupon`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(loader(false));
                    dispatch(action.getCoupons({coupons: res.data.returnObject || [], total_rows: res.data.total_rows, size: res.data.size }));
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}


/****** add update coupon*******/
export function addUpdateCoupon(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/addUpdateCoupon`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}

/*********** Delete Coupon **************/
export function deleteCoupon(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.delete(`${apiUrl}/api/v1/deleteCoupon/${id}`)
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

/******************Get Prices************/
export function getPrices(params) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/listPrice?${query}` : `${apiUrl}/api/v1/listPrice`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(loader(false));
                    dispatch(action.getPrices({prices: res.data.returnObject || [], total_rows: res.data.total_rows, size: res.data.size }));
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}

/******************Get Prices Data************/
export function getPricesData(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/editPrice`,params)
                .then((res) => {
                    dispatch(loader(false));
                    dispatch(action.getPrices({pricesData: res.data.returnObject || [], total_rows: res.data.total_rows, size: res.data.size }));
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}
/******************Add/Update Prices Data************/
export function addUpdatePrice(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/addUpdatePrice`,params)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}

/*********** Delete price **************/
export function deletePrice(date) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.delete(`${apiUrl}/api/v1/deletePrice/${date}`)
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

/******************Get Transaction************/
export function getTransaction(params = {}) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/listTransactions?${query}` : `${apiUrl}/api/v1/listTransactions`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(action.getTransaction({ transactionData: res.data.returnObject || [], total_rows: res.data.total_rows || 0, size: res.data.size || 0 }));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}



// ****** Add Update Transaction*******/
export function addUpdateTransaction(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/addUpdateTransaction`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}


/******************Get Brokerage Acount************/
export function getBrokerageAccount(params) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/getBrokerageAccount?${query}` : `${apiUrl}/api/v1/getBrokerageAccount`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(loader(false));
                    dispatch(action.getBrokerageAccount({brokerageData: res.data.returnObject || [], total_rows: res.data.total_rows || 0, size: res.data.size || 0 }));
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}



/*********** Get monthlyPosting data **************/
export function getMonthlyPostingData(params = {}) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/listPostingData?${query}` : `${apiUrl}/api/v1/listPostingData`;
     return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    const data = Object.keys(res.data.returnObject).map(key => res.data.returnObject[key])
                    dispatch(action.getMonthlyPosting({ monthlyPosting: data || [], total_rows: res.data.total_rows, size: res.data.size}));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}


/*********** Get HistoricalPosting data **************/
export function getHistoricalPostingData(params = {}) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/listHistoricalPosting?${query}` : `${apiUrl}/api/v1/listHistoricalPosting`;
     return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    const data = Object.keys(res.data.returnObject).map(key => res.data.returnObject[key])
                    dispatch(action.getHistoricalPosting({ historicalPosting: data || [], total_rows: res.data.total_rows, size: res.data.size}));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}



/*********** Get Earned/intrest Posting data **************/
export function getEarnedPostingData(params = {}) {
    const query = querystring.stringify(params);
    const url = query ? `${apiUrl}/api/v1/listInterestPostingData?${query}` : `${apiUrl}/api/v1/listInterestPostingData`;
     return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    const data = Object.keys(res.data.returnObject).map(key => res.data.returnObject[key])
                    dispatch(action.getEarnedPosting({ earnedPosting: data || [], total_rows: res.data.total_rows, size: res.data.size}));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}

/*********** Delete Historical Posting **************/
export function deleteHistoricalPosting(date) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.delete(`${apiUrl}/api/v1/deleteHistoricalPosting/${date}`)
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
/*********** Get Transfer Security list **************/
export function getTransferSecurity(params = {}) {
    const query = querystring.stringify(params);
    const url = `${apiUrl}/api/v1/listTransfer?${query}`;
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.get(url)
                .then((res) => {
                    dispatch(action.getTransferSecurity({ transferSecurity: res.data.returnObject ? res.data.returnObject.map((row)=>({...row, id:Math.random()})) : [], total_rows: res.data.total_rows, size: res.data.size }));
                    dispatch(loader(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject({ status, errors });
                });
        })
    );
}

// ****** Add Update Posting*******/
export function addUpdatePosting(endpoint, payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/${endpoint}`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}


// ******  Update Transfer*******/
export function updateTransfer(payload) {   
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.put(`${apiUrl}/api/v1/updateTransfer`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { message, errors } = err.response ? err.response['data'] : {};
                    dispatch(loader(false));
                    toastAction(false, errors || message);
                    return reject(false);
                });
        })
    );
}
