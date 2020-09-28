import { AUTH_LOGOUT, GET_COUNTRY, GET_STATE, GET_COUNTY, GET_CITY, GET_ZIP_CODE } from '../action-types';

const initialState = {
    countries: [],
    states: [],
    counties: [],
    cities: [],
    zipCodes: []
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_COUNTRY:
            return { ...state, countries: payload.data };
        case GET_STATE:
            return { ...state, states: payload.data };
        case GET_COUNTY:
            return { ...state, counties: payload.data.map(row => ({s_CountyCode: row.n_CountyId_PK, s_CountyName: row.s_CountyName})) };
        case GET_CITY:
            return { ...state, cities: payload.data.map(row => ({s_CityCode: row.n_CityId_PK, s_CityName: row.s_CityName})) };
        case GET_ZIP_CODE:
            return { ...state, zipCodes: payload.data }
        case AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
};