import * as ActionTypes from '../action-types';

export function editRow(payload) {
  return {
    type: ActionTypes.EDIT_ROW,
    payload,
  };
}

export function getAccountTypes(payload) {
  return {
    type: ActionTypes.GET_ACCOUNT_TYPES,
    payload,
  };
}
export function getAccounts(payload) {
  return {
    type: ActionTypes.GET_ACCOUNTS,
    payload,
  };
}
export function getTaxLine(payload) {
  return {
    type: ActionTypes.GET_TAX_LINE,
    payload,
  };
}
export  function setCreditDebit(payload) {
  return {
    type: ActionTypes.SET_CREDIT_DEBIT,
    payload,
  };
}

export function removeCreditDebit(index) {
  return {
    type: ActionTypes.REMOVE_CREDIT_DEBIT,
    index,
  };
} 

export  function resetCreditDebit() {
  return {
    type: ActionTypes.RESET_CREDIT_DEBIT
  };
}

export function getAccountLedger(payload) {
  return {
    type: ActionTypes.GET_ACCOUNT_LEDGER,
    payload,
  };
}
export function getVendor(payload) {
  return {
    type: ActionTypes.GET_VENDORS,
    payload,
  };
}
export function getTransactions(payload) {
  return {
    type: ActionTypes.GET_TRANSACTIONS,
    payload,
  };
}
export function getInvoice(payload) {
  return {
    type: ActionTypes.GET_INVOICES,
    payload,
  };
}
export function getBankingList(payload) {
  return {
    type: ActionTypes.GET_BANKING_LIST,
    payload,
  };
}
export function getReconcileBank(payload) {
  return {
    type: ActionTypes.GET_RECONCILE_BANK,
    payload,
  };
}


export function getProducts(payload) {
  return {
    type: ActionTypes.GET_PRODUCTS,
    payload
  }
}

export function LoadingProducts(payload) {
  return {
    type: ActionTypes.LOADING_PRODUCTS,
    payload
  }
}

export function LoadingCommissionGenerate(payload) {
  return {
    type: ActionTypes.LOADING_COMMISSION_GENERATE,
    payload
  }
}

export function getCommissionGenerate(payload) {
  return {
    type: ActionTypes.GET_COMMISSION_GENERATE,
    payload
  }
}

export function PostingCommission(payload) {
  return {
    type: ActionTypes.POSTING_COMMISSION,
    payload
  }
}

export function GettingCommssionDetail(payload) {
  return {
    type: ActionTypes.LOADING_COMMISSION_DETAILS,
    payload
  }
}

export function SetCommssionDetail(payload = null) {
  return {
    type: ActionTypes.GET_COMMISSION_DETAILS,
    payload
  }
}
export function incChunkSize(payload) {
  return {
    type: ActionTypes.INC_CHUNK_SIZE,
    payload
  };
}

export function getRenewalNoticeList(payload) {
  return {
    type: ActionTypes.GET_RENEWAL_NOTICE_DATA,
    payload
  };
}

export function printRenewalNotice(payload) {
  return {
    type: ActionTypes.PRINT_RENEWAL_NOTICE,
    payload
  };
}

