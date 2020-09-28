import * as ActionTypes from "../action-types";
import Http from "../../Http";

const initialState = {
  isLoading: true,
  error: false,
  groupDataSet: [],
  products: [],
  rules: [],
  individual: [],
  isLoadingAddBtn: false,
  isLoadingOptions: false,
  isLoadingIndividaul: false,
};

const groupManageProcess = (
  state = initialState,
  { type, payload = null }
) => {
  switch (type) {
    case ActionTypes.LOADING_TRUE_GROUPS:
      return { ...state, isLoading: true };
    case ActionTypes.LOADING_FALSE_GROUPS:
      return { ...state, isLoading: false };
    case ActionTypes.GET_FILTERED_GROUPS_DATA:
      return { ...state, groupDataSet: payload };
    case ActionTypes.GET_FILTERED_GROUP:
      return { ...state, individual: payload };
    case ActionTypes.LOADING_TRUE_ADDBTN_GROUPS:
      return { ...state, isLoadingAddBtn: true };
    case ActionTypes.LOADING_FALSE_ADDBTN_GROUPS:
      return { ...state, isLoadingAddBtn: false };
    case ActionTypes.LOADING_TRUE_GROUP_OPTIONS:
      return { ...state, isLoadingOptions: true };
    case ActionTypes.LOADING_FALSE_GROUP_OPTIONS:
      return { ...state, isLoadingOptions: false };
    case ActionTypes.LOADING_TRUE_GROUP:
      return { ...state, isLoadingIndividaul: true };
    case ActionTypes.LOADING_FALSE_GROUP:
      return { ...state, isLoadingIndividaul: false };
    case ActionTypes.GET_FILTERED_GROUP_PRODUCTS:
      return { ...state, products: payload };
    case ActionTypes.GET_FILTERED_GROUP_PRODUCT_RULES:
      return { ...state, rules: payload };
    default:
      return state;
  }
};

export default groupManageProcess;
