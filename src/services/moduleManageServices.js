import Http from '../Http';
import * as action from '../store/actions';
import {loader} from '../store/actions';
import {loadingTrueMngmodule,loadingFalseMngmodule,loadingTrueAddBtnMngmodule,loadingFalseAddBtnMngmodule,setLevelDataArrayToPropsMngmodule,loadingLayerModuleList
    ,loadingLayerModuleAdd,resetModuleAddEditForm,populateModuleAddEditForm } from '../store/actions/administrationAction';
import {toastAction} from '../store/actions/toast-actions';


const apiUrl = process.env.REACT_APP_API_URL;
/*********** Load User level DataTable ************/
export function loadDataTable(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            //dispatch(loadingTrueMngmodule());      
            dispatch(loadingLayerModuleList(true));             
            Http.get(`${apiUrl}/api/v1/getSystemModule?Params=`+JSON.stringify(params))
                .then((res) => {
                    dispatch(setLevelDataArrayToPropsMngmodule(res.data));
                    //dispatch(loadingFalseMngmodule());     
                    dispatch(loadingLayerModuleList(false));                            
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    //dispatch(loadingFalseMngmodule());            
                    dispatch(loadingLayerModuleList(false));                            
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
            dispatch(loadingTrueAddBtnMngmodule());
            dispatch(loadingLayerModuleAdd(true));                            
            Http.post(`${apiUrl}/api/v1/addSystemModule`, params)
                .then((res) => {
                    if(res.data.errorStatus === true ){
                        toastAction(false, res.data.message);                  
                    }else{
                        toastAction(true, res.data.message);                  
                    }                                        
                    dispatch(loadingFalseAddBtnMngmodule());
                    dispatch(loadingLayerModuleAdd(false));       
                    dispatch(resetModuleAddEditForm());                      
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseAddBtnMngmodule());
                    dispatch(loadingLayerModuleAdd(false));                            
                    dispatch(resetModuleAddEditForm()); 
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}


/*********** Add New User level  ************/
export function populateModuleAddEditForm1(params) {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(populateModuleAddEditForm(params)); 
            return resolve();
        })
    );
}

/*********** Add New User level  ************/
export function resetformModel() {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(resetModuleAddEditForm()); 
            return resolve();
        })
    );
}


