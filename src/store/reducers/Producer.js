import * as ActionTypes from '../action-types';
import Http from '../../Http';

//****Producer****//
const initialState = {
  s_Authorization: "",
  s_PaActivityLogNotes: "",
  //logs
  data: [],
  Log: {
    d_PaActivityLogDate: "",
    n_PaActivityLogsId_PK: 0,
    s_PaActivityLogNotes: "",
    s_ScreenName: "",
  },
  //commissions
  commData_arr: {},
  //commission_detail
  commAccDetail_arr: [],
  commStmtDetail_arr: [],
  //documents
  docData_arr: {},
  //agency user
  AUserData_arr: [],
  agentData: {},
  AUserDetail_arr: [],
  userLevel_arr: [],
  product_arr: [],
  ruleType_arr: [],
  state_arr: [],
  employee_arr: [],
  authType_arr: [],
  productType_arr: [],
  //agency
  agencyId: 1,//!!!important
  agencyData_arr: [],
  agencySearchModalState: false,
  //ui control
  tabId: '1',
};

const Producer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.PRODUCER_LOGS_SHOW:
      return getProducerLogs(state, payload);
    case ActionTypes.PRODUCER_LOGS_SAVE:
      return saveProducerLog(state, payload);
    case ActionTypes.PRODUCER_COMMISSIONS_SHOW:
      return showCommissionsRequest(state, payload);
    case ActionTypes.PRODUCER_COMM_ACC_DETAIL_SHOW:
      return showCommAccDetailRequest(state, payload);
    case ActionTypes.PRODUCER_COMM_STMT_DETAIL_SHOW:
      return showCommStmtDetailRequest(state, payload);
    case ActionTypes.PRODUCER_DOCUMENTS_SHOW:
      return showDocumentsRequest(state, payload);
    case ActionTypes.PRODUCER_DOCUMENTS_DELETE:
      return deleteDocumentRequest(state, payload);
    case ActionTypes.PRODUCER_DOCUMENTS_SAVE:
      return saveDocumentRequest(state, payload);
    case ActionTypes.PRODUCER_AGENCY_SEARCH:
      return searchAgencyRequest(state, payload);
    case ActionTypes.PRODUCER_AGENCY_LOAD:
      return loadAgencyRequest(state, payload);
    case ActionTypes.PRODUCER_AGENCY_SWITCH_SEARCH_MODAL:
      return switchAgencySearchModalRequest(state, payload);
    case ActionTypes.PRODUCER_AUSERS_SHOW:
      return showAUsersRequest(state, payload);
    case ActionTypes.PRODUCER_AUSERS_DETAIL_SHOW:
      return showAUserDetailsRequest(state, payload);
      case ActionTypes.PRODUCER_TAB_SELECT:
      return selectTabRequest(state, payload);
    default:
      return state;
  }
};
//****logs****//
function saveProducerLog(state , payload) {
  const data = [ payload.data, ...state.data];
  return {
    ...state,
    data: data
  };

}

function getProducerLogs(state, payload) {
  return {
    ...state,
    data: payload.data
  };
}

//****commissions****//
function showCommissionsRequest(state, payload) {
  return {
    ...state,
    commData_arr: payload.data
  };
}

function showCommAccDetailRequest(state, payload) {
  return {
    ...state,
    commAccDetail_arr: payload.data
  };
}

function showCommStmtDetailRequest(state, payload) {
  return {
    ...state,
    commStmtDetail_arr: payload.data
  };
}

//****Documents****//
function showDocumentsRequest(state, payload) {
  return {
    ...state,
    docData_arr: payload.data
  };
}

function deleteDocumentRequest(state, payload) {

  var data = state.docData_arr;
  data.docAFT_list.splice(data.docAFT_list.findIndex(({n_doctrack_PK}) => n_doctrack_PK == payload.data), 1);
  return {
    ...state,
    docData_arr: data
  };
}

function saveDocumentRequest(state, payload) {

  var data = state.docData_arr;
  const newArr = [...data, payload];
  return {
    ...state,
    docData_arr: newArr
  };

}
//****Agency****//
function searchAgencyRequest(state, payload) {

  return {
    ...state,
    agencyData_arr: payload.data
  };

}

function loadAgencyRequest(state, payload) {

  return {
    ...state,
    agencyId: payload
  };

}

function switchAgencySearchModalRequest(state, payload = false) {

  return {
    ...state,
    agencySearchModalState: payload
  };

}
//****Agency User****//
  // AUserData_arr: [],
  // AUserDetail_arr: [],
  // userLevel_arr: [],
  // product_arr: [],
  // rule_arr: [],
  // state_arr: [],
  // employee_arr: [],
function showAUsersRequest(state, payload) {
  return {
    ...state,
    AUserData_arr: payload.data.AUserData_arr,
    userLevel_arr: payload.data.userLevel_arr,
    state_arr: payload.data.state_arr,
    employee_arr: payload.data.employee_arr,
    productType_arr: payload.data.productType_arr,
    ruleType_arr: payload.data.ruleType_arr,
    authType_arr: payload.data.authType_arr,
  };
}

function showAUserDetailsRequest(state, payload) {
  return {
    ...state,
    agentData: payload.data.agentData,
    AUserDetail_arr: payload.data.AUserDetail_arr,
  };
}

function selectTabRequest(state, payload) {

  return {
    ...state,
    tabId: payload
  };

}

export default Producer



