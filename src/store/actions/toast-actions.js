/*
 * @file: toast-actions.js
 * @description: It Contain toasts Action function.
 */

import { toast } from 'react-toastify';

export const toastAction = (status, message, isWarning = false, warningMessage="") => {
    if(isWarning){
        toast.warn(warningMessage, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        });
    }else if(status) {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        });
    } else {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        });
    }
};