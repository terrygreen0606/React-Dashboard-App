import Http from '../../Http';
import axios from 'axios';
import { loader } from '../../store/actions';
import * as action from '../../store/actions/producer';
import { toastAction } from '../../store/actions/toast-actions';

const apiUrl = process.env.REACT_APP_API_URL;
/*********** Logs ************/
//show logs
export function showLogsRequest({pageNumber = 1, url = '${apiUrl}/api/v1/agency/1/showLogs'}) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get(url)
            .then((res) => {
              dispatch(action.getProducerLogs(res.data))
              return resolve()
            })
            .catch((err) => {
              // TODO: handle err
              console.error(err.response)
              return reject(err.response);
            })
        })
    )
}

//add logs
export function saveLogRequest({params, url = '${apiUrl}/api/v1/agency/1/saveLog'}) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(url, params)
        .then(res => {
          dispatch(action.saveProducerLog(res.data))
          return resolve()
        })
        .catch((err) => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };

          if (statusCode === 422) {
            const resetErrors = {
              errors: err.response.data,
              replace: false,
              searchStr: '',
              replaceStr: '',
            };
            data.error = resetErrors;
          } else if (statusCode === 401) {
            data.error = err.response.data.message;
          }
          return reject(data);
        })
    })
  )
}

/*********** Commissions ************/
//show commissions
export function showCommissionsRequest({pageNumber = 1, url = '${apiUrl}/api/v1/agency/1/showCommissions'}) {
    return dispatch => (

        new Promise((resolve, reject) => {
            Http.get(url)
            .then((res) => {
              dispatch(action.getCommissions(res.data))
              return resolve()
            })
            .catch((err) => {
              // TODO: handle err
              return reject(err.response);
            })
        })
    )
}

//show commissions detail
  //accview detail
export function showCommAccDetailsRequest(url = '${apiUrl}/api/v1/agency/1/showCommAccDetails/1') {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(url)
      .then((res) => {
        dispatch(action.getCommAccDetails(res.data))
        return resolve()
      })
      .catch((err) => {
        // TODO: handle err
        return reject(err.response);
      })
    })
  )
}
  //statement detail
export function showCommStmtDetailsRequest(url = '${apiUrl}/api/v1/agency/1/showCommStmtDetails/1') {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(url)
      .then((res) => {
        dispatch(action.getCommStmtDetails(res.data))
        return resolve()
      })
      .catch((err) => {
        // TODO: handle err
        return reject(err.response);
      })
    })
  )
}
/*********** Documents ************/
// show documents
export function showDocumentsRequest(url = '${apiUrl}/api/v1/agency/1/showDocuments/1') {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(url)
      .then((res) => {
        dispatch(action.getDocuments(res.data))
        return resolve()
      })
      .catch((err) => {
        // TODO: handle err
        return reject(err.response);
      })
    })
  )
}

// delete document

export function deleteDocumentRequest(url = '${apiUrl}/api/v1/agency/1/deleteDocument/0') {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.delete(url)
      .then((res) => {
        dispatch(action.deleteDocument(res.data))
        return resolve()
      })
      .catch((err) => {
        // TODO: handle err
        console.log(err);
        return reject(err.response);
      })
    })
  )
}

// save document

export function saveDocumentRequest(data, url = '${apiUrl}/api/v1/agency/1/saveDocument') {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(url,
        data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        dispatch(action.saveDocument(res.data))
        return resolve()
      })
      .catch((err) => {
        // TODO: handle err
        return reject(err.response);
      })
    })
  )
}

/*********** Agency User ************/

//show
export function showAUsersRequest(url = '${apiUrl}/api/v1/agency/1/showAUsers') {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(url)
      .then((res) => {
        dispatch(action.getAUsers(res.data))
        return resolve()
      })
      .catch((err) => {
        // TODO: handle err
        return reject(err.response);
      })
    })
  )
}

//show detail
export function showAUserDetailsRequest(url = '${apiUrl}/api/v1/agency/1/showAUserDetails/1') {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(url)
      .then((res) => {
        dispatch(action.getAUserDetails(res.data))
        return resolve()
      })
      .catch((err) => {
        // TODO: handle err
        return reject(err.response);
      })
    })
  )
}

/*********** Agency ************/
//search
export function searchAgencyRequest(url = '${apiUrl}/api/v1/agency/1/searchAgency', filterData) {
  console.log(filterData)
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(url,
      {
        filterData
      })
      .then((res) => {
        dispatch(action.searchAgency(res.data))
        return resolve()
      })
      .catch((err) => {
        // TODO: handle err
        return reject(err.response);
      })
    })
  )
}
//
