import Http from '../Http';
import * as action from '../store/actions';
import {loader} from '../store/actions';
import {
    loadingTrueRules,
    loadingFalseRules,
    loadingTrueRule,
    loadingFalseRule,
    loadingTrueRuleOptions,
    loadingFalseRuleOptions,
    loadingTrueAddBtnRule,
    loadingFalseAddBtnRule,
    setRuleDataArrayToProps,
    setRuleIndividualToProps,
    setRuleOptionsToProps,
    setRuleProductsToProps,
} from '../store/actions/administrationAction';
import {toastAction} from '../store/actions/toast-actions';


const apiUrl = process.env.REACT_APP_API_URL;
/*********** Load Rule DataTable ************/
export function loadDataTable() {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueRules());            
            Http.get(`${apiUrl}/api/v1/rule`)
                .then((res) => {
                    dispatch(setRuleDataArrayToProps(res.data.data));
                    dispatch(loadingFalseRules());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseRules());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*********** Load Rule Individual Data ************/
export function loadRuleData(index) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueRule());            
            Http.get(`${apiUrl}/api/v1/rule/${index}`)
                .then((res) => {
                    dispatch(setRuleIndividualToProps(res.data.data));
                    dispatch(loadingFalseRule());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseRule());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*********** Add New Rule  ************/
export function addNewRecord(params) {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueAddBtnRule());
            Http.post(`${apiUrl}/api/v1/rule`, params)
                .then((res) => {
                    if(res.data.errorStatus === true ){
                        toastAction(false, res.data.message);                  
                    }else{
                        toastAction(true, res.data.message);                  
                    }                                        
                    dispatch(loadingFalseAddBtnRule());
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseAddBtnRule());
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}


/*********** Update Rule  ************/
export function updateRecord(index, params) {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueAddBtnRule());
            Http.post(`${apiUrl}/api/v1/rule/${index}`, params)
                .then((res) => {
                    if(res.data.errorStatus === true ){
                        toastAction(false, res.data.message);                  
                    }else{
                        toastAction(true, res.data.message);                  
                    }                                        
                    dispatch(loadingFalseAddBtnRule());
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseAddBtnRule());
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*************** Load Map Data *************/

export function loadOptions() {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueRuleOptions());            
            Http.post(`${apiUrl}/api/v1/ruleOptions`)
                .then((res) => {
                    dispatch(setRuleOptionsToProps(res.data));
                    dispatch(loadingFalseRuleOptions());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseRuleOptions());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

export function loadProducts(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueRuleOptions());            
            Http.post(`${apiUrl}/api/v1/ruleProducts`, params)
                .then((res) => {
                    dispatch(setRuleProductsToProps(res.data));
                    dispatch(loadingFalseRuleOptions());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseRuleOptions());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

