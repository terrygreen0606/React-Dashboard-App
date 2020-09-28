import * as ActionTypes from '../action-types';

export function isLoading() {
  return {
    type: ActionTypes.IS_LOADING
  };
}

export function stopLoading() {
  return {
    type: ActionTypes.STOP_LOADING
  };
}

export function getQuoteBaseDD(payload) {
  return {
    type: ActionTypes.GET_QUOTE_BASE_DD,
    payload,
  };
}