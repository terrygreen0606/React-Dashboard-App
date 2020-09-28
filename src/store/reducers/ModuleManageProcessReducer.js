import * as ActionTypes from "../action-types";
import Http from "../../Http";

const initialState = {
  isLoading: true,
  pageTemp: 1,
  sizePerPageTemp: 10,
  searchKey: "praweer",
  error: false,
  levelDataSet: [],
  totalCount_levelDataSet: 0,
  isLoadingAddBtn: false,
  reloadModulemngModuleList: 0,

  loadingAddProcss: false,
  loadingListProcss: false,

  addEditFormFieldValues: {
    n_UserModule_PK: "",
    s_UserModuleName: "",
    s_UserModuleCode: ""
  }
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

const prepareLevelDataSet1 = (state, payload) => {
  const stateObj = Object.assign({}, state, {
    loading: false,
    payload
  });
  return stateObj;
};

const moduleManageProcess = (
  state = initialState,
  { type, payload = null }
) => {
  switch (type) {
    case ActionTypes.LOADING_TRUE_MNGMODULE:
      return { ...state, isLoading: true };
    case ActionTypes.LOADING_FALSE_MNGMODULE:
      return { ...state, isLoading: false };
    case ActionTypes.GET_FILTERED_LEVEL_DATA_MNGMODULE:
      return prepareLevelDataSet(state, payload);
    case ActionTypes.LOADING_TRUE_ADDBTN_MNGMODULE:
      return { ...state, isLoadingAddBtn: true };
    case ActionTypes.LOADING_FALSE_ADDBTN_MNGMODULE:
      return { ...state, isLoadingAddBtn: false };
    case ActionTypes.LOADING_TRUEFALSE_MODULEADD:
      return { ...state, loadingAddProcss: payload };
    case ActionTypes.LOADING_TRUEFALSE_MODULELIST:
      return { ...state, loadingListProcss: payload };
    case ActionTypes.CLEAR_SEARCHFIELD_DATATABLE:
      //return { ...state, searchKey: payload };
      //return prepareLevelDataSet1(state, [{searchKey: payload}]);
      return Object.assign({}, state, { loading: false, searchKey: payload });
    case ActionTypes.RELOAD_MODULEMNG_MODULELIST:
      return { ...state, reloadModulemngModuleList: Math.random() };

    case ActionTypes.POPULATE_MODULE_ADDEDITFORM:
      return {
        ...state,
        addEditFormFieldValues: payload,
        loadingAddProcss: false
      };
    case ActionTypes.RESET_MODULE_ADDEDITFORM:
      return {
        ...state,
        addEditFormFieldValues: {
          n_UserModule_PK: "",
          s_UserModuleName: "",
          s_UserModuleCode: ""
        },
        loadingAddProcss: false
      };
    default:
      return state;
  }
};

export default moduleManageProcess;
