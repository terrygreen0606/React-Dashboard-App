import * as ActionTypes from '../action-types';

export const getInvestment = (payload) => {
    return {
        type: ActionTypes.GET_INVESTMENT,
        payload,
    };
}

export const getSecurityData = (payload) => {
    return {
        type: ActionTypes.GET_SECURITY_DATA,
        payload,
    };
}

export const getCetagory = (payload) => {
    return {
        type: ActionTypes.GET_CATEGORY,
        payload,
    }
}


export const getBrokers = (payload) => {
    return {
        type: ActionTypes.GET_BROKERS,
        payload,
    }
}


export const getCoupons = (payload) => {
    return {
        type: ActionTypes.GET_COUPONS,
        payload,
    }
}

export const getPrices = (payload) => {
    return {
        type: ActionTypes.GET_PRICES,
        payload,
    }
}


export const getTransaction = (payload) => {
    return {
        type: ActionTypes.GET_TRANSACTION,
        payload,
    }
}

export const getBrokerageAccount = (payload) => {
    return {
        type: ActionTypes.GET_BROKERAGE_ACCOUNT,
        payload,
    }
}

export const getMonthlyPosting = (payload) => {
    return {
        type: ActionTypes.GET_MONTHLY_POSTING,
        payload,
    }
}

export const getEarnedPosting = (payload) => {
    return {
        type: ActionTypes.GET_EARNED_POSTING,
        payload,
    }
}

export const getHistoricalPosting = (payload) => {
    return {
        type: ActionTypes.GET_HISTORICAL_POSTING,
        payload,
    }
}

export const getTransferSecurity = (payload) => {
    return {
        type: ActionTypes.GET_TRANSFER_SECURITY,
        payload,
    }
}
