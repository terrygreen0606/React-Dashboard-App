import * as ActionTypes from "../action-types";
import Http from "../../Http";

const initialState = {
  isLoading: true,
  error: false,
  territoryDataSet: [],
  countries: [],
  states: [],
  countiies: [],
  zipcodes: [],
  individual: [],
  isLoadingAddBtn: false,
  isLoadingMap: false,
  isLoadingIndividaul: false,
};

const territoryManageProcess = (
  state = initialState,
  { type, payload = null }
) => {
  switch (type) {
    case ActionTypes.LOADING_TRUE_TERRITORYMODULE:
      return { ...state, isLoading: true };
    case ActionTypes.LOADING_FALSE_TERRITORYMODULE:
      return { ...state, isLoading: false };
    case ActionTypes.GET_FILTERED_TERRITORY_DATA_MNGMODULE:
      return { ...state, territoryDataSet: payload };
    case ActionTypes.LOADING_TRUE_ADDBTN_TERRITORYMODULE:
      return { ...state, isLoadingAddBtn: true };
    case ActionTypes.LOADING_FALSE_ADDBTN_TERRITORYMODULE:
      return { ...state, isLoadingAddBtn: false };
    case ActionTypes.LOADING_TRUE_TERRITORY_MAP:
      return { ...state, isLoadingMap: true };
    case ActionTypes.LOADING_FALSE_TERRITORY_MAP:
      return { ...state, isLoadingMap: false };
    case ActionTypes.LOADING_TRUE_TERRITORY_INDIVIDUAL:
      return { ...state, isLoadingIndividaul: true };
    case ActionTypes.LOADING_FALSE_TERRITORY_INDIVIDUAL:
      return { ...state, isLoadingIndividaul: false };
    case ActionTypes.GET_FILTERED_TERRITORY_COUNTRY_DATA:
      return { ...state, countries: payload, states: [], counties: [], zipcodes: [] };
    case ActionTypes.GET_FILTERED_TERRITORY_STATE_DATA:
      return { ...state, states: payload, counties: [], zipcodes: [] };
    case ActionTypes.GET_FILTERED_TERRITORY_COUNTY_DATA:
      return { ...state, counties: payload, zipcodes: [] };
    case ActionTypes.GET_FILTERED_TERRITORY_ZIPCODE_DATA:
      return { ...state, zipcodes: payload };
    case ActionTypes.GET_FILTERED_TERRITORY_INDIVIDUAL_DATA:
      return { ...state, individual: payload };
    default:
      return state;
  }
};

export default territoryManageProcess;
