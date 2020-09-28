import axios from 'axios';
import Http from '../Http';
import * as action from '../store/actions/administrationAction';
const apiUrl = process.env.REACT_APP_API_URL;

export class claimEventService {
  checkPermission(data) {
    return axios.post(apiUrl + '/api/v1/check_permission', data);
  }

  getClaimEventData() {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiUrl + '/api/v1/claimEvent')
          .then((res) => {
            if (res.status === 200) {
                dispatch(action.getClaimEventData(res.data)); 
                return resolve();
              } else {
                reject()
              }
          })
      })
    );
  }

  eventClaimSave(data) {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.post(apiUrl + '/api/v1/claimEvent', data)
          .then((res) => {
            if (res.status === 200) {
                dispatch(action.eventClaimSave(res.data)); 
                return resolve();
              } else {
                reject()
              }
          })
      })
    );
  }


}