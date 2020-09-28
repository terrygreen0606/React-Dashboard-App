import axios from 'axios';
import Http from '../Http';
import * as action from '../store/actions/administrationAction';
const apiUrl = process.env.REACT_APP_API_URL;

export class gMapService {

  fetchGmapRules() {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiUrl + 'api/v1/getMapZoneData')
          .then((res) => {
            if (res.status === 200) {
              dispatch(action.fetchGmapRules(res.data));
              return resolve();
            } else {
              reject()
            }
          })
      })
    );
  }

  getMapZoneData(id) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiUrl + 'api/v1/getMapZoneData/' + id)
          .then((res) => {
            if (res.status === 200) {
              dispatch(action.getMapZoneData(res.data));
              return resolve();
            } else {
              reject()
            }
          })
      })
    );
  }

  saveGmapZone(data) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.post(apiUrl + 'api/v1/saveMapZone', data)
          .then((res) => {
            if (res.status === 200) {
              dispatch(action.saveGmapZone(res.data));
              return resolve();
            } else {
              reject()
            }
          })
      })
    );
  }

  fetchGroups(id) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiUrl + 'api/v1/createGroup/' + id)
          .then((res) => {
            if (res.status === 200) {
              dispatch(action.fetchGroups(res.data));
              return resolve();
            } else {
              reject()
            }
          })
      })
    );
  }

  saveGroup(data) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.post(apiUrl + 'api/v1/createGroupSave', data)
          .then((res) => {
            if (res.status === 200) {
              dispatch(action.saveGroup(res.data));
              return resolve();
            } else {
              reject()
            }
          })
      })
    );
  }

  fetchGroupsListing() {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiUrl + 'api/v1/editGroup')
          .then((res) => {
            if (res.status === 200) {
              dispatch(action.fetchGroupsListing(res.data));
              return resolve();
            } else {
              reject()
            }
          })
      })
    );
  }

}