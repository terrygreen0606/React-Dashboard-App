import * as ActionTypes from "../action-types";
import Http from "../../Http";

const initialState = {
  isLoading: true,
  pageTemp: 1,
  sizePerPageTemp: 10,
  error: false,

  pageTemp_ProductDataTable: 1,
  sizePerPageTemp_ProductDataTable: 10,
  DataSet_ProductDataTable: [],
  totalCount_DataSet_ProductDataTable: 0,
  loadingLayerProductDataTable: false,
  selected_ProductPK: "" /*[],*/,

  pageTemp_DoctypeDataTable: 1,
  sizePerPageTemp_DoctypeDataTable: 10,
  DataSet_DoctypeDataTable: [],
  totalCount_DataSet_DoctypeDataTable: 0,
  loadingLayerDoctypeDataTable: false,
  selected_DoctypePK: "" /*[],*/,
  loadingLayerDoctypeDD: false,
  reloadDoctypeDD:0,
  DataSet_DoctypeDD: [],
  selected_DoctypePK_SelectBox:'',
  selected_ModulePK_SelectBox:'',

  pageTemp_FormnameDataTable: 1,
  sizePerPageTemp_FormnameDataTable: 10,
  DataSet_FormnameDataTable: [],
  totalCount_DataSet_FormnameDataTable: 0,
  loadingLayerFormnameDataTable: false,
  selected_FormnamePK: [],

  pageTemp_DocumentDataTable: 1,
  sizePerPageTemp_DocumentDataTable: 50,
  DataSet_DocumentDataTable: [],
  totalCount_DataSet_DocumentDataTable: 0,
  loadingLayerDocumentDataTable: false,
  selected_DocumentPK: [],
  forceReloadDocumentDataTable: 0,

  doHideShowAddnewdocDilogStatus: false,
  pageTemp_DocumentAddnewDataTable: 1,
  sizePerPageTemp_DocumentAddnewDataTable: 20,
  DataSet_DocumentAddnewDataTable: [],
  totalCount_DataSet_DocumentAddnewDataTable: 0,
  loadingLayerDocumentAddnewDataTable: false,
  selected_DocumentAddnewPK: [],
  forceReloadDocumentAddnewDataTable: 0,
  loadingLayerDocumentuploaderDataTable:0,
};

const prepareProductDataTableDataSet = (state, payload) => {
  const {
    returnObject: DataSet_ProductDataTable,
    returnCount: totalCount_DataSet_ProductDataTable,
  } = payload;
  const stateObj = Object.assign({}, state, {
    DataSet_ProductDataTable,
    totalCount_DataSet_ProductDataTable,
  });
  return stateObj;
};
const prepareDoctypeDataTableDataSet = (state, payload) => {
  const {
    returnObject: DataSet_DoctypeDataTable,
    returnCount: totalCount_DataSet_DoctypeDataTable,
  } = payload;
  const stateObj = Object.assign({}, state, {
    DataSet_DoctypeDataTable,
    totalCount_DataSet_DoctypeDataTable,
  });
  return stateObj;
};

const prepareFormnameDataTableDataSet = (state, payload) => {
  const {
    returnObject: DataSet_FormnameDataTable,
    returnCount: totalCount_DataSet_FormnameDataTable,
  } = payload;
  const stateObj = Object.assign({}, state, {
    DataSet_FormnameDataTable,
    totalCount_DataSet_FormnameDataTable,
  });
  return stateObj;
};

const prepareDocumentDataTableDataSet = (state, payload) => {
  const {
    returnObject: DataSet_DocumentDataTable,
    returnCount: totalCount_DataSet_DocumentDataTable,
  } = payload;
  const stateObj = Object.assign({}, state, {
    DataSet_DocumentDataTable,
    totalCount_DataSet_DocumentDataTable,
  });
  return stateObj;
};

const prepareDocumentAddnewDataTableDataSet = (state, payload) => {
  const {
    returnObject: DataSet_DocumentAddnewDataTable,
    returnCount: totalCount_DataSet_DocumentAddnewDataTable,
  } = payload;
  const stateObj = Object.assign({}, state, {
    DataSet_DocumentAddnewDataTable,
    totalCount_DataSet_DocumentAddnewDataTable,
  });
  return stateObj;
};

const prepareSelectedProductID_Multi = (state, payload) => {
  const { actionTaken, itemSelected } = payload;
  //console.log(state.selected_ProductPK);
  if (actionTaken === true) {
    //add checked element in array
    state.selected_ProductPK.push(itemSelected);
  } else {
    //Remove Unchecked element from array
    const itemsTemp = state.selected_ProductPK.filter(
      (arrayItem) => arrayItem !== itemSelected
    );
    state.selected_ProductPK = itemsTemp;
  }
  //console.log(state.selected_ProductPK);
  //

  const stateObj = Object.assign({}, state, {});
  return stateObj;
};

const prepareSelectedProductID_Single = (state, payload) => {
  const { actionTaken, itemSelected, requestSource } = payload;

  switch (requestSource) {
    case "ProductList":
      if (actionTaken === true) {
        state.selected_ProductPK = itemSelected;
      } else {
        //Remove Unchecked element from array
        state.selected_ProductPK = "";
      }
      break;
    case "DoctypeList":
      if (actionTaken === true) {
        state.selected_DoctypePK = itemSelected;
      } else {
        //Remove Unchecked element from array
        state.selected_DoctypePK = "";
      }
      break;
  }

  const stateObj = Object.assign({}, state, {});
  return stateObj;
};

const prepareSelectedDoctypeID = (state, payload) => {
  const { actionTaken, itemSelected } = payload;
  if (actionTaken === true) {
    //add checked element in array
    state.selected_DoctypePK.push(itemSelected);
  } else {
    //Remove Unchecked element from array
    const itemsTemp = state.selected_DoctypePK.filter(
      (arrayItem) => arrayItem !== itemSelected
    );
    state.selected_DoctypePK = itemsTemp;
  }

  const stateObj = Object.assign({}, state, {});
  return stateObj;
};

const prepareSelectedFormnameID = (state, payload) => {
  const { actionTaken, itemSelected } = payload;
  if (actionTaken === true) {
    //add checked element in array
    state.selected_FormnamePK.push(itemSelected);
  } else {
    //Remove Unchecked element from array
    const itemsTemp = state.selected_FormnamePK.filter(
      (arrayItem) => arrayItem !== itemSelected
    );
    state.selected_FormnamePK = itemsTemp;
  }
  const stateObj = Object.assign({}, state, {});
  return stateObj;
};

const prepareSelectedDocumentAddnewID_Multi = (state, payload) => {
  const { actionTaken, itemSelected } = payload;
  //console.log(state.selected_ProductPK);
  if (actionTaken === true) {
    //add checked element in array
    state.selected_DocumentAddnewPK.push(itemSelected);
  } else {
    //Remove Unchecked element from array
    const itemsTemp = state.selected_DocumentAddnewPK.filter(
      (arrayItem) => arrayItem !== itemSelected
    );
    state.selected_DocumentAddnewPK = itemsTemp;
  }
  //console.log(state.selected_ProductPK);

  const stateObj = Object.assign({}, state, {});
  return stateObj;
};

const doEmptyDochandlerSelectedItemrowID = (state, payload) => {
  switch (payload) {
    case "documnetAddnewDT":
      state.selected_DocumentAddnewPK.splice(
        0,
        state.selected_DocumentAddnewPK.length
      );
      return Object.assign({}, state, {});

    default:
      return Object.assign({}, state, {});
  }
};

const prepareForForcefullyEvent = (state, payload) => {
  switch (payload) {
    case "documnetDT":
      state.forceReloadDocumentDataTable = Math.random();
      return Object.assign({}, state, {});
    case "documnetAddnewDT":
      state.forceReloadDocumentAddnewDataTable = Math.random();
      return Object.assign({}, state, {});
    case "docUploaderdocumnetListDT":
        state.forceReloadDocumentDataTable = Math.random();
        return Object.assign({}, state, {});      
    default:
      return Object.assign({}, state, {});
  }
};

const documentHandlerProcess = (
  state = initialState,
  { type, payload = null }
) => {
  switch (type) {
    case ActionTypes.LL_TF_DOCHANDLER_PRODUCT_DT:
      return { ...state, loadingLayerProductDataTable: payload };
    case ActionTypes.POPULATE_DOCHANDLER_PRODUCT_DT:
      return prepareProductDataTableDataSet(state, payload);
    case ActionTypes.GET_DOCHANDLER_SELECTED_PRODUCT_ID:
      //return prepareSelectedProductID(state, payload);
      return prepareSelectedProductID_Single(state, payload);

    case ActionTypes.LL_TF_DOCHANDLER_DOCTYPE_DT:
      return { ...state, loadingLayerDoctypeDataTable: payload };
    case ActionTypes.POPULATE_DOCHANDLER_DOCTYPE_DT:
      return prepareDoctypeDataTableDataSet(state, payload);
    case ActionTypes.LL_TF_DOCHANDLER_DOCTYPE_DD:
        return { ...state, loadingLayerDoctypeDD: payload };
    case ActionTypes.POPULATE_DOCHANDLER_DOCTYPE_DD:
        return { ...state, reloadDoctypeDD : Math.random(), DataSet_DoctypeDD: payload };        
    case ActionTypes.GET_DOCHANDLER_SELECTED_DOCTYPE_ID:
      //return prepareSelectedDoctypeID(state, payload);
      return prepareSelectedProductID_Single(state, payload);
    case ActionTypes.GET_DOCHANDLER_SELECTED_DOCTYPE_ID_SELECTBOX:
        return { ...state, selected_DoctypePK_SelectBox: payload };        
    case ActionTypes.GET_DOCHANDLER_SELECTED_MODULE_ID_SELECTBOX:
          return { ...state, selected_ModulePK_SelectBox: payload };        
    case ActionTypes.LL_TF_DOCHANDLER_FORMNAME_DT:
      return { ...state, loadingLayerFormnameDataTable: payload };
    case ActionTypes.POPULATE_DOCHANDLER_FORMNAME_DT:
      return prepareFormnameDataTableDataSet(state, payload);
    case ActionTypes.GET_DOCHANDLER_SELECTED_FORMNAME_ID:
      return prepareSelectedFormnameID(state, payload);

    case ActionTypes.LL_TF_DOCHANDLER_DOCUMENT_DT:
      return { ...state, loadingLayerDocumentDataTable: payload };
    case ActionTypes.POPULATE_DOCHANDLER_DOCUMENT_DT:
      return prepareDocumentDataTableDataSet(state, payload);
    // case ActionTypes.GET_DOCHANDLER_SELECTED_DOCUMENT_ID:
    //   return prepareSelectedDocumentID(state, payload);

    case ActionTypes.TF_DOCHANDLER_ADDNEWDOC_MODEL:
      return { ...state, doHideShowAddnewdocDilogStatus: payload };
    case ActionTypes.LL_TF_DOCHANDLER_DOCUMENTADDNEW_DT:
      return { ...state, loadingLayerDocumentAddnewDataTable: payload };
    case ActionTypes.POPULATE_DOCHANDLER_DOCUMENTADDNEW_DT:
      return prepareDocumentAddnewDataTableDataSet(state, payload);
    case ActionTypes.GET_DOCHANDLER_SELECTED_DOCUMENTADDNEW_ID:
      return prepareSelectedDocumentAddnewID_Multi(state, payload);
    case ActionTypes.DOEMPTY_DOCHANDLER_SELECTED_ITEMROW_ID:
      return doEmptyDochandlerSelectedItemrowID(state, payload);

    case ActionTypes.DO_FORCEFULLY_UPDATE:
      return prepareForForcefullyEvent(state, payload);

    default:
      return state;
  }
};

export default documentHandlerProcess;
