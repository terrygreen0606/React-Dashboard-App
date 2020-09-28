import * as ActionTypes from '../action-types';
import Http from '../../Http';

const initialState = {
    isLoading: false,
    baseData: null,
    finalPrem: '',
    uwAppStatus: { "s_AppCodeName": "UWOPEN", "s_AppCodeNameForDisplay": "Open" },
    selectedAgency: '',
    selectedAgent: '',
};

const getQuoteBaseDD = (state, payload) => {
    const stateObj = Object.assign({}, state, {
        baseData: payload,
        isLoading: false
    });
    return stateObj;
};

const QuoteEntry = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case ActionTypes.IS_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.STOP_LOADING:
            return { ...state, isLoading: false };
        case ActionTypes.GET_QUOTE_BASE_DD:
            return getQuoteBaseDD(state, payload);
        default:
            return state;
    }
};


export default QuoteEntry;