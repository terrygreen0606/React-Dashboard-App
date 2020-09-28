import Http from '../Http';
import * as action from '../store/actions';

const apiUrl = process.env.REACT_APP_API_URL;

export function saveComplexManagementData(params) {
    return dispatch => (
      new Promise((resolve, reject) => {
        //dispatch(action.isLoading());
        Http.post(apiUrl + '/api/v1/complexManagement',params)
          .then((res) => {
            return resolve(res.data);
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
  export function getComplexSearch(params){
    return dispatch => (
      new Promise((resolve, reject) =>{
        Http.get(apiUrl+`/api/v1/complexManagement?filter=${JSON.stringify(params)}`)
          .then((res) =>{
            // dispatch(action.searchComplex(res.data));
            // console.log(res.data);
            return resolve(res.data);
          })
          .catch((err) => {
            const { status, errors } = err.response.data;
            const data = {
              status,
              errors
            };
            return reject(data);
          });
      })
    );
  }
  
  /**
   * 
   * @param {product as 1} product 
   * @param {zipCode} zipCode 
   * @param {'COMPLEX'} source 
   */
  export function getZipDetails(product, zipCode, source) {
    return dispatch => (
      new Promise((resolve, reject) => {
        //dispatch(action.isLoading());
        Http.get(apiUrl + '/api/v1/quoteEPIC/getZipCodeDetails/'+product+'/'+zipCode+'/'+source)
          .then((res) => {
            return resolve(res.data);
          })
      })
    );
  }