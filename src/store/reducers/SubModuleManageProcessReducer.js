import * as ActionTypes from "../action-types";
import Http from "../../Http";

const initialState = {
  isLoading: true,
  pageTemp: 1,
  sizePerPageTemp: 10,
  error: false,
  levelDataSet: [],
  totalCount_levelDataSet: 0,
  isLoadingAddBtn: false,

  loadingAddProcss: false,
  loadingListProcss: false,
  loadingAddProcssModuleDD: true,
  moduleDD: [],
  addEditFormFieldValues: {
    n_UserSubModule_PK: "",
    n_UserModule_FK: "",
    s_UserSubModuleName: "",
    s_UserSubModuleCode: ""
  },
  loadingAddProcssDoctypeDD: true,
  doctypeDD: [],
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

const subModuleManageProcess = (
  state = initialState,
  { type, payload = null }
) => {
  switch (type) {
    case ActionTypes.LOADING_TRUE_MNGSUBMODULE:
      return { ...state, isLoading: true };
    case ActionTypes.LOADING_FALSE_MNGSUBMODULE:
      return { ...state, isLoading: false };
    case ActionTypes.GET_FILTERED_LEVEL_DATA_MNGSUBMODULE:
      return prepareLevelDataSet(state, payload);
    case ActionTypes.LOADING_TRUE_ADDBTN_MNGSUBMODULE:
      return { ...state, isLoadingAddBtn: true };
    case ActionTypes.LOADING_FALSE_ADDBTN_MNGSUBMODULE:
      return { ...state, isLoadingAddBtn: false };
    case ActionTypes.LOADING_TRUEFALSE_SUBMODULEADD:
      return { ...state, loadingAddProcss: payload };
    case ActionTypes.LOADING_TRUEFALSE_SUBMODULELIST:
      return { ...state, loadingListProcss: payload };
    case ActionTypes.LOADING_TRUEFALSE_SUBMODULE_MODULEDD:
      return { ...state, loadingAddProcssModuleDD: payload };
    case ActionTypes.POPULATE_SUBMODULE_MODULEDD:
      return { ...state, moduleDD: payload };
      case ActionTypes.LOADING_TRUEFALSE_SUBMODULE_DOCTYPEDD:
        return { ...state, loadingAddProcssDoctypeDD: payload };
      case ActionTypes.POPULATE_SUBMODULE_DOCTYPEDD:
        console.log(payload);
        return { ...state, doctypeDD: payload };  
    case ActionTypes.POPULATE_SUBMODULE_ADDEDITFORM:
      return {
        ...state,
        addEditFormFieldValues: payload,
        loadingAddProcss: false
      };
    case ActionTypes.RESET_SUBMODULE_ADDEDITFORM:
      return {
        ...state,
        addEditFormFieldValues: {
          n_UserSubModule_PK: "",
          n_UserModule_FK: "",
          s_UserSubModuleName: "",
          s_UserSubModuleCode: ""
        },
        loadingAddProcss: false
      };
    default:
      return state;
  }
};

export default subModuleManageProcess;
