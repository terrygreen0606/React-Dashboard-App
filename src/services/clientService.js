import Http from '../Http';
import * as action from '../store/actions';

const apiUrl = process.env.REACT_APP_API_URL;
//const apiUrl = 'http://127.0.0.1:8000';
export default function getClient(credentials) {
  //console.log(credentials);
//const apiUrl = process.env.REACT_APP_API_URL;
return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl+'/api/v1/getClients', credentials)
        .then((res) => {  
          //console.log(res); 
          dispatch(action.searchClient(res.data));
          return resolve();
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          return reject(data);
          // console.log(err);
        });
    })
  );
}

export function addClient(credentials) {
  //console.log(credentials);
return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl+'/api/v1/addClient', credentials)
        .then((res) => {  
          //console.log(res); 
          dispatch(action.addClient(res.data));
          return resolve();
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          return reject(data);
          // console.log(err);
        });
    })
  );
}

export function saveClientForm(credentials) {
  //console.log(credentials);
return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl+'/api/v1/saveClientForm', credentials)
        .then((res) => {  
          //console.log(res); 
          dispatch(action.saveClientForm(res.data));
          return resolve();
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          return reject(data);
          // console.log(err);
        });
    })
  );
}