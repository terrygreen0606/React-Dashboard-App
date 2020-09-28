import Http from '../Http';
import * as action from '../store/actions/quoteEntry';
import { toastAction } from '../store/actions/toast-actions';

const apiUrl = process.env.REACT_APP_API_URL;

export function getQuoteBaseDD(product) {
  var baseDataUrl = '/api/v1/getQuoteBaseData';
  if(product == 13){
    baseDataUrl = '/api/v1/getQuoteBaseData'
  } else if(product == 15) {
    baseDataUrl = '/api/v1/Ho3Sel/getQuoteBaseData'
  } else if(product == 16) {
    baseDataUrl = '/api/v1/Ho6Sel/getQuoteBaseData'
  } else if(product == 5) {
    baseDataUrl = '/api/v1/MHOD/getQuoteBaseData'
  } else if(product == 6) {
    baseDataUrl = '/api/v1/MDPD/getQuoteBaseData'
  } else if(product == 1) {
    baseDataUrl = '/api/v1/HO3H/getQuoteBaseData'
  } else if(product == 2) {
    baseDataUrl = '/api/v1/HO6H/getQuoteBaseData'
  } else {
    baseDataUrl = '/api/v1/getQuoteBaseData'
  }

  return dispatch => (
    new Promise((resolve, reject) => {
      dispatch(action.isLoading());
      Http.get(apiUrl + baseDataUrl)
        .then((res) => {
          dispatch(action.getQuoteBaseDD(res.data));
          return resolve();
        })
    })
  );
}

export function getZipDetails(product, zipCode, source, effDate = '') {
  var zipUrl = '/api/v1/quoteEPIC/getZipCodeDetails/'+product+'/'+zipCode+'/'+source;
  if(effDate != ''){
    zipUrl = '/api/v1/MDPD/getZipCodeDetails/'+product+'/'+zipCode+'/'+source+'/'+effDate;
  }
  return dispatch => (
    new Promise((resolve, reject) => {
      //dispatch(action.isLoading());
      Http.get(apiUrl + zipUrl)
        .then((res) => {
          return resolve(res.data);
        })
    })
  );
}

export function saveQuoteEntryData(params, product) {
  var quoteEntry = '/api/v1/quoteEPIC/quoteEntry';
  if(product == 13){
    quoteEntry = '/api/v1/quoteEPIC/quoteEntry'
  } else if(product == 15) {
    quoteEntry = '/api/v1/Ho3Sel/quoteEntry'
  } else if(product == 16) {
    quoteEntry = '/api/v1/Ho6Sel/quoteEntry'
  } else if(product == 5) {
    quoteEntry = '/api/v1/MHOD/quoteEntry'
  } else if(product == 6) {
    quoteEntry = '/api/v1/MDPD/quoteEntry'
  } else if(product == 1) {
    quoteEntry = '/api/v1/HO3H/quoteEntry'
  } else if(product == 2) {
    quoteEntry = '/api/v1/HO6H/quoteEntry'
  } else {
    quoteEntry = '/api/v1/quoteEPIC/quoteEntry'
  }
  return dispatch => (
    new Promise((resolve, reject) => {
      dispatch(action.isLoading());
      Http.post(apiUrl + quoteEntry,params)
        .then((res) => {
          dispatch(action.stopLoading());
          return resolve(res.data);
        })
    })
  );
}

export function getAgencyAgent(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      dispatch(action.isLoading());
      Http.get(apiUrl + '/api/v1/quoteEPIC/getAgentDD/'+params)
        .then((res) => {
          dispatch(action.stopLoading());
          return resolve(res.data);
        })
    })
  );
}

export function getSearchAgency(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      //dispatch(action.isLoading());
      Http.post(apiUrl + '/api/v1/quoteEPIC/getAgency',params)
        .then((res) => {
          //dispatch(action.stopLoading());
          return resolve(res.data);
        })
    })
  );
}

export function deleteInformations(selectedPK, source) {
  return dispatch => (
    new Promise((resolve, reject) => {
      dispatch(action.isLoading());
      Http.post(apiUrl + '/api/v1/quoteEPIC/deleteInformation/'+selectedPK+'/'+source)
        .then((res) => {
          dispatch(action.stopLoading());
          return resolve(res.data);
        })
    })
  );
}

export function saveAddiInterestHhmData(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      dispatch(action.isLoading());
      Http.post(apiUrl + '/api/v1/quoteEPIC/saveAddiInterestHhmData',params)
        .then((res) => {
          dispatch(action.stopLoading());
          return resolve(res.data);
        })
    })
  );
}

export function getQuoteSavedData(poTransPK, product) {
  var savedData = '/api/v1/quoteEPIC/getQuoteData/'+poTransPK;
  if(product == 13){
    savedData = '/api/v1/quoteEPIC/getQuoteData/'+poTransPK
  } else if(product == 15) {
    savedData = '/api/v1/Ho3Sel/getQuoteData/'+poTransPK
  } else if(product == 16) {
    savedData = '/api/v1/Ho6Sel/getQuoteData/'+poTransPK
  } else if(product == 5) {
    savedData = '/api/v1/MHOD/getQuoteData/'+poTransPK
  } else if(product == 6) {
    savedData = '/api/v1/MDPD/getQuoteData/'+poTransPK
  } else if(product == 1) {
    savedData = '/api/v1/HO3H/getQuoteData/'+poTransPK
  } else if(product == 2) {
    savedData = '/api/v1/HO6H/getQuoteData/'+poTransPK
  } else {
    savedData = '/api/v1/quoteEPIC/getQuoteData/'+poTransPK
  }
  return dispatch => (
    new Promise((resolve, reject) => {
      dispatch(action.isLoading());
      Http.get(apiUrl + savedData)
        .then((res) => {
          dispatch(action.stopLoading());
          return resolve(res.data);
        })
    })
  );
}

export function searchMortgageesData(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl + '/api/v1/quoteEPIC/searchMortgagees',params)
        .then((res) => {
          return resolve(res.data);
        })
    })
  );
}

export function saveMortgageeData(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl + '/api/v1/quoteEPIC/saveMortgagee',params)
        .then((res) => {
          return resolve(res.data);
        })
    })
  );
}

export function printRateSheet(poTransPK) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiUrl + '/api/v1/Report/printRateSheet/'+poTransPK)
        .then((res) => {
          return resolve(res.data);
        })
    })
  );
}

/**
 * Fetch Error Description based on error code
 * @param {Array of Error code} errorCode
 * Author : Kiran Ivalekar
 */
export function getErrorMsg(errorCode) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiUrl + '/api/v1/getErrorMsg', errorCode)
        .then((res) => {
          return resolve(res.data);
        }).catch(function (error) { // catch
          return reject(error);
      });
    })
  );
}