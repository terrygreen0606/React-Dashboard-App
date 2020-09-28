import * as ActionTypes from '../action-types';

export function addEditClaim(payload) {	
  return {
    type: ActionTypes.ADD_EDIT_CLAIM,
    payload,
  };
}

export function getMasterValues(payload) {
  return {
    type: ActionTypes.GET_MASTER_VALUES_CLAIM_DD,
    payload,
  };
}

export function getSubStatusValues(payload) {
  return {
    type: ActionTypes.GET_SUB_STATUS_DD,
    payload,
  };
}

export function getReviewSubStatusValues(payload) {
  return {
    type: ActionTypes.GET_REVIEW_SUB_STATUS_DD,
    payload,
  };
}

export function setClaimDetailForEdit(payload) {
  return {
    type: ActionTypes.SET_CLAIM_DETAIL_FOR_EDIT,
    payload,
  };

}

export function getDataForAdjusterMap(payload) {
  return {
    type: ActionTypes.GET_ADJUSTER_DATA_FOR_MAP,
    payload,
  };
}

export function setSubStatusLoading(payload) {
  return {
    type: ActionTypes.LOADING_SUB_STATUS,
    payload,
  };
}

export function setReviewSubStatusLoading(payload) {
  return {
    type: ActionTypes.LOADING_REVIEW_SUB_STATUS,
    payload,
  };
}

export function setClaimManagerLoading(payload) {
  return {
    type: ActionTypes.LOADING_CLAIM_MANAGER,
    payload,
  };
}