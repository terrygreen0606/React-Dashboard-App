import Http from '../Http';
import * as action from '../store/actions';
import { toastAction } from '../store/actions/toast-actions';

const apiUrl = process.env.REACT_APP_API_URL;
const logedInUser = JSON.parse(sessionStorage.getItem('user'));

export function claimInvoiceUpload(files){
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.post(apiUrl+'/api/v1/claimInvoiceUpload', files)
            .then((res)=>{
              return resolve(res.data);
            })
      })
    );
}