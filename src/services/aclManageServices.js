import Http from "../Http";
import * as action from "../store/actions";
import { loader } from "../store/actions";
import {
  loadingTrueMngsubmodule,
  loadingFalseMngsubmodule,
  loadingTrueAddBtnMngsubmodule,
  loadingFalseAddBtnMngsubmodule,
  setLevelDataArrayToPropsMngsubmodule,
  loadingLayerSubModuleList,
  loadingLayerSubModuleAdd,
  loadingLayerSubModuleAddPopulateModuleDD,
  loadingLayerSubModuleAddModuleDD,
  populateSubModuleAddEditForm,
  resetSubModuleAddEditForm,
  loadingLayerAclMngLevelDD,
  PopulateAclMngLevelDD,
  populateAclMngLevelDDSelected,
  loadingLayerAclMngAppliedList,
  populateAclMngAppliedList,
  loadingLayerAclMngDeniedList,
  populateAclMngDeniedList,
  reloadAclMngAppliedList,
  reloadAclMngDeniedList,
  loadingLayerAclMngSubmoduleList,
  populateAclMngSubmoduleList,
  setAclMngModuleID
} from "../store/actions/administrationAction";
import { toastAction } from "../store/actions/toast-actions";

const apiUrl = process.env.REACT_APP_API_URL;
/*********** Load User level DataTable ************/
export function loadDataTable(params) {
  if (params.isAppliedOrDenied === "Applied") {
    return dispatch =>
      new Promise((resolve, reject) => {
        dispatch(loadingLayerAclMngAppliedList(true));
        Http.get(
          `${apiUrl}/api/v1/getAclMngModuleList?Params=` +
            JSON.stringify(params)
        )
          .then(res => {
            dispatch(populateAclMngAppliedList(res.data));
            dispatch(loadingLayerAclMngAppliedList(false));
            return resolve();
          })
          .catch(err => {
            const { status, errors } = err.response.data;
            const data = {
              status,
              errors
            };
            dispatch(loadingLayerAclMngAppliedList(false));
            toastAction(false, errors);
            return reject(false);
          });
      });
  } else {
    return dispatch =>
      new Promise((resolve, reject) => {
        dispatch(loadingLayerAclMngDeniedList(true));
        Http.get(
          `${apiUrl}/api/v1/getAclMngModuleList?Params=` +
            JSON.stringify(params)
        )
          .then(res => {
            dispatch(populateAclMngDeniedList(res.data));
            dispatch(loadingLayerAclMngDeniedList(false));
            return resolve();
          })
          .catch(err => {
            const { status, errors } = err.response.data;
            const data = {
              status,
              errors
            };
            dispatch(loadingLayerAclMngDeniedList(false));
            toastAction(false, errors);
            return reject(false);
          });
      });
  }
}

export function loadSubModuleDataTable(params) {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch(loadingLayerAclMngSubmoduleList(true));
      Http.get(
        `${apiUrl}/api/v1/getSystemSubModule?Params=` + JSON.stringify(params)
      )
        .then(res => {
          dispatch(populateAclMngSubmoduleList(res.data));
          dispatch(loadingLayerAclMngSubmoduleList(false));
          return resolve();
        })
        .catch(err => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors
          };
          //dispatch(loadingLayerAclMngSubmoduleList(false));
          toastAction(false, errors);
          return reject(false);
        });
    });
}

/*********** Add New User level  ************/
export function addNewRecord(params) {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch(loadingTrueAddBtnMngsubmodule());
      dispatch(loadingLayerSubModuleAdd(true));
      Http.post(`${apiUrl}/api/v1/addSystemSubModule`, params)
        .then(res => {
          if (res.data.errorStatus === true) {
            toastAction(false, res.data.message);
          } else {
            toastAction(true, res.data.message);
          }
          dispatch(loadingFalseAddBtnMngsubmodule());
          dispatch(loadingLayerSubModuleAdd(false));
          dispatch(resetSubModuleAddEditForm());
          return resolve();
        })
        .catch(err => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors
          };
          dispatch(loadingFalseAddBtnMngsubmodule());
          dispatch(loadingLayerSubModuleAdd(false));
          dispatch(resetSubModuleAddEditForm());
          toastAction(false, errors);
          return reject(false);
        });
    });
}

/*********** Add New User level  ************/
export function ddLevels(params) {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch(loadingLayerAclMngLevelDD(true));
      Http.get(`${apiUrl}/api/v1/getSystemLevel/dd`, params)
        .then(res => {
          dispatch(PopulateAclMngLevelDD(res.data.returnObject));
          dispatch(loadingLayerAclMngLevelDD(false));
          //console.log(res.data.returnObject);
          return resolve();
        })
        .catch(err => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors
          };
          dispatch(loadingLayerAclMngLevelDD(false));
          return reject(false);
        });
    });
}

/*********** Add New User level  ************/
export function populateSubModuleAddEditForm1(params) {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch(populateSubModuleAddEditForm(params));
      return resolve();
    });
}

/*********** Add New User level  ************/
export function resetformSubmodel() {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch(resetSubModuleAddEditForm());
      return resolve();
    });
}

export function AclMngModuleID(params) {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch(setAclMngModuleID(params));
      return resolve();
    });
}

export function aclApplyDenyModulesToLevel(params) {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch(loadingLayerAclMngAppliedList(true));
      dispatch(loadingLayerAclMngDeniedList(true));

      Http.post(`${apiUrl}/api/v1/aclApplyDenyModules`, params)
        .then(res => {
          if (res.data.errorStatus === true) {
            toastAction(false, res.data.message);
          } else {
            toastAction(true, res.data.message);
          }
          // dispatch(loadingLayerAclMngAppliedList(false));
          // dispatch(loadingLayerAclMngDeniedList(false));
          dispatch(reloadAclMngAppliedList(true)); //RELOAD THE DATATABLE
          dispatch(reloadAclMngDeniedList(true)); //RELOAD THE DATATABLE

          return resolve();
        })
        .catch(err => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors
          };
          // dispatch(loadingLayerAclMngAppliedList(false));
          // dispatch(loadingLayerAclMngDeniedList(false));
          dispatch(reloadAclMngAppliedList(true)); //RELOAD THE DATATABLE
          dispatch(reloadAclMngDeniedList(true)); //RELOAD THE DATATABLE
          toastAction(false, errors);
          return reject(false);
        });
    });
}

export function aclSaveSubmoduleSettingForModule(params) {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch(loadingLayerAclMngSubmoduleList(true));
      Http.post(`${apiUrl}/api/v1/aclSaveSubmoduleSettingForModule`, params)
        .then(res => {
          if (res.data.errorStatus === true) {
            toastAction(false, res.data.message);
          } else {
            toastAction(true, res.data.message);
          }
          dispatch(loadingLayerAclMngSubmoduleList(false));
          //dispatch(reloadAclMngDeniedList(true));//RELOAD THE DATATABLE
          return resolve();
        })
        .catch(err => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors
          };
          dispatch(loadingLayerAclMngSubmoduleList(false));
          //dispatch(reloadAclMngDeniedList(true));//RELOAD THE DATATABLE
          toastAction(false, errors);
          return reject(false);
        });
    });
}
