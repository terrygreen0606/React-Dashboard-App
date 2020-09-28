import Http from '../Http';
import * as action from '../store/actions/territory';

const apiUrl = process.env.REACT_APP_API_URL;

export function getCountry() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post(apiUrl + '/api/v1/country')
                .then((res) => {
                    dispatch(action.getCountry(res.data));
                    return resolve();
                })
        })
    );
}

export function getState(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post(apiUrl + '/api/v1/getState', params)
                .then((res) => {
                    dispatch(action.getState(res.data));
                    return resolve();
                })
        })
    );
}

export function getCounty(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post(apiUrl + '/api/v1/getCounty', params)
                .then((res) => {
                    dispatch(action.getCounty(res.data));
                    return resolve();
                })
        })
    );
}

export function getCity(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post(apiUrl + '/api/v1/getCity', params)
                .then((res) => {
                    dispatch(action.getCity(res.data));
                    return resolve();
                })
        })
    );
}

export function getZipCode(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post(apiUrl + '/api/v1/getZipcode', params)
                .then((res) => {
                    dispatch(action.getZipCode(res.data));
                    return resolve();
                })
        })
    );
}