import Http from '../Http';
import * as action from '../store/actions';
import {loader} from '../store/actions';
import {
    loadingTrueTerritorymodule,
    loadingFalseTerritorymodule,
    loadingTrueAddBtnTerritorymodule,
    loadingFalseAddBtnTerritorymodule,
    loadingTrueTerritoryMap,
    loadingFalseTerritoryMap,
    loadingTrueTerritoryIndividual,
    loadingFalseTerritoryIndividual,
    setTerritoryIndividualToProps,
    setTerritoryDataArrayToPropsMngmodule,
    setTerritoryCountriesToProps,
    setTerritoryStatesToProps,
    setTerritoryCountiesToProps,
    setTerritoryZipcodesToProps,
} from '../store/actions/administrationAction';
import {toastAction} from '../store/actions/toast-actions';


const apiUrl = process.env.REACT_APP_API_URL;
/*********** Load Territory DataTable ************/
export function loadDataTable() {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueTerritorymodule());            
            Http.get(`${apiUrl}/api/v1/territory`)
                .then((res) => {
                    dispatch(setTerritoryDataArrayToPropsMngmodule(res.data.data));
                    dispatch(loadingFalseTerritorymodule());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseTerritorymodule());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*********** Load Territory Individual Data ************/
export function loadTerritoryData(index) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueTerritoryIndividual());            
            Http.get(`${apiUrl}/api/v1/territory/${index}`)
                .then((res) => {
                    dispatch(setTerritoryIndividualToProps(res.data.data));
                    dispatch(loadingFalseTerritoryIndividual());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseTerritoryIndividual());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*********** Add New Territory  ************/
export function addNewRecord(params) {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueAddBtnTerritorymodule());
            Http.post(`${apiUrl}/api/v1/territory`, params)
                .then((res) => {
                    if(res.data.errorStatus === true ){
                        toastAction(false, res.data.message);                  
                    }else{
                        toastAction(true, res.data.message);                  
                    }                                        
                    dispatch(loadingFalseAddBtnTerritorymodule());
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseAddBtnTerritorymodule());
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}


/*********** Update Territory  ************/
export function updateRecord(index, params) {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueAddBtnTerritorymodule());
            Http.post(`${apiUrl}/api/v1/territory/${index}`, params)
                .then((res) => {
                    if(res.data.errorStatus === true ){
                        toastAction(false, res.data.message);                  
                    }else{
                        toastAction(true, res.data.message);                  
                    }                                        
                    dispatch(loadingFalseAddBtnTerritorymodule());
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseAddBtnTerritorymodule());
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*************** Load Map Data *************/

export function loadCountry() {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueTerritoryMap());            
            Http.post(`${apiUrl}/api/v1/country`)
                .then((res) => {
                    dispatch(setTerritoryCountriesToProps(res.data.data));
                    dispatch(loadingFalseTerritoryMap());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseTerritoryMap());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

export function loadStates(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueTerritoryMap());            
            Http.post(`${apiUrl}/api/v1/state`, params)
                .then((res) => {
                    dispatch(setTerritoryStatesToProps(res.data.data));
                    dispatch(loadingFalseTerritoryMap());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseTerritoryMap());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

export function loadCounty(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueTerritoryMap());            
            Http.post(`${apiUrl}/api/v1/county`, params)
                .then((res) => {
                    dispatch(setTerritoryCountiesToProps(res.data.data));
                    dispatch(loadingFalseTerritoryMap());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseTerritoryMap());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

export function loadZipcodes(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueTerritoryMap());            
            Http.post(`${apiUrl}/api/v1/zipcode`, params)
                .then((res) => {
                    dispatch(setTerritoryZipcodesToProps(res.data.data));
                    dispatch(loadingFalseTerritoryMap());                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseTerritoryMap());            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}


