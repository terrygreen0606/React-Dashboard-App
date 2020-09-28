import * as ActionTypes from "../action-types";
import Http from "../../Http";

const initialState = {
  isLoading: true,
  error: false,
  ruleDataSet: [],
  commBaseTypeOpts: [],
  frqPaymentOpts: [],
  commCalcTypeOpts: [],
  rangeTypeListOpts: [],
  commRuleStatusOpts: [],
  lobListOpts: [],
  policyActionListOpts: [],
  territoryOpts: [],
  productOpts: [],
  individual: [],
  isLoadingAddBtn: false,
  isLoadingOptions: false,
  isLoadingIndividaul: false,
};

const ruleManageProcess = (
  state = initialState,
  { type, payload = null }
) => {
  switch (type) {
    case ActionTypes.LOADING_TRUE_RULES:
      return { ...state, isLoading: true };
    case ActionTypes.LOADING_FALSE_RULES:
      return { ...state, isLoading: false };
    case ActionTypes.GET_FILTERED_RULES_DATA:
      return { ...state, ruleDataSet: payload };
    case ActionTypes.GET_FILTERED_RULE:
      return { ...state, individual: payload };
    case ActionTypes.LOADING_TRUE_ADDBTN_RULES:
      return { ...state, isLoadingAddBtn: true };
    case ActionTypes.LOADING_FALSE_ADDBTN_RULES:
      return { ...state, isLoadingAddBtn: false };
    case ActionTypes.LOADING_TRUE_RULE_OPTIONS:
      return { ...state, isLoadingOptions: true };
    case ActionTypes.LOADING_FALSE_RULE_OPTIONS:
      return { ...state, isLoadingOptions: false };
    case ActionTypes.LOADING_TRUE_RULE:
      return { ...state, isLoadingIndividaul: true };
    case ActionTypes.LOADING_FALSE_RULE:
      return { ...state, isLoadingIndividaul: false };
    case ActionTypes.GET_FILTERED_RULE_OPTIONS:
      return { 
        ...state, 
        commBaseTypeOpts: payload.commBaseTypeOpts,
        frqPaymentOpts: payload.frqPaymentOpts,
        commCalcTypeOpts: payload.commCalcTypeOpts,
        rangeTypeListOpts: payload.rangeTypeListOpts,
        commRuleStatusOpts: payload.commRuleStatusOpts,
        lobListOpts: payload.lobListOpts,
        policyActionListOpts: payload.policyActionListOpts,
        territoryOpts: payload.territoryOpts,
        productOpts: payload.productOpts
      };
    case ActionTypes.GET_FILTERED_RULE_PRODUCTS:
      return { ...state, productOpts: payload };
    default:
      return state;
  }
};

export default ruleManageProcess;
