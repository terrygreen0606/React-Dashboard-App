import axios from 'axios';
import Http from '../Http';
import * as action from '../store/actions/common';
const apiUrl = process.env.REACT_APP_API_URL;

export class transferBookService {
  checkPermission(data) {
    return axios.post(apiUrl + '/api/v1/check_permission', data);
  }

  getAgencyDropdown() {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.post(apiUrl + '/api/v1/getAgency')
          .then((res) => {
            if (res.status === 200) {
                dispatch(action.getAgencyDropdown(res.data)); 
                return resolve();
              } else {
                reject()
              }
          })
      })
    );
  }

  getTransfrBookReason() {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiUrl + '/api/v1/getTransferBookReason')
          .then((res) => {
            if (res.status === 200) {
                dispatch(action.getTransfrBookReason(res.data)); 
                return resolve();
              } else {
                reject()
              }
          })
      })
    );
  }

  getAgentDropdown(params) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiUrl + '/api/v1/getAgentDD/' +params)
          .then((res) => {
            if (res.status === 200) {
                dispatch(action.getAgentDropdown(res.data)); 
                return resolve();
              } else {
                reject()
              }
          })
      })
    );
  }

  getNewAgentDropdown(params) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiUrl + '/api/v1/getAgentDD/' +params)
          .then((res) => {
            if (res.status === 200) {
                dispatch(action.getNewAgentDropdown(res.data)); 
                return resolve();
              } else {
                reject()
              }
          })
      })
    );
  }

  getAgencyCode(params) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiUrl + '/api/v1/transferPolicy/'+params)
          .then((res) => {
            if (res.status === 200) {
                dispatch(action.getAgencyCode(res.data)); 
                return resolve();
              } else {
                reject()
              }
          })
      })
    );
  }

  getSearchPolicyForTransferBook(data) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiUrl + '/api/v1/transferPolicy', {
        params: {
          ...data
        },
        // paramsSerializer: function(params) {
        //   return qs.stringify(params, { indices: false })
        // }
      })

      .then((res) => {
          if (res.status === 200) {
              dispatch(action.getSearchPolicyForTransferBook(res.data)); 
              return resolve();
            } else {
              reject()
            }
        })
    })
  );
}
transferBook(data) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl + '/api/v1/transferPolicy', data)
        .then((res) => {
          if (res.status === 200) {
              dispatch(action.transferBook(res.data)); 
              return resolve();
            } else {
              reject()
            }
        })
    })
  );
}
}