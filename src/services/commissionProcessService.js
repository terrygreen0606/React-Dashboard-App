import Http from '../Http';
import {
    LoadingProducts,
    LoadingCommissionGenerate,
    getCommissionGenerate,
    getProducts,
    PostingCommission,
    GettingCommssionDetail,
    SetCommssionDetail,
} from '../store/actions/accounting';
import {toastAction} from '../store/actions/toast-actions';


const apiUrl = process.env.REACT_APP_API_URL;

/*********** Get Commission Data ************/
export function generateCommission(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(LoadingCommissionGenerate(true));            
            Http.post(`${apiUrl}/api/v1/commissionGenerate`, params)
                .then((res) => {
                    console.log(res);
                    var result = Object.keys(res.data.data).map(function(key) {
                        return res.data.data[key];
                    });
                    dispatch(getCommissionGenerate(result));
                    return resolve();
                })
                .catch((err) => {
                    // const { status, errors } = err.response.data;
                    // const data = {
                    //     status,
                    //     errors,
                    // };
                    dispatch(LoadingCommissionGenerate(false));            
                    // toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/********** Post Commission   *******************/
export function postCommission(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(PostingCommission("loading"));            
            Http.post(`${apiUrl}/api/v1/postCommission`, params)
                .then((res) => {
                    dispatch(PostingCommission("success"));
                    return resolve();
                })
                .catch((err) => {
                    dispatch(PostingCommission("failed"));
                    return reject(false);
                });
        })
    );
}

export function resetPostCommission() {
    return dispatch => {
        dispatch(PostingCommission("unset"));
    }
}

/********** Get Commission Detail  *******************/
export function getCommissionDetail(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(GettingCommssionDetail(true));            
            Http.post(`${apiUrl}/api/v1/showCommissionDetail`, params)
                .then((res) => {
                    const data = res.data.details;
                    dispatch(SetCommssionDetail(data));
                    return resolve();
                })
                .catch((err) => {
                    // const { status, errors } = err.response.data;
                    // const data = {
                    //     status,
                    //     errors,
                    // };
                    dispatch(SetCommssionDetail([]));
                    // toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*************** Load Products Data *************/

export function loadProducts() {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(LoadingProducts(true));            
            Http.post(`${apiUrl}/api/v1/products`)
                .then((res) => {
                    dispatch(getProducts(res.data.data));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(LoadingProducts(false));            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}
