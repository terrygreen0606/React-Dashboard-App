import * as ActionTypes from '../action-types';

const initialState = {
  component: '',
  agencyDropdown: null,
  agentDropdown: null,
  searchPolicy: null,
  subModuleAccessData: [],
}

const getAgencyDropdown = (state, payload) => {
  const stateObj = Object.assign({}, state, {
    agencyDropdown: payload.data,
  });
  return stateObj;
};

const getAgentDropdown = (state, payload) => {
  const stateObj = Object.assign({}, state, {
    agentDropdown: payload,
  });
  return stateObj;
};

const getNewAgentDropdown = (state, payload) => {
  const stateObj = Object.assign({}, state, {
    newAgentDropdown: payload,
  });
  return stateObj;
};

const getAgencyCode = (state, payload) => {
  const stateObj = Object.assign({}, state, {
    agencyCode: payload,
  });
  return stateObj;
};

const getSearchPolicyForTransferBook = (state, payload) => {
   const {ResultSate:searchPolicy} = payload;
   //sessionStorage.setItem('clients', JSON.stringify(clients));
   const stateObj = Object.assign({}, state, {
     //loading : false,
     searchPolicy,
   });
   return stateObj;
};

const getTransfrBookReason = (state, payload) => {
  //const {TRANSFERBOBREASON:reasonDropdown} = payload;
  const stateObj = Object.assign({}, state, {
    //loading : false,
    reasonDropdown: payload.TRANSFERBOBREASON,
  });
  return stateObj;

};

const transferBook = (state, payload) => {
  const stateObj = Object.assign({}, state, {
    transferStatus: payload,
  });
  return stateObj;
};

const checkPermission = (state, payload) => {
  const { subModuleAccess: subModuleAccessData} = payload;
  const stateobj = Object.assign({}, state, {
    subModuleAccessData,
  })
  return stateobj;
}

const checkPermissionClear = state => {
  const stateobj = Object.assign({}, state, {
    subModuleAccessData:[],
  })
  return stateobj;
}


// const getTransfrBookReason = (state, payload) => {
//   console.log(payload);
//   console.log(payload.TRANSFERBOBREASON);
//   const stateObj = Object.assign({}, state, {
//     reasonDropdown: payload.TRANSFERBOBREASON,
//   });
//   return stateObj;
// };

const Common = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ASIDE_COMPONENT:
      return { ...state, component: action.payload };
    case ActionTypes.GET_AGENCY_DROPDOWN:
      return getAgencyDropdown(state, action.payload);
    case ActionTypes.GET_AGENT_DROPDOWN:
    return getAgentDropdown(state, action.payload);
    case ActionTypes.GET_REASON:
    return getTransfrBookReason(state, action.payload);
    case ActionTypes.GET_AGENCY_CODE:
    return getAgencyCode(state, action.payload);
    case ActionTypes.GET_SEARCH_POLICY:
    return getSearchPolicyForTransferBook(state, action.payload);
    case ActionTypes.GET_NEW_AGENT_DROPDOWN:
    return getNewAgentDropdown(state, action.payload);
    case ActionTypes.TRANSFER_BOOK:
    return transferBook(state, action.payload);
    case ActionTypes.CHECK_PERMISSION:
    return checkPermission(state, action.payload);
    case ActionTypes.CHECK_PERMISSION_CLEAR:
    return checkPermissionClear(state);
    default:
      return state;
  }
}

export default Common;
