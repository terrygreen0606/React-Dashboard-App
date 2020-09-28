import * as ActionTypes from '../action-types';

export function getProducerLogs(payload) {
  return {
    type: ActionTypes.PRODUCER_LOGS_SHOW,
    payload,
  };
}
export function saveProducerLog(payload) {
  return {
    type: ActionTypes.PRODUCER_LOGS_SAVE,
    payload,
  };
}



export function getCommissions(payload) {
  return {
    type: ActionTypes.PRODUCER_COMMISSIONS_SHOW,
    payload,
  };
}

export function getCommAccDetails(payload) {
  return {
    type: ActionTypes.PRODUCER_COMM_ACC_DETAIL_SHOW,
    payload,
  };
}

export function getCommStmtDetails(payload) {
  return {
    type: ActionTypes.PRODUCER_COMM_STMT_DETAIL_SHOW,
    payload,
  };
}

export function getDocuments(payload) {
  return {
    type: ActionTypes.PRODUCER_DOCUMENTS_SHOW,
    payload,
  };
}

export function saveDocument(payload) {
  return {
    type: ActionTypes.PRODUCER_DOCUMENTS_SAVE,
    payload,
  };
}

export function deleteDocument(payload) {
  return {
    type: ActionTypes.PRODUCER_DOCUMENTS_DELETE,
    payload,
  };
}

export function searchAgency(payload) {
  return {
    type: ActionTypes.PRODUCER_AGENCY_SEARCH,
    payload,
  };
}

export function loadAgency(payload) {
  return {
    type: ActionTypes.PRODUCER_AGENCY_LOAD,
    payload,
  };
}

export function switchSearchAgencyModal(payload) {
  return {
    type: ActionTypes.PRODUCER_AGENCY_SWITCH_SEARCH_MODAL,
    payload,
  };
}

export function getAUsers(payload) {
  return {
    type: ActionTypes.PRODUCER_AUSERS_SHOW,
    payload,
  };
}

export function getAUserDetails(payload) {
  return {
    type: ActionTypes.PRODUCER_AUSERS_DETAIL_SHOW,
    payload,
  };
}

export function selectTab(payload) {
  return {
    type: ActionTypes.PRODUCER_TAB_SELECT,
    payload,
  };
}