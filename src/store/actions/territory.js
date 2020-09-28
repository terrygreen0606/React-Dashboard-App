import * as ActionTypes from '../action-types';

export function getCountry(payload) {
    return {
        type: ActionTypes.GET_COUNTRY,
        payload,
    };
}

export function getState(payload) {
    return {
        type: ActionTypes.GET_STATE,
        payload,
    };
}

export function getCounty(payload) {
    return {
        type: ActionTypes.GET_COUNTY,
        payload,
    };
}

export function getCity(payload) {
    return {
        type: ActionTypes.GET_CITY,
        payload,
    };
}

export function getZipCode(payload) {
    return {
        type: ActionTypes.GET_ZIP_CODE,
        payload,
    };
}