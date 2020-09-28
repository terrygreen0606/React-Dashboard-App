import Http from "../Http";
import * as action from "../store/actions";
import { loader } from "../store/actions";
import {
  LLDocHandlerProductDT,
  populateDocHandlerProductDT,
  getSelectedProductID_Action,
  LLDocHandlerDoctypeDT,
  populateDocHandlerDoctypeDT,
  LLDocHandlerDoctypeDD,
  populateDocHandlerDoctypeDD,
  getSelectedDoctypeID_Action,
  getSelectedDoctypeIDFromSelectBox_Action,
  getSelectedModuleIDFromSelectBox_Action,
  LLDocHandlerFormnameDT,
  populateDocHandlerFormnameDT,
  getSelectedFormnameID_Action,
  //--
  LLDocHandlerDocumentDT,
  populateDocHandlerDocumentDT,
  getSelectedDocumentID_Action,
  //--
  doHideShowAddnewdocDilogStatusAction,
  //--
  LLDocHandlerDocumentAddnewDT,
  populateDocHandlerDocumentAddnewDT,
  getSelectedDocumentAddnewIDAction,
  //--
  doEmptySelectedItemRowIDAction,
  doForcefullyUpdate,
} from "../store/actions/administrationAction";
import { toastAction } from "../store/actions/toast-actions";

const apiUrl = process.env.REACT_APP_API_URL;
/*********** Load User level DataTable ************/

export function loadDocHandlerProductDataTable(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(LLDocHandlerProductDT(true));
      Http.get(
        `${apiUrl}/api/v1/getDocHandlerProductList?Params=` +
          JSON.stringify(params)
      )
        .then((res) => {
          dispatch(populateDocHandlerProductDT(res.data));
          dispatch(LLDocHandlerProductDT(false));
          return resolve();
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          //dispatch(LLDocHandlerProductDT(false));
          toastAction(false, errors);
          return reject(false);
        });
    });
}

export function loadDocHandlerDoctypeDataTable(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(LLDocHandlerDoctypeDT(true));
      Http.get(
        `${apiUrl}/api/v1/getDocHandlerDoctypeList?Params=` +
          JSON.stringify(params)
      )
        .then((res) => {
          dispatch(populateDocHandlerDoctypeDT(res.data));
          dispatch(LLDocHandlerDoctypeDT(false));
          return resolve();
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          //dispatch(LLDocHandlerDoctypeDT(false));
          toastAction(false, errors);
          return reject(false);
        });
    });
}

export function loadDocHandlerFormnameDataTable(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(LLDocHandlerFormnameDT(true));
      Http.get(
        `${apiUrl}/api/v1/getDocHandlerFormnameList?Params=` +
          JSON.stringify(params)
      )
        .then((res) => {
          dispatch(populateDocHandlerFormnameDT(res.data));
          dispatch(LLDocHandlerFormnameDT(false));
          return resolve();
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          //dispatch(LLDocHandlerFormnameDT(false));
          toastAction(false, errors);
          return reject(false);
        });
    });
}

export function loadDocHandlerDocumentDataTable(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(LLDocHandlerDocumentDT(true));
      Http.get(
        `${apiUrl}/api/v1/getDocHandlerDocumentList?Params=` +
          JSON.stringify(params)
      )
        .then((res) => {
          dispatch(populateDocHandlerDocumentDT(res.data));
          dispatch(LLDocHandlerDocumentDT(false));
          return resolve();
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          //dispatch(LLDocHandlerDocumentDT(false));
          toastAction(false, errors);
          return reject(false);
        });
    });
}

export function loadDocHandlerDocumentAddnewDataTable(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(LLDocHandlerDocumentAddnewDT(true));
      Http.get(
        `${apiUrl}/api/v1/getDocHandlerDocumentAddnewList?Params=` +
          JSON.stringify(params)
      )
        .then((res) => {
          dispatch(populateDocHandlerDocumentAddnewDT(res.data));
          dispatch(doEmptySelectedItemRowIDAction("documnetAddnewDT")); //do empty the Selected Row IdPK, on load of table
          dispatch(LLDocHandlerDocumentAddnewDT(false));
          return resolve();
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          //dispatch(LLDocHandlerDocumentAddnewDT(false));
          toastAction(false, errors);
          return reject(false);
        });
    });
}

export function addSelectedDocumentToList(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(LLDocHandlerDocumentAddnewDT(true));
      Http.post(`${apiUrl}/api/v1/addDocHandlerDocumentToList`, params)
        .then((res) => {
          toastAction(true, res.data.message);
          dispatch(doEmptySelectedItemRowIDAction("documnetAddnewDT")); //do empty the Selected Row IdPK, on load of table
          dispatch(doForcefullyUpdate("documnetAddnewDT")); //this update will allow respactive datatabel updation
          dispatch(doForcefullyUpdate("documnetDT")); //this update will allow respactive datatabel updation
          dispatch(LLDocHandlerDocumentAddnewDT(false));
          return resolve();
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          //dispatch(LLDocHandlerDocumentAddnewDT(false));
          toastAction(false, errors);
          return reject(false);
        });
    });
}


export function loadDocHandlerDoctypeDD(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(LLDocHandlerDoctypeDD(true));
      Http.get(`${apiUrl}/api/v1/getDoctype/dd`, params)
        .then((res) => {
          dispatch(populateDocHandlerDoctypeDD(res.data.returnObject));
          dispatch(LLDocHandlerDoctypeDD(false));
          return resolve();
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          dispatch(LLDocHandlerDoctypeDD(false));          
          return reject(false);
        });
    });
}





export function getSelectedProductID_Services(paramsArray) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(getSelectedProductID_Action(paramsArray));
      return resolve();
    });
}

export function getSelectedDoctypeID_Services(paramsArray) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(getSelectedDoctypeID_Action(paramsArray));
      return resolve();
    });
}

export function getSelectedDoctypeIDFromSelectBox_Services(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(getSelectedDoctypeIDFromSelectBox_Action(params));
      return resolve();
    });
}


export function getSelectedModuleIDFromSelectBox_Services(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(getSelectedModuleIDFromSelectBox_Action(params));
      return resolve();
    });
}

export function getSelectedFormnameID_Services(paramsArray) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(getSelectedFormnameID_Action(paramsArray));
      return resolve();
    });
}

export function getSelectedDocumentID_Services(paramsArray) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(getSelectedDocumentID_Action(paramsArray));
      return resolve();
    });
}

export function doHideShowAddnewdocDilogServices(paramsArray) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(doHideShowAddnewdocDilogStatusAction(paramsArray));
      return resolve();
    });
}

export function doEmptySelectedItemRowIDActionServices(paramsArray) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(doEmptySelectedItemRowIDAction(paramsArray)); //do empty the Selected Row IdPK accordingly
      return resolve();
    });
}

export function getSelectedDocumentAddnewIDServices(paramsArray) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(getSelectedDocumentAddnewIDAction(paramsArray));
      return resolve();
    });
}

export function doForcefullyUpdateServices(paramsArray) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(doForcefullyUpdate(paramsArray));
      return resolve();
    });
}

/*********** Add New User level  ************/
// export function populateSubModuleAddEditForm1(params) {
//   return dispatch =>
//     new Promise((resolve, reject) => {
//       dispatch(populateSubModuleAddEditForm(params));
//       return resolve();
//     });
// }
