import { loader } from '../store/actions';
import * as action from '../store/actions/claim';
import { toastAction } from '../store/actions/toast-actions';

import { useState, useEffect } from 'react';

import Http from '../Http';
const apiUrl = process.env.REACT_APP_API_URL.toString();

export const useHttp = (url, dependencies=[], data=null, method='GET') => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
	if (dependencies.length>0 && !dependencies[0]) {
	  setIsLoading(false); return;
	}
	setIsLoading(true);
	const options = {
		method: method, // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json' 
		},
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // no-referrer, *client
	}
	
	const token = sessionStorage.getItem('access_token');
	if (token) {
		options.headers['Authorization'] = `Bearer ${token}`;
	}
	if (data) {
		options.body = JSON.stringify(data);
	}
	fetch(url, options)
	  .then(response => {
		if (response.status===401) {
		  //Unauthorized
		  sessionStorage.setItem('access_token','');
		  window.location.href = '/login';
		}
		if (!response.ok) {
		  throw new Error('Failed to fetch.');
		}
		return response.json();
	  })
	  .then(data => {
		setIsLoading(false);
		setFetchedData(data);
	  })
	  .catch(err => {
		setIsLoading(false);
	  });
  }, dependencies);

  return [isLoading, fetchedData];
};

export const claimStatusCodeOptions = {
  'Open': 'Open',
  'Close': 'Close',
  'Re-Open': 'Re-Open',
};

export const claimSubStatusCodeOptions = {
  'MIKEBAKER': 'mikebaker',
  'AOECONTRACT': 'AOECONTRACT',
  'ONECALL': 'One Call Construction Services',
  'PROOF': 'Waiting for Proof of Loss',
  'ENGINEERASSIGNMENT': 'Assigned to Engineer',
  'PRECISION': 'ASSIGN TO PRECISION CONTRACTING',
  'GOLD_KEY': 'GOLD KEY ROOFING',
  'INHOUSECOUNSEL': 'Assigned to Inhouse Counsel',
  'TROPICAL': 'Assigned to Tropical Property Restoration',
  'LEAKDOCTOR': 'Leak Doctor',
  'SLEUTH': 'Assigned to Sleuth',
  'LOSSAFFIDAVIT': 'Lightning Loss Affidavit -LLA/POL',
  'SCOPE_OF_LOSS': 'Scope of Loss',
  'CLAIMSUBPEEUOCC': 'Pending EUO Corporate Counsel',
  'CHESTERKEY': 'Chesterkey Development',
  'BBRCONTRACT': 'BBR Contracting',
  'WISDOM': 'Wisdom Structural',
  'KINCADE': 'Kincade Construction',
  'SOUTHERNSAFE': 'Southern Safe Construction',
  'DRYMASTER': 'DRY MASTER',
  'LITIGATION': 'Litigation',
  'RTRSENT': 'Right to Repair Sent',
  'RTRONGOING': 'Right to Repair Ongoing',
  'RORSENT': 'Reservations of Right Sent',
  'REPAIRS_IN_PROCESS': 'Repairs in process',
  'CLMOPSI' : 'test'
};

export const claimReviewStatusCodeOptions = {
  'READY_TO_CLOSE': 'Ready to close',
  'ASSICONTRACTFORESTIMAT': 'Assigned Contractor for Estimate',
  'PENDING_ESTIMAT': 'Pending Estimate'
};

export const claimReviewSubStatusCodeOptions = {
  'CLAIMROOFER': 'Roofer',
  'CLAIMSCREEN': 'Screen',
  'CLAIMINTERDEMG': 'Interior damage',
  'CLAIMFENCE': 'Fence'
};

export const typeOfLossOptions = {
  '1': 'Property',
  '2': 'Liability',
}

export const claimReportedByOptions = {
  '1': 'Insured',
  '2': 'Co-Insured',
  '3': 'Public Adjuster',
  '4': 'Others',
  '5': 'Agent',
  'ATTORNEY': 'Attorney',
};

export const claimEventNameOptions = {
  'COLIN': 'COLIN TROPICAL STORM',
  'Wilma': 'HURRICANE WILMA',
  'TD9': 'TROPICAL DEPRESSION 9',
  'HERMINE': 'HERMINE',
  'MATTHEW': 'HURRICANE MATTHEW',
  'EMILY': 'TROPICAL STORM EMILY',
  'IRMA': 'IRMA',
  'NATE': 'NATE',
  'PHILLIPE': 'PHILLIPE',
  'GORDON': 'GORDON',
  'MICHAEL': 'MICHAEL',
  'TORNADO 11022018': 'TORNADO 11022018',
  '20181220': '2018-12-20 TORNADO EVENT',
  'HAIL STORM 03272019': 'HAIL STORM 03272019',
  'HAILSTORM 05042019': 'HAILSTORM 05042019',
  'DORIAN': 'DORIAN',
  'TS NESTOR': 'TROPICAL STORM NESTOR',
};

export function getPolicyAndClaimDetailForIntake(params = {}) {	
	const url = `${apiUrl}/api/v1/policy_details_add_claim`;
  	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.get(url, {params})
			.then((res) => {
				dispatch(loader(false));
				dispatch(action.addEditClaim({
					policyDetails: res.data.data,
					policyNo: params.policy_no,
					//claimId: params.claimId
				}));	
				return resolve(true);
			})
			.catch((err) => {
				const { status, message, errors } = err.response['data'] || {};
				dispatch(loader(false));
				toastAction(false, errors || message);
				return reject({ status, errors });
			});
		})
  	)
};

export function masterValuesDropDown(params = {}) {
	const url = `${apiUrl}/api/v1/claim_form_masters`;
	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.get(url, {params})
				.then((res) => {
					dispatch(action.getMasterValues({ 
					  claimTypes: res.data.data.claim_type_master,
					  typeOfLoss: res.data.data.type_of_loss_master,
					  serviceRep: res.data.data.service_rep_master,
					  events:  res.data.data.events_master,
					  primaryAttorney: res.data.data.primary_attorney_master,
					  coAttorney: res.data.data.co_attorney_master,
					  inhouseCounsel: res.data.data.inhouse_counsel_master,
					  claimManager: res.data.data.claim_manager_master,
					  claimStatus: res.data.data.claim_status_master,
					  claimReviewStatus: res.data.data.claim_review_status_master,
					  claimReportedByRelation: res.data.data.claim_reported_by_relation_master,
					  claimHomeAddressDirection: res.data.data.claim_home_address_direction_master,
					  claimHomeAddressType: res.data.data.claim_home_address_type_master,
					  claimFieldAdjuster: res.data.data.claim_field_adjuster_master,
					  claimCoinsuredMaster: res.data.data.claim_coinsured_master
					}));
					dispatch(loader(false));
					return resolve;
				})
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(loader(false));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	);
}

export function getReviewSubStatus(params = {}) {
	const url = `${apiUrl}/api/v1/claim_review_sub_status`;
	return dispatch => (
		new Promise((resolve, reject) => {			
			dispatch(action.setReviewSubStatusLoading({ loadingReviewSubStatus: true }));
			Http.get(url, {params})
				.then((res) => {
					dispatch(action.getReviewSubStatusValues({ 
						claimReviewSubStatus: res.data.data
					}));

					dispatch(action.setReviewSubStatusLoading({ loadingReviewSubStatus: false }));
					return resolve;
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(action.setReviewSubStatusLoading({ loadingReviewSubStatus: false }));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	  );
  }

export function getSubStatus(params = {}) {
	const url = `${apiUrl}/api/v1/claim_sub_status`;
	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(action.setSubStatusLoading({ loadingSubStatus: true }));
			Http.get(url, {params})
				.then((res) => {
					dispatch(action.getSubStatusValues({ 
						claimSubStatus: res.data.data
					}));

					dispatch(action.setSubStatusLoading({ loadingSubStatus: false }));
					return resolve;
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(action.setSubStatusLoading({ loadingSubStatus: false }));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	  );
  }

export function saveClaimDetails(payload) {
	const url = `${apiUrl}/api/v1/claims`;
	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.post(url, payload)
			.then((res) => {
				let status, message = "";
				dispatch(loader(false));
				if(res.data.warningFlag) {
					toastAction(status, message, res.data.warningFlag, res.data.warningMessage);
				}
				message = res.data.message;
				if (res.data.status == false) {
					status = false;
				} else {
					status = true;
				}
				toastAction(status, message);
				return resolve(true);
			})
			.catch((err) => {
				const { message, errors } = err.response['data'] || {};
		        dispatch(loader(false));
		        toastAction(false, errors || message);
		        return reject(false);
			});
		})
	);
}

export function getZipDetails(params = {}) {
	const url = `${apiUrl}/api/v1/getZipDetails`;
	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.get(url, {params})
				.then((res) => {					
					dispatch(loader(false));
					return resolve(res.data);
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(loader(false));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	  );
}

export function getClaimDetails(params = {}) {
	const url = `${apiUrl}/api/v1/claims/${params.claimId}`;
	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.get(url)
				.then((res) => {
					dispatch(action.setClaimDetailForEdit({ 
						claimDetailsForEdit: res.data.data,
						claimId: params.claimId
					}));
					dispatch(loader(false));
					return resolve;
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(loader(false));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	  );

}

export function updateClaimDetails(payload) {
	const url = `${apiUrl}/api/v1/claims/${payload.ClaimId_PK}`;

	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.put(url, payload)
			.then((res) => {
				let status, message = "";
				dispatch(loader(false));
				if(res.data.warningFlag) {
					toastAction(status, message, res.data.warningFlag, res.data.warningMessage);
				}
				message = res.data.message;
				if (res.data.status == false) {
					status = false;
				} else {
					status = true;
				}
				toastAction(status, message);
				return resolve(true);
			})
			.catch((err) => {
				const { message, errors } = err.response['data'] || {};
		        dispatch(loader(false));
		        toastAction(false, errors || message);
		        return reject(false);
			});
		})
	);
}

export function getDataForAdjusterMap(params = {}){
	const url = `${apiUrl}/api/v1/adjusterDataForMap`;
	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.get(url, {params})
				.then((res) => {					
					dispatch(action.getDataForAdjusterMap({ 
						adjusterDataForMap: res.data.data.assocPerLocatationData,
						mapCenterLat:  res.data.data.lat,
						mapCenterLng: res.data.data.lng
					}));

					dispatch(loader(false));
					return resolve;
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(loader(false));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	  );
}

export function getClaimMangers(params = {}){
	const url = `${apiUrl}/api/v1/claimManagerFromAdjuster`;
	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(action.setClaimManagerLoading({ selectingClaimManager: true }));
			Http.get(url, {params})
				.then((res) => {					
					dispatch(action.setClaimManagerLoading({ selectingClaimManager: false }));
					return resolve(res.data);
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(action.setClaimManagerLoading({ selectingClaimManager: false }));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	);
}

export function checkAdjusterClaim(params = {}){
	const url = `${apiUrl}/api/v1/checkAdjusterClaim`;

	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.get(url, {params})
				.then((res) => {					
					dispatch(loader(false));
					return resolve(res.data);
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(loader(false));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	);
}

export function claimInspectionOperation(params = {}, operationType){
	let url = "";
	if(operationType == "NEW")	 {	url = `${apiUrl}/api/v1/createInspBatch`;	}
	if(operationType == "UPDATE"){	url = `${apiUrl}/api/v1/updateInspBatchDetails`;	}
	if(operationType == "REOPEN"){	url = `${apiUrl}/api/v1/reopenClaimInspection`;	}

	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.get(url, {params})
				.then((res) => {					
					dispatch(loader(false));
					return resolve(res.data);
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(loader(false));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	);
}

export function checkInHouseVendorStatus(params = {}){
	const url = `${apiUrl}/api/v1/checkInHouseVendorStatus`;

	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.get(url, {params})
				.then((res) => {					
					dispatch(loader(false));
					return resolve(res.data);
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(loader(false));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	);
}

export function getClaimEventData(params = {}){
	let url = `${apiUrl}/api/v1/getClaimEventMaster`;

	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.get(url, {params})
				.then((res) => {					
					dispatch(loader(false));
					return resolve(res.data);
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(loader(false));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	);
}

export function getMasterData(params = {}){
	let url = `${apiUrl}/api/v1/getAppcodeMaster`;

	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.get(url, {params})
				.then((res) => {					
					dispatch(loader(false));
					return resolve(res.data);
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(loader(false));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	);
}

export function getClaimData(params = {}){
	let url = `${apiUrl}/api/v1/claims/${params.id}`;

	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.get(url, {params})
				.then((res) => {					
					dispatch(loader(false));
					return resolve(res.data);
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(loader(false));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	);
}

function returnResult(url, params){
	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.get(url, {params})
				.then((res) => {					
					dispatch(loader(false));
					return resolve(res.data);
				  })
				.catch((err) => {
					const { status, message, errors } = err.response['data'] || {};
					dispatch(loader(false));
					toastAction(false, errors || message);
					return reject({ status, errors });
				});
		})
	);
}

export function getClaimReservePaymentDetails(params = {}){
	let url = `${apiUrl}/api/v1/loadClaimReservePaymentDetails`;

	return returnResult(url, params);	
}

export function showReservePaymentDetails(params = {}){
	let url = `${apiUrl}/api/v1/showReservePaymentDetails`;

	return returnResult(url, params);
}

export function viewSubLedgerEntry(params = {}){
	let url = `${apiUrl}/api/v1/viewSubLedgerEntry`;

	return returnResult(url, params);
}

export function checkRunningBalance(params = {}){
	let url = `${apiUrl}/api/v1/checkRunningBalance`;

	return returnResult(url, params);
}

export function getCvgLimitList(params = {}){
	let url = `${apiUrl}/api/v1/getCvgLimitList`;

	return returnResult(url, params);
}

export function getCvgLimitListPayment(params = {}){
	let url = `${apiUrl}/api/v1/getCvgLimitListPayment`;

	return returnResult(url, params);
}

export function viewReserveDetails(params = {}){
	let url = `${apiUrl}/api/v1/viewReserveDetails`;

	return returnResult(url, params);
}

export function getPayee(params = {}){
	let url = `${apiUrl}/api/v1/getClients/payee`;

	return returnResult(url, params);
}

export function unpostedTransactionAmount(params = {}){
	let url = `${apiUrl}/api/v1/unpostedTransactionAmount`;

	return returnResult(url, params);
}

export function unpostedTransaction(params = {}){
	let url = `${apiUrl}/api/v1/unpostedTransaction`;

	return returnResult(url, params);
}

export function voidPayment(params = {}){
	let url = `${apiUrl}/api/v1/voidPayment`;

	// return returnResult(url, params);
	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.post(url, params)
			.then((res) => {
				let status, message = "";
				dispatch(loader(false));
				message = res.data.message;
				if (res.data.status == 'N') {
					status = false;
				} else if (res.data.status == 'Y') {
					status = true;
				}
				toastAction(status, message);
				return resolve(true);
			})
			.catch((err) => {
				const { message, errors } = err.response['data'] || {};
		        dispatch(loader(false));
		        toastAction(false, errors || message);
		        return reject(false);
			});
		})
	);
}

export function addClaimReservePayment(payload) {
	const url = `${apiUrl}api/v1/addReservePaymentDetail`;
	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(loader(true));
			Http.post(url, payload)
			.then((res) => {
				let status, message = "";
				dispatch(loader(false));
				if(res.data.warningFlag) {
					toastAction(status, message, res.data.warningFlag, res.data.warningMessage);
				}
				message = res.data.message;
				if (res.data.status == 'N') {
					status = false;
				} else if (res.data.status == 'Y') {
					status = true;
				}
				toastAction(status, message);
				return resolve(true);
			})
			.catch((err) => {
				const { message, errors } = err.response['data'] || {};
		        dispatch(loader(false));
		        toastAction(false, errors || message);
		        return reject(false);
			});
		})
	);
}