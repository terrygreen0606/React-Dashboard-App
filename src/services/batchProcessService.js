import Http from '../Http';
import * as action from '../store/actions';
import { toastAction } from '../store/actions/toast-actions';
import Message from '../utilities/message';
import { func } from 'prop-types';

const apiUrl = process.env.REACT_APP_API_URL;
const logedInUser = JSON.parse(sessionStorage.getItem('user'));

export function getBatchMaster(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl + '/api/v1/BPC/getAllBatches', params)
        .then((res) => {
          dispatch(action.setBatchData(res.data));
          return resolve();
        })
    })
  );
}

export function getBatchDetails(batchMasterPK) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiUrl + '/api/v1/BPC/getBatchDetails/'+batchMasterPK)
        .then((res) => {
          //dispatch(action.setBatchDetailsData(res.data));
          return resolve(res.data);
        })
    })
  );
}

export function editBatchDetails(batchMasterPK = '') {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiUrl + '/api/v1/BPC/editBatchTransEntry/'+batchMasterPK)
        .then((res) => {
          dispatch(action.editBatchDetailsData(res.data));
          return resolve(res.data.batchDetailsData);
        })
    })
  );
}

export function getTransSubType(transSubType) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiUrl + '/api/v1/BPC/getTransSubType/'+transSubType)
        .then((res) => {
          dispatch(action.getTransSubType(res.data));
          return resolve();
        })
    })
  );
}

export function searchAccount(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl + '/api/v1/BPC/searchAccount',params)
        .then((res) => {
          dispatch(action.searchAccount(res.data));
          return resolve();
        })
    })
  );
}

export function getAcctPerData(acctNo) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiUrl + '/api/v1/BPC/getAcctPerDetails/'+acctNo)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => {
          toastAction(false, 'Please specify Account Number');
        });
    })
  );
}

export function saveNewBatch(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl + '/api/v1/BPC/saveBatch',{params,'userID': logedInUser['Admin_ID']})
        .then((res) => {
          return resolve(res.data);
        })
    })
  );
}

export function deleteBatchDetails(batchDetailPK){
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiUrl+'/api/v1/BPC/deleteBatchDetails/'+batchDetailPK)
          .then((res)=>{
            return resolve(res.data);
          })
    })
  );
}

export function getPostBatchAcctDate(batchMasterPK){
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiUrl+'/api/v1/BPC/getPostBatchAcctDate/'+batchMasterPK)
          .then((res)=>{
            return resolve(res.data);
          })
    })
  );
}

export function savePostBatchAcct(params){
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl+'/api/v1/BPC/postBatchTrans', params)
          .then((res)=>{
            return resolve(res.data);
          })
    })
  );
}

export function uploadBOA(files){
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl+'/api/v1/BPC/uploadBOA', files)
          .then((res)=>{
            return resolve(res.data);
          })
    })
  );
}

export function saveLockBoxData(params){
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl+'/api/v1/BPC/saveLockBoxData', params)
          .then((res)=>{
            return resolve(res.data);
          })
    })
  );
}
