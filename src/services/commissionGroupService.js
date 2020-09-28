import Http from '../Http';
import * as action from '../store/actions';
import {loader} from '../store/actions';
import {
    loadingTrueGroups,
    loadingFalseGroups,
    loadingTrueAddBtnGroup,
    loadingFalseAddBtnGroup,
    loadingTrueGroup,
    loadingFalseGroup,
    setGroupIndividualToProps,
    setGroupDataArrayToProps,
    setGroupProductsToProps,
    setGroupProductRulesToProps,
    loadingTrueGroupOptions,
    loadingFalseGroupOptions,
} from '../store/actions/administrationAction';
import {toastAction} from '../store/actions/toast-actions';


const apiUrl = process.env.REACT_APP_API_URL;
/*********** Load Group DataTable ************/
export function loadDataTable() {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueGroups());            
            Http.get(`${apiUrl}/api/v1/ruleGroup`)
                .then((res) => {
                    dispatch(setGroupDataArrayToProps(res.data.data));
                    dispatch(loadingFalseGroups());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseGroups());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*********** Load Group Individual Data ************/
export function loadGroupData(index) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueGroup());            
            Http.get(`${apiUrl}/api/v1/ruleGroup/${index}`)
                .then((res) => {
                    dispatch(setGroupIndividualToProps(res.data.data));
                    dispatch(loadingFalseGroup());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseGroup());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*********** Add New Group  ************/
export function addNewRecord(params) {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueAddBtnGroup());
            Http.post(`${apiUrl}/api/v1/ruleGroup`, params)
                .then((res) => {
                    if(res.data.errorStatus === true ){
                        toastAction(false, res.data.message);                  
                    }else{
                        toastAction(true, res.data.message);                  
                    }                                        
                    dispatch(loadingFalseAddBtnGroup());
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseAddBtnGroup());
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}


/*********** Update Group  ************/
export function updateRecord(index, params) {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueAddBtnGroup());
            Http.post(`${apiUrl}/api/v1/ruleGroup/${index}`, params)
                .then((res) => {
                    if(res.data.errorStatus === true ){
                        toastAction(false, res.data.message);                  
                    }else{
                        toastAction(true, res.data.message);                  
                    }                                        
                    dispatch(loadingFalseAddBtnGroup());
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseAddBtnGroup());
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*************** Load Products Data *************/

export function loadProducts() {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueGroupOptions());            
            Http.post(`${apiUrl}/api/v1/products`)
                .then((res) => {
                    dispatch(setGroupProductsToProps(res.data.data));
                    dispatch(loadingFalseGroupOptions());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseGroupOptions());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

export function loadRules(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueGroupOptions());            
            Http.post(`${apiUrl}/api/v1/ruleGroupProductRule`, params)
                .then((res) => {
                    dispatch(setGroupProductRulesToProps(res.data.data));
                    dispatch(loadingFalseGroupOptions());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseGroupOptions());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}
