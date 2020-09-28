import * as Action from '../action-types';
const initialState = {
    total_rows: 0,
    size: 10,
    edit_row_id: '',
    list: [],
    viewSecurity: [],
    securityData: {},
    categories: [],
    subcategories: [],
    brokers: [],
    coupons: [],
    prices: [],
    pricesData: [],
    transactionData: [],
    brokerageData:[],
    monthlyPosting:[],
    earnedPosting:[],
    historicalPosting:[],
    transferSecurity:[]
};
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case Action.GET_INVESTMENT:
            return { ...state, ...payload };
        case Action.GET_SECURITY_DATA:
                return { ...state, securityData: payload };
        case Action.EDIT_ROW:
            return { ...state, edit_row_id: payload.id };
        case Action.AUTH_LOGOUT:
            return initialState;
        case Action.GET_CATEGORY:
            return { ...state, ...payload };
         case Action.GET_BROKERS:
            return { ...state, ...payload };
         case Action.GET_COUPONS:
            return { ...state, ...payload };
         case Action.GET_PRICES:
            return { ...state, ...payload };
         case Action.GET_TRANSACTION:
            return { ...state, ...payload }; 
         case Action.GET_BROKERAGE_ACCOUNT:
            return { ...state, ...payload };
         case Action.GET_MONTHLY_POSTING:
            return { ...state, ...payload };
         case Action.GET_HISTORICAL_POSTING:
            return { ...state, ...payload };
         case Action.GET_EARNED_POSTING:
            return { ...state, ...payload };
         case Action.GET_TRANSFER_SECURITY:
            return { ...state, ...payload };
        default:
            return state;
    }

};