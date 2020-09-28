import Http from '../Http';
import * as action from '../store/actions';
import {loader} from '../store/actions';
import {loadingTrueMngsubmodule,loadingFalseMngsubmodule,loadingTrueAddBtnMngsubmodule,loadingFalseAddBtnMngsubmodule,setLevelDataArrayToPropsMngsubmodule,
    loadingLayerSubModuleList,loadingLayerSubModuleAdd,
    loadingLayerSubModuleAddPopulateModuleDD,loadingLayerSubModuleAddModuleDD,populateSubModuleAddEditForm,resetSubModuleAddEditForm
 } from '../store/actions/administrationAction';
import {toastAction} from '../store/actions/toast-actions';


const apiUrl = process.env.REACT_APP_API_URL;
/*********** Load User level DataTable ************/
export function loadDataTable(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            //dispatch(loadingTrueMngsubmodule());    
            dispatch(loadingLayerSubModuleList(true));                     
            Http.get(`${apiUrl}/api/v1/getSystemSubModule?Params=`+JSON.stringify(params))
                .then((res) => {
                    dispatch(setLevelDataArrayToPropsMngsubmodule(res.data));
                    //dispatch(loadingFalseMngsubmodule());                    
                    dispatch(loadingLayerSubModuleList(false));                     
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    //dispatch(loadingFalseMngsubmodule());            
                    dispatch(loadingLayerSubModuleList(false));                     
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*********** Add New User level  ************/
export function addNewRecord(params) {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueAddBtnMngsubmodule());
            dispatch(loadingLayerSubModuleAdd(true));                     
            Http.post(`${apiUrl}/api/v1/addSystemSubModule`, params)
                .then((res) => {
                    if(res.data.errorStatus === true ){
                        toastAction(false, res.data.message);                  
                    }else{
                        toastAction(true, res.data.message);                  
                    }                                        
                    dispatch(loadingFalseAddBtnMngsubmodule());
                    dispatch(loadingLayerSubModuleAdd(false));
                    dispatch(resetSubModuleAddEditForm()); 
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseAddBtnMngsubmodule());
                    dispatch(loadingLayerSubModuleAdd(false));
                    dispatch(resetSubModuleAddEditForm()); 
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*********** Add New User level  ************/
export function ddModules(params) {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingLayerSubModuleAddModuleDD(true));                     
            Http.get(`${apiUrl}/api/v1/getSystemModule/dd`, params)
                .then((res) => {
                    dispatch(loadingLayerSubModuleAddPopulateModuleDD(res.data.returnObject))
                    dispatch(loadingLayerSubModuleAddModuleDD(false));
                    //console.log(res.data.returnObject);                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;                    
                    const data = {
                        status,
                        errors,
                    };                    
                    dispatch(loadingLayerSubModuleAddModuleDD(false));
                    return reject(false);
                });
        })
    );
}

/*********** Add New User level  ************/
export function populateSubModuleAddEditForm1(params) {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(populateSubModuleAddEditForm(params)); 
            return resolve();
        })
    );
}

/*********** Add New User level  ************/
export function resetformSubmodel() {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(resetSubModuleAddEditForm()); 
            return resolve();
        })
    );
}

