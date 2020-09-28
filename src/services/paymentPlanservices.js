import Http from '../Http';
import * as action from '../store/actions';
import {loader} from '../store/actions';
import {
    loadingPaymentPlans,
    loadingPaymentPlanSchedules,
    setPaymentPlansData,
    setPaymentPlanSchedulesData,
    updatingPaymentPlanSchedule
} from '../store/actions/administrationAction';
import {toastAction} from '../store/actions/toast-actions';


const apiUrl = process.env.REACT_APP_API_URL;
/*********** Load PaymentPlan DataTable ************/
export function loadPaymentPlans() {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingPaymentPlans(true));            
            Http.get(`${apiUrl}/api/v1/paymentPlans`)
                .then((res) => {
                    dispatch(setPaymentPlansData(res.data.data));
                    dispatch(loadingPaymentPlans(false));                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingPaymentPlans(false));            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*********** Load PaymentPlan Schedule Data ************/
export function loadPaymentPlanSchedules(index) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(loadingPaymentPlanSchedules(true));            
            Http.get(`${apiUrl}/api/v1/getPaymentPlanSchedule/${index}`)
                .then((res) => {
                    dispatch(setPaymentPlanSchedulesData(res.data.data));
                    dispatch(loadingPaymentPlanSchedules(false));                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(loadingPaymentPlanSchedules(false));            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}

/*********** Update PaymentPlan Schedule Data ************/
export function updatePaymentPlanSchedule(index, data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            dispatch(updatingPaymentPlanSchedule(true));            
            Http.post(`${apiUrl}/api/v1/updatePaymentPlan/${index}`, data)
                .then((res) => {
                    dispatch(updatingPaymentPlanSchedule(false));                    
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    dispatch(updatingPaymentPlanSchedule(false));            
                    toastAction(false, errors);                                      
                    return reject(false);
                });
        })
    );
}
