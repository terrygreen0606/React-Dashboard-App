import * as ActionTypes from '../action-types';

export function authLogin(payload) {
  return {
    type: ActionTypes.AUTH_LOGIN,
    payload,
  };
}

export function authLogout() {
  return {
    type: ActionTypes.AUTH_LOGOUT,
  };
}

export function authCheck() {
  return {
    type: ActionTypes.AUTH_CHECK,
  };
}


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

export function getPolicySearchParams() {
  return {
    type: ActionTypes.GET_POLICY_SEARCH_PARAMS
  }
}

export function setPolicySearchParams(content) {
  return {
    type: ActionTypes.SET_POLICY_SEARCH_PARAMS,
    content
  }
}


/************* Accounting Batch Process ***************/
export function setBatchData(payload) {
  return {
    type: ActionTypes.GET_FILTERED_BATCH_MASTERS,
    payload
  }
}

export function editBatchDetailsData(payload) {
  return {
    type: ActionTypes.EDIT_BATCH_DETAILS,
    payload
  }
}

export function getTransSubType(payload) {
  return {
    type: ActionTypes.GET_TRANS_SUB_TYPE,
    payload
  }
}

export function searchAccount(payload) {
  return {
    type: ActionTypes.SEARCH_ACCOUNT,
    payload
  }
}


export function loader(status) {
  return {
    type: ActionTypes.LOADING,
    status
  };
}

/************* Client Management ***************/
export function searchClient(payload) {
  return {
    type: ActionTypes.SEARCH_CLIENT,
    payload,
  };
}
export function addClient(payload) {
  //console.log(path)
  return {
    type: ActionTypes.ADD_CLIENT,
    payload,
  };
}

export function saveAddress(payload) {
  //console.log(payload)
  return {
    type: ActionTypes.SAVE_ADDR,
    payload,
  };
}

export function saveClientForm(payload) {
  //console.log(payload)
  return {
    type: ActionTypes.SAVE_CLIENT_FORM,
    payload,
  };
}

export function saveRole(payload) {
  //console.log(payload)
  return {
    type: ActionTypes.SAVE_ROLE,
    payload,
  };
}

export function setClientPk(payload) {
  //console.log(payload)
  return {
    type: ActionTypes.SET_CLIENTPK,
    payload,
  };
}

/**
 * ADMINISTRATION MODULE
 */
export function loadLeftNavigation(payload) {
  return {
    type: ActionTypes.LEFTNAV_FLAG,
    payload,
  };
}


/*
MODULE SUB_MODULE ACCESS
*/

export function checkPermission(payload){
  return{
    type: ActionTypes.CHECK_PERMISSION,
    payload,
  };
}

export function checkPermissionClear(){
  return{
    type: ActionTypes.CHECK_PERMISSION_CLEAR,
  };
}