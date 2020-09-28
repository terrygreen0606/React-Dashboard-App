import * as ActionTypes from '../action-types';

const initialState = {
  products: [],
  generateCommission: [],
  commissionDetails: [],
  isLoadingProducts: false,
  isGeneratingCommission: false,
  isPostingCommission: "unsets",
  isLoadingCommissionDetail: false,
}


const commissionProcess = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.LOADING_PRODUCTS:
      return {...state, isLoadingProducts: payload};
    case ActionTypes.GET_PRODUCTS:
      return {...state, products: payload, isLoadingProducts: false};
    case ActionTypes.LOADING_COMMISSION_GENERATE:
      return {...state, isGeneratingCommission: payload};
    case ActionTypes.GET_COMMISSION_GENERATE:
      return {...state, generateCommission: payload, isGeneratingCommission: false};
    case ActionTypes.POSTING_COMMISSION:
      return {...state, isPostingCommission: payload};
    case ActionTypes.LOADING_COMMISSION_DETAILS:
      return {...state, isLoadingCommissionDetail: payload};
    case ActionTypes.GET_COMMISSION_DETAILS:
      return {...state, commissionDetails: payload, isLoadingCommissionDetail: false};
    default:
      return state;
  }
};

export default commissionProcess;