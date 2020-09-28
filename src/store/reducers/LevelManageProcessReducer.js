import * as ActionTypes from "../action-types";
import Http from "../../Http";

const initialState = {
  isLoading: true,
  pageTemp: 1,
  sizePerPageTemp: 10,
  error: false,
  levelDataSet: [],
  totalCount_levelDataSet: 0,

  /**Manage Level */
  isLoadingAddBtn: false,
  loadingAddProcss: false,
  loadingListProcss: false,
  addEditFormFieldValues: {
    UserLevel_ID: "",
    s_UserLevelCode: "",
    UserLevel_Name: "",
    s_UserLevelMainCode: ""
  },
  reloadLevelmngLevelList:0,
};

const prepareLevelDataSet = (state, payload) => {
  const {
    returnObject: levelDataSet,
    returnCount: totalCount_levelDataSet
  } = payload;
  const stateObj = Object.assign({}, state, {
    //loading : false,
    levelDataSet,
    totalCount_levelDataSet
  });
  return stateObj;
};

const levelManageProcess = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.LOADING_TRUE:
      return { ...state, isLoading: true };
    case ActionTypes.LOADING_FALSE:
      return { ...state, isLoading: false };
    case ActionTypes.GET_FILTERED_LEVEL_DATA:
      return prepareLevelDataSet(state, payload);
    case ActionTypes.LOADING_TRUE_ADDBTN:
      return { ...state, isLoadingAddBtn: true };
    case ActionTypes.LOADING_FALSE_ADDBTN:
      return { ...state, isLoadingAddBtn: false };
    case ActionTypes.LOADING_TRUEFALSE_LEVELADD:
      //console.log("inside Reducer:-" + payload);
      return { ...state, loadingAddProcss: payload };
    case ActionTypes.LOADING_TRUEFALSE_LEVELLIST:
      return { ...state, loadingListProcss: payload };
    case ActionTypes.RELOAD_LEVELMNG_LEVELLIST:
      return { ...state, reloadLevelmngLevelList: Math.random() };

    case ActionTypes.POPULATE_LEVEL_ADDEDITFORM:
      return {
        ...state,
        addEditFormFieldValues: payload,
        loadingAddProcss: false
      };
    case ActionTypes.RESET_LEVEL_ADDEDITFORM:
      return {
        ...state,
        addEditFormFieldValues: {
          UserLevel_ID: "",
          s_UserLevelCode: "",
          UserLevel_Name: "",
          s_UserLevelMainCode: ""
        },
        loadingAddProcss: false
      };

    default:
      return state;
  }
};

export default levelManageProcess;
