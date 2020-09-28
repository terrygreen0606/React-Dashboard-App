import * as ActionTypes from '../action-types';
import Http from '../../Http';

const initialState = {
  batchMasterData: [],
  totalCount: 0,
  compDD: [],
  paTransType: [],
  batchDetailsTransData: [],
  paTransSubType: [],
  payeeTypeDD: [],
  searchAccountData: []
};

const setBatchData = (state, payload) => {
  const { returnObject: batchMasterData, returnCount: totalCount } = payload;
  const stateObj = Object.assign({}, state, {
    batchMasterData,
    totalCount,
  });
  return stateObj;
};

const editBatchDetailsData = (state, payload) => {
  const { compDD: compDD, transSubType: paTransSubType, paTransType: paTransType, payeeTypeDD: payeeTypeDD} = payload; // batchDetailsTransData
  if(payload.batchDetailsData.length != 0){
    const {returnObject: batchDetailsTransData} = payload.batchDetailsData;

    const stateObj = Object.assign({}, state, {
      compDD,
      paTransType,
      paTransSubType,
      payeeTypeDD,
      batchDetailsTransData
    });
    return stateObj;
  }
  const stateObj = Object.assign({}, state, {
    compDD,
    paTransType,
    payeeTypeDD,
  });
  return stateObj;
};

const getTransSubType = (state, payload) => {
  const { getTransSubType: paTransSubType } = payload;
  const stateObj = Object.assign({}, state, {
    paTransSubType,
  });
  return stateObj;
};

const searchAccount = (state, payload) => {
  const { returnObject: searchAccountData, returnCount: totalCount } = payload;
  const stateObj = Object.assign({}, state, {
    searchAccountData,
    totalCount,
  });
  return stateObj;
}

const BatchProcess = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.GET_FILTERED_BATCH_MASTERS:
      return setBatchData(state, payload);
    case ActionTypes.EDIT_BATCH_DETAILS:
      return editBatchDetailsData(state, payload);
    case ActionTypes.GET_TRANS_SUB_TYPE:
      return getTransSubType(state, payload);
    case ActionTypes.SEARCH_ACCOUNT:
      return searchAccount(state, payload);
    default:
      return state;
  }
};

export default BatchProcess;