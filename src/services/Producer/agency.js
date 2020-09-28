import querystring from 'querystring';
import Http from '../../Http';
import { loader } from '../../store/actions';
import * as action from '../../store/actions/accounting';
import { toastAction } from '../../store/actions/toast-actions';
/*********** Add Agency ************/
const apiUrl = process.env.REACT_APP_API_URL;
export function accountType(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loader(true));
            Http.post(`${apiUrl}/api/v1/agency`, payload)
                .then((res) => {
                    dispatch(loader(false));
                    toastAction(true, res.data.message);
                    return resolve(true);
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loader(false));
                    toastAction(false, errors);
                    return reject(false);
                });
        })
    );
}
