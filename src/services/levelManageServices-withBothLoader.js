import Http from '../Http';
import * as action from '../store/actions';
import {loader} from '../store/actions';
import {loadingTrue,loadingFalse,loadingTrueAddBtn,loadingFalseAddBtn,setLevelDataArrayToProps,loadingLayerLevelAdd,loadingLayerLevelList } from '../store/actions/administrationAction';
import {toastAction} from '../store/actions/toast-actions';


const apiUrl = process.env.REACT_APP_API_URL;
/*********** Load User level DataTable ************/
export function loadLevelDataTable(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrue());     
            dispatch(loadingLayerLevelList(true));       
            Http.get(`${apiUrl}/api/v1/getUserLevel?Params=`+JSON.stringify(params))
                .then((res) => {
                    dispatch(setLevelDataArrayToProps(res.data));
                    dispatch(loadingFalse());                    
                    dispatch(loadingLayerLevelList(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loader(false)); 
                    dispatch(loadingFalse());    
                    dispatch(loadingLayerLevelList(false));               
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*********** Add New User level  ************/
export function addNewLevel(params) {

    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingTrueAddBtn());
            dispatch(loadingLayerLevelAdd(true));
            Http.post(`${apiUrl}/api/v1/addUserLevel`, params)
                .then((res) => {
                    if(res.data.errorStatus === true ){
                        toastAction(false, res.data.message);                  
                    }else{
                        toastAction(true, res.data.message);                  
                    }                                        
                    dispatch(loadingFalseAddBtn());
                    dispatch(loadingLayerLevelAdd(false));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingFalseAddBtn());
                    dispatch(loadingLayerLevelAdd(false));
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

