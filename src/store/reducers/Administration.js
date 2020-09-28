import * as ActionTypes from '../action-types';
import Http from '../../Http';
//import { getClaimEventData } from '../actions/administrationAction';

const initialState = {
    navFlag: 'default',
    systemDropdown: null,
    systemDropdownList: null,
    systemDropdownSave: null,
    updateDropdownOption: null,
    fetchGmapRules: null,
    saveGmapZone: null,
    getMapZoneData: null,
    fetchGroups: null,
    saveGroup: null,
    fetchGroupsListing: null,
    claimEventData: null,
    claimEventDropdown: null,
    claimEventSave: null,
    fetchPolicyValidationRuleListing: null,
    fetchPolicyValidationFormOptions: null,
    fetchPolicyRuleForOptions: null,
    fetchPolicyRuleForData: null,
    savePolicyRuleValidation: null,
    fetchInnerPolicyRule: null,
    fetchPolicyValidationGetProductDD: null,
    fetchPolicyValidationRuleLoad: null,
    fetchPolicyValidationRuleLoadCombo: null,
    savePolicyRuleGroup: null,
    fetchPolicyValidationRuleGroupListing: null,
};

const loadLeftNavigation = (state, payload) => {

    const stateObj = Object.assign({}, state, {
        navFlag: 'admin'
    });
    return stateObj;

};

const getSystemDropdown = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        systemDropdown: payload.data,
    });
    return stateObj;
};

const getSystemDropdownList = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        systemDropdownList: payload.data,
    });
    return stateObj;
};

const systemDropdownSave = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        systemDropdownSave: payload,
    });
    return stateObj;
};

const updateDropdownOption = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        updateDropdownOption: payload,
    });
    return stateObj;
};

const fetchGmapRules = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        fetchGmapRules: payload,
    });
    return stateObj;
};

const saveGmapZone = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        saveGmapZone: payload,
    });
    return stateObj;
};

const getMapZoneData = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        getMapZoneData: payload,
    });
    return stateObj;
};

const fetchGroups = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        fetchGroups: payload,
    });
    return stateObj;
};

const saveGroup = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        saveGroup: payload,
    });
    return stateObj;
};

const fetchGroupsListing = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        fetchGroupsListing: payload,
    });
    return stateObj;
};

const getClaimEventData = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        claimEventData: payload.claimdata,
        claimEventDropdown: payload.dropdown.CLAIMEVENTTYPE,
    });
    return stateObj;
};

const eventClaimSave = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        claimEventSave: payload,
    });
    return stateObj;
};

const fetchPolicyValidationRuleListing = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        fetchPolicyValidationRuleListing: payload,
    });
    return stateObj;
};

const fetchPolicyValidationFormOptions = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        fetchPolicyValidationFormOptions: payload,
    });
    return stateObj;
};

const fetchPolicyRuleForOptions = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        fetchPolicyRuleForOptions: payload,
    });
    return stateObj;
};

const fetchPolicyRuleForData = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        fetchPolicyRuleForData: payload,
    });
    return stateObj;
};

const savePolicyRuleValidation = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        savePolicyRuleValidation: payload,
    });
    return stateObj;
};

const fetchInnerPolicyRule = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        fetchInnerPolicyRule: payload,
    });
    return stateObj;
};

const fetchPolicyValidationGetProductDD = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        fetchPolicyValidationGetProductDD: payload,
    });
    return stateObj;
};

const fetchPolicyValidationRuleLoad = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        fetchPolicyValidationRuleLoad: payload,
    });
    return stateObj;
};

const fetchPolicyValidationRuleLoadCombo = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        fetchPolicyValidationRuleLoadCombo: payload,
    });
    return stateObj;
};

const savePolicyRuleGroup = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        savePolicyRuleGroup: payload,
    });
    return stateObj;
};

const fetchPolicyValidationRuleGroupListing = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        fetchPolicyValidationRuleGroupListing: payload,
    });
    return stateObj;
};

const Administration = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case ActionTypes.LEFTNAV_FLAG:
            return loadLeftNavigation(state, payload);
        case ActionTypes.GET_SYSTEM_DROPDOWN:
            return getSystemDropdown(state, payload);
        case ActionTypes.GET_SYSTEM_DROPDOWN_LIST:
            return getSystemDropdownList(state, payload);
        case ActionTypes.SYSTEM_DROPDOWN_SAVE:
            return systemDropdownSave(state, payload);
        case ActionTypes.SYSTEM_DROPDOWN_SAVE:
            return updateDropdownOption(state, payload);
        case ActionTypes.FETCH_GMAPRULE:
            return fetchGmapRules(state, payload);
        case ActionTypes.SAVE_GMAPZONE:
            return saveGmapZone(state, payload);
        case ActionTypes.FETCH_MAPZONEDATA:
            return getMapZoneData(state, payload);
        case ActionTypes.FETCH_GROUPS:
            return fetchGroups(state, payload);
        case ActionTypes.SAVE_GROUP:
            return saveGroup(state, payload);
        case ActionTypes.FETCH_GROUPS_LISTING:
            return fetchGroupsListing(state, payload);
        case ActionTypes.GET_CLAIM_EVENT_DATA:
            return getClaimEventData(state, payload);
        case ActionTypes.GET_CLAIM_EVENT_SAVE:
            return eventClaimSave(state, payload);
        case ActionTypes.FETCH_VALIDATION_RULES_LISTING:
            return fetchPolicyValidationRuleListing(state, payload);
        case ActionTypes.FETCH_VALIDATION_FORM_OPTIONS:
            return fetchPolicyValidationFormOptions(state, payload);
        case ActionTypes.FETCH_POLICY_RULE_FOR_OPTIONS:
            return fetchPolicyRuleForOptions(state, payload);
        case ActionTypes.FETCH_POLICY_RULE_FOR_DATA:
            return fetchPolicyRuleForData(state, payload);
        case ActionTypes.SAVE_POLICY_VALIDATION_RULE:
            return savePolicyRuleValidation(state, payload);
        case ActionTypes.FETCH_INNER_POLICY_RULE:
            return fetchInnerPolicyRule(state, payload);
        case ActionTypes.FETCH_VALIDATION_GET_PRODUCT_DD:
            return fetchPolicyValidationGetProductDD(state, payload);
        case ActionTypes.FETCH_VALIDATION_RULE_LOAD:
            return fetchPolicyValidationRuleLoad(state, payload);
        case ActionTypes.FETCH_VALIDATION_RULE_LOAD_COMBO:
            return fetchPolicyValidationRuleLoadCombo(state, payload);
        case ActionTypes.SAVE_POLICY_RULE_GROUP:
            return savePolicyRuleGroup(state, payload);
        case ActionTypes.FETCH_VALIDATION_RULE_GROUP_LISTING:
            return fetchPolicyValidationRuleGroupListing(state, payload);
        default:
            return state;
    }
};



export default Administration;

