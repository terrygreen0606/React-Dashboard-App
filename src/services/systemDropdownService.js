import axios from 'axios';
import Http from '../Http';
import * as action from '../store/actions/administrationAction';
const apiUrl = process.env.REACT_APP_API_URL;

export class systemDropdownService {
  checkPermission(data) {
    return axios.post(apiUrl + '/api/v1/check_permission', data);
  }

  getSystemDropdown() {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiUrl + '/api/v1/systemDropdown')
          .then((res) => {
            if (res.status === 200) {
                dispatch(action.getSystemDropdown(res.data)); 
                return resolve();
              } else {
                reject()
              }
          })
      })
    );
  }

  getSystemDropdownList(params) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiUrl + '/api/v1/systemDropdown/' +params)
          .then((res) => {
            if (res.status === 200) {
                dispatch(action.getSystemDropdownList(res.data)); 
                return resolve();
              } else {
                reject()
              }
          })
      })
    );
  }

  systemDropdownSave(data) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.post(apiUrl + '/api/v1/systemDropdown', data)
          .then((res) => {
            if (res.status === 200) {
                dispatch(action.systemDropdownSave(res.data)); 
                return resolve();
              } else {
                reject()
              }
          })
      })
    );
  }

  updateDropdownOption(id,data) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.put(apiUrl + '/api/v1/systemDropdown/' +id, data)
          .then((res) => {
            if (res.status === 200) {
                dispatch(action.updateDropdownOption(res.data)); 
                return resolve();
              } else {
                reject()
              }
          })
      })
    );
  }

}