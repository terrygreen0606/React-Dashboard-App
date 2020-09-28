import * as ActionTypes from "../action-types";

import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export function getPolicyBaseData() {
  return {
    type: ActionTypes.GET_POLICY_BASE_DATA
  }
}

export function setPolicyBaseData(content) {
  return {
    type: ActionTypes.SET_POLICY_BASE_DATA,
    content
  }
}

export function setPolicyBatchData(content) {
  return {
    type: ActionTypes.SET_POLICY_DATA,
    content
  }
}

export function getPolicyBatchData(data) {
  return (dispatch) => {
    axios.post(baseUrl + '/api/v1/BPC/getAllBatches', data)
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
           //dispatch(setPolicyBatchData(res.data))
        }
      })
  }
}

export function updateQuoteParam(parentKey, childKey, value) {
  return {
    type: ActionTypes.UPDATE_QUOTE_PARAM,
    payload: {
      parentKey, childKey, value
    }
  }
}

export function getSessionData() {
  return {
    type: ActionTypes.GET_SESSION_DATA
  }
}

export function setSessionData(content) {
  return {
    type: ActionTypes.SET_SESSION_DATA,
    content
  }
}

export function getPolicyFilteredData() {
  return {
    type: ActionTypes.GET_POLICY_FILTERED_DATA
  }
}

export function setPolicyFilteredData(content) {
  return {
    type: ActionTypes.SET_POLICY_FILTERED_DATA,
    content
  }
}

export function setParamForIssuedScr(payload) {
  //console.log(payload)
  return {
    type: ActionTypes.SET_PARAM_FOR_ISSUED_SCR,
    payload,
  };
}

export function getPolicyHeaderData(data) {
  return (dispatch) => {
    axios.post(baseUrl + '/api/v1/policyHeaderInformation', data)
      .then(res => {
        //console.log(res.data);
        if (res.status === 200) {
           dispatch(setPolicyHeaderData(res.data))
        }
      })
  }
}

export function setPolicyHeaderData(content) {
  return {
    type: ActionTypes.SET_POL_HEAD_DATA,
    content
  }
}

export function setMaxTransData(payload) {
  //console.log(payload)
  return {
    type: ActionTypes.SET_MAX_TRANS_DATA,
    payload,
  };
}

