import { AUTH_LOGOUT, INC_CHUNK_SIZE, ADD_EDIT_CLAIM, 
        GET_MASTER_VALUES_CLAIM_DD, GET_SUB_STATUS_DD,
        GET_REVIEW_SUB_STATUS_DD, SET_CLAIM_DETAIL_FOR_EDIT,
        GET_ADJUSTER_DATA_FOR_MAP, LOADING_SUB_STATUS,
        LOADING_REVIEW_SUB_STATUS,LOADING_CLAIM_MANAGER } from '../action-types';

const initialState = {
	policyNo:"",
    claimId:0,
    claimTypes: [],
    typeOfLoss: [],
    serviceRep: [],
    events: [],
    primaryAttorney: [],
    coAttorney: [],
    inhouseCounsel: [],
    claimManager: [],
    claimStatus: [],
    claimSubStatus: [],
    claimReviewStatus: [],
    claimReviewSubStatus: [],
    claimReportedByRelation: [],
    claimHomeAddressDirection: [],
    claimHomeAddressType: [],
    claimFieldAdjuster: [],
    policyDetails: [],
    claimDetailsForEdit: [],
    adjusterDataForMap: [],
    mapCenterLat: 0,
    mapCenterLng: 0,
    loadingSubStatus: false,
    loadingReviewSubStatus: false,
    selectingClaimManager: false
};

export default (state = initialState, { type, payload }) => {

    switch (type) {
        case ADD_EDIT_CLAIM:
        case GET_MASTER_VALUES_CLAIM_DD:
        case GET_SUB_STATUS_DD:
        case GET_REVIEW_SUB_STATUS_DD:        
        case GET_ADJUSTER_DATA_FOR_MAP:
        case LOADING_SUB_STATUS:
        case LOADING_REVIEW_SUB_STATUS:
        case LOADING_CLAIM_MANAGER:
            return { ...state, ...payload};
        case SET_CLAIM_DETAIL_FOR_EDIT:
            var claimDetailsForEdit = state.claimDetailsForEdit;
            claimDetailsForEdit[`claim_${payload.claimId}`] = payload.claimDetailsForEdit;
            return { ...state, ...{claimDetailsForEdit, claimId: payload.claimId}};
        default:
        	return state;
    }
};