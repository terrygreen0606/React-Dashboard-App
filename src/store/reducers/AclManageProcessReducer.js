import * as ActionTypes from "../action-types";
import Http from "../../Http";

const initialState = {
  isLoading: true,
  pageTemp: 1,
  sizePerPageTemp: 10,
  error: false,

  DataSet_Applied: [],
  totalCount_DataSet_Applied: 0,
  forceReload_AppliedDataTable: false,
  DataSet_Denied: [],
  totalCount_DataSet_Denied: 0,
  forceReload_DeniedDataTable: false,
  isLoadingAddBtn: false,
  forceReload_AppliedAndDeniedDataTable: 0,


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

  loadingAclmngLevelDD: false,
  levelDD: [],
  levelDDSelected: 27,
  loadingAclmngDeniedDetatable: false,
  loadingAclmngAppliedDetatable: false,
  selectedModule:0,
  loadingAclmngSubmoduleDetatable:false,
  Reload_SubModuleDataTable:0,
  DataSet_Submodule: [],
  totalCount_DataSet_Submodule: 0,
  pageTemp_aclsubmodule: 1,
  sizePerPageTemp_aclsubmodule: 10,
  checked_AclSubmodules:[]
};

const prepareAppliedDataSet = (state, payload) => {
  const {
    returnObject: DataSet_Applied,
    returnCount: totalCount_DataSet_Applied
  } = payload;
  const stateObj = Object.assign({}, state, {
    //loading : false,
    DataSet_Applied,
    totalCount_DataSet_Applied
  });
  return stateObj;
};
const prepareDeniedDataSet = (state, payload) => {
  const {
    returnObject: DataSet_Denied,
    returnCount: totalCount_DataSet_Denied
  } = payload;
  const stateObj = Object.assign({}, state, {
    //loading : false,
    DataSet_Denied,
    totalCount_DataSet_Denied
  });
  return stateObj;
};

const prepareSubmoduleDataSet = (state, payload) => {
  const {
    returnObject: DataSet_Submodule,
    returnCount: totalCount_DataSet_Submodule,
    checked_AclSubmodules: checked_AclSubmodules,
  } = payload;
  const stateObj = Object.assign({}, state, {
    //loading : false,
    DataSet_Submodule,
    totalCount_DataSet_Submodule,
    checked_AclSubmodules,
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
    //_______________________________________________
    case ActionTypes.LOADING_TRUEFALSE_ACLMNG_LEVELDD:
      return { ...state, loadingAclmngLevelDD: payload };
    case ActionTypes.POPULATE_ACLMNG_LEVELDD:
      return { ...state, levelDD: payload };
    case ActionTypes.POPULATE_ACLMNG_LEVELDDSELECTED:
      return { ...state, levelDDSelected: payload };
    case ActionTypes.LOADING_TRUEFALSE_ACLMNG_APPLIEDLIST:
      return { ...state, loadingAclmngAppliedDetatable: payload };
    case ActionTypes.LOADING_TRUEFALSE_ACLMNG_DENIEDLIST:
      return { ...state, loadingAclmngDeniedDetatable: payload };
    case ActionTypes.POPULATE_ACLMNG_APPLIEDLIST:
      return prepareAppliedDataSet(state, payload);
    case ActionTypes.RELOAD_ACLMNG_APPLIEDLIST:
      return { ...state, /*forceReload_AppliedDataTable: payload,*/ forceReload_AppliedAndDeniedDataTable:Math.random() };
    case ActionTypes.POPULATE_ACLMNG_DENIEDLIST:
      return prepareDeniedDataSet(state, payload);
    case ActionTypes.RELOAD_ACLMNG_DENIEDLIST:
      return { ...state, /*forceReload_DeniedDataTable: payload,*/ forceReload_AppliedAndDeniedDataTable:Math.random() };
    case ActionTypes.SET_ACLMNG_MODULE_ID:
        return { ...state, selectedModule: payload};
    case ActionTypes.LOADING_TRUEFALSE_ACLMNG_SUBMODULELIST:
          return { ...state, /*Reload_SubModuleDataTable:Math.random()*/loadingAclmngSubmoduleDetatable:payload };
    case ActionTypes.POPULATE_ACLMNG_SUBMODULELIST:
          return prepareSubmoduleDataSet(state, payload);    
        


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
