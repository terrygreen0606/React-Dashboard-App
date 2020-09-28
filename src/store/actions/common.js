import * as ActionTypes from '../action-types';

export function setAsideComponent(payload) {
  return {
    type: ActionTypes.SET_ASIDE_COMPONENT,
    payload,
  };
}

export function editRow(payload) {
  return {
    type: ActionTypes.EDIT_ROW,
    payload,
  };
}

export function getAgencyDropdown(payload) {
  return {
    type: ActionTypes.GET_AGENCY_DROPDOWN,
    payload,
  };
}

export function getAgentDropdown(payload) {
  return {
    type: ActionTypes.GET_AGENT_DROPDOWN,
    payload,
  };
}

export function getNewAgentDropdown(payload) {
  return {
    type: ActionTypes.GET_NEW_AGENT_DROPDOWN,
    payload,
  };
}
export function getAgencyCode(payload) {
  return {
    type: ActionTypes.GET_AGENCY_CODE,
    payload,
  };
}

export function getSearchPolicyForTransferBook(payload) {
  return {
    type: ActionTypes.GET_SEARCH_POLICY,
    payload,
  };
}

export function transferBook(payload) {
  return {
    type: ActionTypes.TRANSFER_BOOK,
    payload,
  };
}

export function getTransfrBookReason(payload) {
  return {
    type: ActionTypes.GET_REASON,
    payload,
  };
}
