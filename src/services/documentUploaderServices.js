import Http from "../Http";
import * as action from "../store/actions";
import { loader } from "../store/actions";
import {
  LLDocHandlerProductDT,
  populateDocHandlerProductDT,
  getSelectedProductID_Action,
  LLDocHandlerDoctypeDT,
  populateDocHandlerDoctypeDT,
  getSelectedDoctypeID_Action,
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

export function uploadDocuments(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      //dispatch(LLDocHandlerDocumentAddnewDT(true));
      Http.post(`${apiUrl}/api/v1/uploadDocumentUploader`, params,)
        .then((res) => {
          toastAction(true, res.data.message);
        //   dispatch(doEmptySelectedItemRowIDAction("documnetAddnewDT")); //do empty the Selected Row IdPK, on load of table
        //   dispatch(doForcefullyUpdate("documnetAddnewDT")); //this update will allow respactive datatabel updation
        //   dispatch(doForcefullyUpdate("documnetDT")); //this update will allow respactive datatabel updation
        //   dispatch(LLDocHandlerDocumentAddnewDT(false));
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


export function loadDocumentDataTableServices(params) {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(LLDocHandlerDocumentDT(true));
      Http.get(
        `${apiUrl}/api/v1/getDocUploaderDocumentList?Params=` +
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
          dispatch(LLDocHandlerDocumentDT(false));
          toastAction(false, errors);
          return reject(false);
        });
    });
}

