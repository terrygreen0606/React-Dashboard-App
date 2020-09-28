import * as ActionTypes from "../action-types";
/**
 * ADMINISTRATION MODULE
 */
export function setLevelDataArrayToProps(payload) { return { type: ActionTypes.GET_FILTERED_LEVEL_DATA, payload }; }
export function loadingTrue() { return { type: ActionTypes.LOADING_TRUE }; }
export function loadingFalse() { return { type: ActionTypes.LOADING_FALSE }; }
export function loadingTrueAddBtn() { return { type: ActionTypes.LOADING_TRUE_ADDBTN }; }
export function loadingFalseAddBtn() { return { type: ActionTypes.LOADING_FALSE_ADDBTN }; }
export function loadingLayerLevelAdd(status) { return { type: ActionTypes.LOADING_TRUEFALSE_LEVELADD, payload: status }; }
export function loadingLayerLevelList(status) { return { type: ActionTypes.LOADING_TRUEFALSE_LEVELLIST, payload: status }; }
export function populateLevelAddEditForm(dataArray) { return { type: ActionTypes.POPULATE_LEVEL_ADDEDITFORM, payload: dataArray }; }
export function resetLevelAddEditForm() { return { type: ActionTypes.RESET_LEVEL_ADDEDITFORM, payload: '' }; }
export function reloadLevelmngLevelList(payload) { return { type: ActionTypes.RELOAD_LEVELMNG_LEVELLIST, payload }; }

/**FOR Module Management */
export function setLevelDataArrayToPropsMngmodule(payload) { return { type: ActionTypes.GET_FILTERED_LEVEL_DATA_MNGMODULE, payload }; }
export function loadingTrueMngmodule() { return { type: ActionTypes.LOADING_TRUE_MNGMODULE }; }
export function loadingFalseMngmodule() { return { type: ActionTypes.LOADING_FALSE_MNGMODULE }; }
export function loadingTrueAddBtnMngmodule() { return { type: ActionTypes.LOADING_TRUE_ADDBTN_MNGMODULE }; }
export function loadingFalseAddBtnMngmodule() { return { type: ActionTypes.LOADING_FALSE_ADDBTN_MNGMODULE }; }
export function loadingTrueAddBtnMngmoduleMngmodule() { return { type: ActionTypes.LOADING_TRUE_ADDBTN_MNGMODULE }; }
export function loadingFalseAddBtnMngmoduleMngmodule() { return { type: ActionTypes.LOADING_FALSE_ADDBTN_MNGMODULE }; }
export function loadingLayerModuleAdd(status) { return { type: ActionTypes.LOADING_TRUEFALSE_MODULEADD, payload: status }; }
export function loadingLayerModuleList(status) { return { type: ActionTypes.LOADING_TRUEFALSE_MODULELIST, payload: status }; }
export function clearSearchDataTable(fieldValue) { return { type: ActionTypes.CLEAR_SEARCHFIELD_DATATABLE, payload: fieldValue }; }
export function populateModuleAddEditForm(dataArray) { return { type: ActionTypes.POPULATE_MODULE_ADDEDITFORM, payload: dataArray }; }
export function resetModuleAddEditForm() { return { type: ActionTypes.RESET_MODULE_ADDEDITFORM, payload: '' }; }
export function reloadModulemngModuleList(payload) { return { type: ActionTypes.RELOAD_MODULEMNG_MODULELIST, payload }; }

/**FOR SUBModule Management */
export function setLevelDataArrayToPropsMngsubmodule(payload) { return { type: ActionTypes.GET_FILTERED_LEVEL_DATA_MNGSUBMODULE, payload }; }
export function loadingTrueMngsubmodule() { return { type: ActionTypes.LOADING_TRUE_MNGSUBMODULE }; }
export function loadingFalseMngsubmodule() { return { type: ActionTypes.LOADING_FALSE_MNGSUBMODULE }; }
export function loadingTrueAddBtnMngsubmodule() { return { type: ActionTypes.LOADING_TRUE_ADDBTN_MNGSUBMODULE }; }
export function loadingFalseAddBtnMngsubmodule() { return { type: ActionTypes.LOADING_FALSE_ADDBTN_MNGSUBMODULE }; }
export function loadingTrueAddBtnMngmoduleMngsubmodule() { return { type: ActionTypes.LOADING_TRUE_ADDBTN_MNGSUBMODULE }; }
export function loadingFalseAddBtnMngmoduleMngsubmodule() { return { type: ActionTypes.LOADING_FALSE_ADDBTN_MNGSUBMODULE }; }

/** Territory Management */
export function setTerritoryDataArrayToPropsMngmodule(payload) { return { type: ActionTypes.GET_FILTERED_TERRITORY_DATA_MNGMODULE, payload }; }
export function setTerritoryIndividualToProps(payload) { return { type: ActionTypes.GET_FILTERED_TERRITORY_INDIVIDUAL_DATA, payload }; }
export function setTerritoryCountriesToProps(payload) { return { type: ActionTypes.GET_FILTERED_TERRITORY_COUNTRY_DATA, payload }; }
export function setTerritoryStatesToProps(payload) { return { type: ActionTypes.GET_FILTERED_TERRITORY_STATE_DATA, payload }; }
export function setTerritoryCountiesToProps(payload) { return { type: ActionTypes.GET_FILTERED_TERRITORY_COUNTY_DATA, payload }; }
export function setTerritoryZipcodesToProps(payload) { return { type: ActionTypes.GET_FILTERED_TERRITORY_ZIPCODE_DATA, payload }; }
export function loadingTrueTerritorymodule() { return { type: ActionTypes.LOADING_TRUE_TERRITORYMODULE }; }
export function loadingFalseTerritorymodule() { return { type: ActionTypes.LOADING_FALSE_TERRITORYMODULE }; }
export function loadingTrueTerritoryMap() { return { type: ActionTypes.LOADING_TRUE_TERRITORY_MAP }; }
export function loadingFalseTerritoryMap() { return { type: ActionTypes.LOADING_FALSE_TERRITORY_MAP }; }
export function loadingTrueTerritoryIndividual() { return { type: ActionTypes.LOADING_TRUE_TERRITORY_INDIVIDUAL }; }
export function loadingFalseTerritoryIndividual() { return { type: ActionTypes.LOADING_FALSE_TERRITORY_INDIVIDUAL }; }
export function loadingTrueAddBtnTerritorymodule() { return { type: ActionTypes.LOADING_TRUE_ADDBTN_TERRITORYMODULE }; }
export function loadingFalseAddBtnTerritorymodule() { return { type: ActionTypes.LOADING_FALSE_ADDBTN_TERRITORYMODULE }; }

/** Rule Management */
export function setRuleDataArrayToProps(payload) { return { type: ActionTypes.GET_FILTERED_RULES_DATA, payload }; }
export function setRuleIndividualToProps(payload) { return { type: ActionTypes.GET_FILTERED_RULE, payload }; }
export function setRuleOptionsToProps(payload) { return { type: ActionTypes.GET_FILTERED_RULE_OPTIONS, payload }; }
export function setRuleProductsToProps(payload) { return { type: ActionTypes.GET_FILTERED_RULE_PRODUCTS, payload }; }
export function loadingTrueRules() { return { type: ActionTypes.LOADING_TRUE_RULES }; }
export function loadingFalseRules() { return { type: ActionTypes.LOADING_FALSE_RULES }; }
export function loadingTrueRule() { return { type: ActionTypes.LOADING_TRUE_RULE }; }
export function loadingFalseRule() { return { type: ActionTypes.LOADING_FALSE_RULE }; }
export function loadingTrueRuleOptions() { return { type: ActionTypes.LOADING_TRUE_RULE_OPTIONS }; }
export function loadingFalseRuleOptions() { return { type: ActionTypes.LOADING_FALSE_RULE_OPTIONS }; }
export function loadingTrueAddBtnRule() { return { type: ActionTypes.LOADING_TRUE_ADDBTN_RULES }; }
export function loadingFalseAddBtnRule() { return { type: ActionTypes.LOADING_FALSE_ADDBTN_RULES }; }

/** Group Management */
export function setGroupDataArrayToProps(payload) { return { type: ActionTypes.GET_FILTERED_GROUPS_DATA, payload }; }
export function setGroupIndividualToProps(payload) { return { type: ActionTypes.GET_FILTERED_GROUP, payload }; }
export function setGroupProductsToProps(payload) { return { type: ActionTypes.GET_FILTERED_GROUP_PRODUCTS, payload }; }
export function setGroupProductRulesToProps(payload) { return { type: ActionTypes.GET_FILTERED_GROUP_PRODUCT_RULES, payload }; }
export function loadingTrueGroups() { return { type: ActionTypes.LOADING_TRUE_GROUPS }; }
export function loadingFalseGroups() { return { type: ActionTypes.LOADING_FALSE_GROUPS }; }
export function loadingTrueGroup() { return { type: ActionTypes.LOADING_TRUE_GROUP }; }
export function loadingFalseGroup() { return { type: ActionTypes.LOADING_FALSE_GROUP }; }
export function loadingTrueGroupOptions() { return { type: ActionTypes.LOADING_TRUE_GROUP_OPTIONS }; }
export function loadingFalseGroupOptions() { return { type: ActionTypes.LOADING_FALSE_GROUP_OPTIONS }; }
export function loadingTrueAddBtnGroup() { return { type: ActionTypes.LOADING_TRUE_ADDBTN_GROUPS }; }
export function loadingFalseAddBtnGroup() { return { type: ActionTypes.LOADING_FALSE_ADDBTN_GROUPS }; }

/** PaymentPlan Management */
export function setPaymentPlansData(payload) { return { type: ActionTypes.GET_PAYMENTPLANS, payload }; }
export function setPaymentPlanSchedulesData(payload) { return { type: ActionTypes.GET_PAYMENTPLAN_SCHEDULES, payload }; }
export function loadingPaymentPlans(status) { return { type: ActionTypes.LOADING_PAYMENTPLANS, status }; }
export function loadingPaymentPlanSchedules(status) { return { type: ActionTypes.LOADING_PAYMENTPLAN_SCHEDULES, status }; }
export function updatingPaymentPlanSchedule(status) { return { type: ActionTypes.UPDATING_PAYMENTPLAN_SCHEDULE, status }; }


export function loadingLayerSubModuleAdd(status) { return { type: ActionTypes.LOADING_TRUEFALSE_SUBMODULEADD, payload: status }; }
export function loadingLayerSubModuleList(status) { return { type: ActionTypes.LOADING_TRUEFALSE_SUBMODULELIST, payload: status }; }
export function loadingLayerSubModuleAddModuleDD(status) { return { type: ActionTypes.LOADING_TRUEFALSE_SUBMODULE_MODULEDD, payload: status }; }
export function loadingLayerSubModuleAddPopulateModuleDD(dataArray) { return { type: ActionTypes.POPULATE_SUBMODULE_MODULEDD, payload: dataArray }; }
export function loadingLayerSubModuleAddDoctypeDD(status) { return { type: ActionTypes.LOADING_TRUEFALSE_SUBMODULE_DOCTYPEDD, payload: status }; }
export function loadingLayerSubModuleAddPopulateDoctypeDD(dataArray) { return { type: ActionTypes.POPULATE_SUBMODULE_DOCTYPEDD, payload: dataArray }; }
export function populateSubModuleAddEditForm(dataArray) { return { type: ActionTypes.POPULATE_SUBMODULE_ADDEDITFORM, payload: dataArray }; }
export function resetSubModuleAddEditForm() { return { type: ActionTypes.RESET_SUBMODULE_ADDEDITFORM, payload: '' }; }
export function reloadSubModulemngSubModuleList(payload) { return { type: ActionTypes.RELOAD_SUBMODULEMNG_SUBMODULELIST, payload }; }

export function loadingLayerAclMngLevelDD(status) { return { type: ActionTypes.LOADING_TRUEFALSE_ACLMNG_LEVELDD, payload: status }; }
export function PopulateAclMngLevelDD(dataArray) { return { type: ActionTypes.POPULATE_ACLMNG_LEVELDD, payload: dataArray }; }
export function populateAclMngLevelDDSelected(dataArray) { return { type: ActionTypes.POPULATE_ACLMNG_LEVELDDSELECTED, payload: dataArray }; }
export function loadingLayerAclMngAppliedList(status) { return { type: ActionTypes.LOADING_TRUEFALSE_ACLMNG_APPLIEDLIST, payload: status }; }
export function populateAclMngAppliedList(payload) { return { type: ActionTypes.POPULATE_ACLMNG_APPLIEDLIST, payload }; }
export function reloadAclMngAppliedList(payload) { return { type: ActionTypes.RELOAD_ACLMNG_APPLIEDLIST, payload }; }
export function loadingLayerAclMngDeniedList(status) { return { type: ActionTypes.LOADING_TRUEFALSE_ACLMNG_DENIEDLIST, payload: status }; }
export function populateAclMngDeniedList(payload) { return { type: ActionTypes.POPULATE_ACLMNG_DENIEDLIST, payload }; }
export function reloadAclMngDeniedList(payload) { return { type: ActionTypes.RELOAD_ACLMNG_DENIEDLIST, payload }; }

export function setAclMngModuleID(payload) { return { type: ActionTypes.SET_ACLMNG_MODULE_ID, payload }; }
export function loadingLayerAclMngSubmoduleList(status) { return { type: ActionTypes.LOADING_TRUEFALSE_ACLMNG_SUBMODULELIST, payload: status }; }
export function populateAclMngSubmoduleList(payload) { return { type: ActionTypes.POPULATE_ACLMNG_SUBMODULELIST, payload }; }

export function LLDocHandlerProductDT(status) { return { type: ActionTypes.LL_TF_DOCHANDLER_PRODUCT_DT, payload: status }; }//Hint:- LoadingLayer = LL, DT = DataTable, TF=TrueFalse
export function populateDocHandlerProductDT(payload) { return { type: ActionTypes.POPULATE_DOCHANDLER_PRODUCT_DT, payload }; }
export function getSelectedProductID_Action(statusArray) { return { type: ActionTypes.GET_DOCHANDLER_SELECTED_PRODUCT_ID, payload: statusArray }; }

export function LLDocHandlerDoctypeDT(status) { return { type: ActionTypes.LL_TF_DOCHANDLER_DOCTYPE_DT, payload: status }; }//Hint:- LoadingLayer = LL, DT = DataTable, TF=TrueFalse
export function populateDocHandlerDoctypeDT(payload) { return { type: ActionTypes.POPULATE_DOCHANDLER_DOCTYPE_DT, payload }; }
export function getSelectedDoctypeID_Action(statusArray) { return { type: ActionTypes.GET_DOCHANDLER_SELECTED_DOCTYPE_ID, payload: statusArray }; }
export function LLDocHandlerDoctypeDD(status) { return { type: ActionTypes.LL_TF_DOCHANDLER_DOCTYPE_DD, payload: status }; }//Hint:- LoadingLayer = LL, DT = DataTable, TF=TrueFalse
export function populateDocHandlerDoctypeDD(payload) { return { type: ActionTypes.POPULATE_DOCHANDLER_DOCTYPE_DD, payload }; }
export function getSelectedDoctypeIDFromSelectBox_Action(status) { return { type: ActionTypes.GET_DOCHANDLER_SELECTED_DOCTYPE_ID_SELECTBOX, payload: status }; }
export function getSelectedModuleIDFromSelectBox_Action(status) { return { type: ActionTypes.GET_DOCHANDLER_SELECTED_MODULE_ID_SELECTBOX, payload: status }; }



export function LLDocHandlerFormnameDT(status) { return { type: ActionTypes.LL_TF_DOCHANDLER_FORMNAME_DT, payload: status }; }//Hint:- LoadingLayer = LL, DT = DataTable, TF=TrueFalse
export function populateDocHandlerFormnameDT(payload) { return { type: ActionTypes.POPULATE_DOCHANDLER_FORMNAME_DT, payload }; }
export function getSelectedFormnameID_Action(statusArray) { return { type: ActionTypes.GET_DOCHANDLER_SELECTED_FORMNAME_ID, payload: statusArray }; }

export function LLDocHandlerDocumentDT(status) { return { type: ActionTypes.LL_TF_DOCHANDLER_DOCUMENT_DT, payload: status }; }//Hint:- LoadingLayer = LL, DT = DataTable, TF=TrueFalse
export function populateDocHandlerDocumentDT(payload) { return { type: ActionTypes.POPULATE_DOCHANDLER_DOCUMENT_DT, payload }; }
export function getSelectedDocumentID_Action(statusArray) { return { type: ActionTypes.GET_DOCHANDLER_SELECTED_DOCUMENT_ID, payload: statusArray }; }


export function doHideShowAddnewdocDilogStatusAction(status) { return { type: ActionTypes.TF_DOCHANDLER_ADDNEWDOC_MODEL, payload: status }; }
export function LLDocHandlerDocumentAddnewDT(status) { return { type: ActionTypes.LL_TF_DOCHANDLER_DOCUMENTADDNEW_DT, payload: status }; }//Hint:- LoadingLayer = LL, DT = DataTable, TF=TrueFalse
export function populateDocHandlerDocumentAddnewDT(payload) { return { type: ActionTypes.POPULATE_DOCHANDLER_DOCUMENTADDNEW_DT, payload }; }
export function getSelectedDocumentAddnewIDAction(statusArray) { return { type: ActionTypes.GET_DOCHANDLER_SELECTED_DOCUMENTADDNEW_ID, payload: statusArray }; }

export function doEmptySelectedItemRowIDAction(statusString) { return { type: ActionTypes.DOEMPTY_DOCHANDLER_SELECTED_ITEMROW_ID, payload: statusString }; }
export function doForcefullyUpdate(statusString) { return { type: ActionTypes.DO_FORCEFULLY_UPDATE, payload: statusString }; }

/** System Dropdown*/
export function getSystemDropdown(payload) {
  return {
    type: ActionTypes.GET_SYSTEM_DROPDOWN,
    payload,
  };
}

export function getSystemDropdownList(payload) {
  return {
    type: ActionTypes.GET_SYSTEM_DROPDOWN_LIST,
    payload,
  };
}

export function systemDropdownSave(payload) {
  return {
    type: ActionTypes.SYSTEM_DROPDOWN_SAVE,
    payload,
  };
}

export function updateDropdownOption(payload) {
  return {
    type: ActionTypes.UPDATE_DROPDOWN_OPTION,
    payload,
  };
}

/**Gmap Polygon */
export function fetchGmapRules(payload) {
  return {
    type: ActionTypes.FETCH_GMAPRULE,
    payload,
  };
};

export function saveGmapZone(payload) {
  return {
    type: ActionTypes.SAVE_GMAPZONE,
    payload,
  };
};

export function getMapZoneData(payload) {
  return {
    type: ActionTypes.FETCH_MAPZONEDATA,
    payload,
  };
};

export function fetchGroups(payload) {
  return {
    type: ActionTypes.FETCH_GROUPS,
    payload,
  };
};

export function saveGroup(payload) {
  return {
    type: ActionTypes.SAVE_GROUP,
    payload,
  };
};

export function fetchGroupsListing(payload) {
  return {
    type: ActionTypes.FETCH_GROUPS_LISTING,
    payload,
  };
};

export function getClaimEventData(payload) {
  //console.log(payload);
  return {
    type: ActionTypes.GET_CLAIM_EVENT_DATA,
    payload,
  };
}

export function eventClaimSave(payload) {
  return {
    type: ActionTypes.GET_CLAIM_EVENT_SAVE,
    payload,
  };
}

export function fetchPolicyValidationRuleListing(payload) {
  return {
    type: ActionTypes.FETCH_VALIDATION_RULES_LISTING,
    payload,
  };
};

export function fetchPolicyValidationFormOptions(payload) {
  return {
    type: ActionTypes.FETCH_VALIDATION_FORM_OPTIONS,
    payload,
  };
};

export function fetchPolicyRuleForOptions(payload) {
  return {
    type: ActionTypes.FETCH_POLICY_RULE_FOR_OPTIONS,
    payload,
  };
};

export function fetchPolicyRuleForData(payload) {
  return {
    type: ActionTypes.FETCH_POLICY_RULE_FOR_DATA,
    payload,
  };
};

export function savePolicyRuleValidation(payload) {
  return {
    type: ActionTypes.SAVE_POLICY_VALIDATION_RULE,
    payload,
  };
};

export function fetchInnerPolicyRule(payload) {
  return {
    type: ActionTypes.FETCH_INNER_POLICY_RULE,
    payload,
  };
};

export function fetchPolicyValidationGetProductDD(payload) {
  return {
    type: ActionTypes.FETCH_VALIDATION_GET_PRODUCT_DD,
    payload,
  };
};

export function fetchPolicyValidationRuleLoad(payload) {
  return {
    type: ActionTypes.FETCH_VALIDATION_RULE_LOAD,
    payload,
  };
};

export function fetchPolicyValidationRuleLoadCombo(payload) {
  return {
    type: ActionTypes.FETCH_VALIDATION_RULE_LOAD_COMBO,
    payload,
  };
};

export function savePolicyRuleGroup(payload) {
  return {
    type: ActionTypes.SAVE_POLICY_RULE_GROUP,
    payload,
  };
};

export function fetchPolicyValidationRuleGroupListing(payload) {
  return {
    type: ActionTypes.FETCH_VALIDATION_RULE_GROUP_LISTING,
    payload,
  };
};


