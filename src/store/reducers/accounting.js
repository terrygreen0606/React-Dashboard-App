import { AUTH_LOGOUT, INC_CHUNK_SIZE, EDIT_ROW, GET_ACCOUNT_TYPES, GET_TAX_LINE, GET_BANKING_LIST, GET_ACCOUNTS, GET_ACCOUNT_LEDGER, GET_VENDORS, GET_INVOICES, GET_RECONCILE_BANK, GET_TRANSACTIONS, SEARCH_ID,GET_RENEWAL_NOTICE_DATA,PRINT_RENEWAL_NOTICE, SET_CREDIT_DEBIT, RESET_CREDIT_DEBIT } from '../action-types';

const initialState = {
    total_rows: 0,
    size: 10,
    edit_row_id: '',
    searchId: '',
    chunk_size: 0,
    accountTypes: [],
    accounts: [],
    taxLine:[],
    credit:[],
    debit:[],
    accountLedger: [],
    vendors: [],
    invoices: [],
    bankingList: [],
    expenseBank: [],
    reconcileBank: {
        payment: [],
        deposit: [],
        Common: {}
    },
    noticeList:[],
    printNotice:'',
    transactions: []
};
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ACCOUNT_TYPES:
            return { ...state, accountTypes: payload.list, total_rows: payload.total_rows, size: payload.size };
        case GET_ACCOUNTS:
            return { ...state, accounts: payload.list, total_rows: payload.total_rows, size: payload.size };
        case GET_TAX_LINE:
            return { ...state, taxLine: payload.list};
        case SET_CREDIT_DEBIT:
            if(state[payload.key].length > 0 && state[payload.key][payload.index]){
                state[payload.key][payload.index]=payload.value;
                return { ...state, [payload.key]: [...state[payload.key]]};  
                }else{
                state[payload.key][payload.index]=payload.value;
                return { ...state, [payload.key]: state[payload.key]};
                }   
        case RESET_CREDIT_DEBIT:
            return { ...state, credit: [], debit: []};            
        case GET_ACCOUNT_LEDGER:
            return { ...state, accountLedger: payload.list, total_rows: payload.total_rows, size: payload.size };
        case GET_VENDORS:
            return { ...state, vendors: payload.list, total_rows: payload.total_rows, size: payload.size };
        case GET_INVOICES:
            return { ...state, invoices: payload.list, total_rows: payload.total_rows, size: payload.size };
        case GET_BANKING_LIST:
            return { ...state, ...payload };
        case EDIT_ROW:
            return { ...state, edit_row_id: payload.id };
        case GET_RECONCILE_BANK:
            return { ...state, reconcileBank: { ...payload } };
        case GET_TRANSACTIONS:
            return { ...state, transactions: payload.list, total_rows: payload.total_rows, size: payload.size };
        case INC_CHUNK_SIZE:
            return { ...state, chunk_size: payload };
        case SEARCH_ID:
            return { ...state, searchId: payload };
        case AUTH_LOGOUT:
            return initialState;
        case GET_RENEWAL_NOTICE_DATA:
            return { ...state, noticeList: payload };
        case PRINT_RENEWAL_NOTICE:
            return { ...state, printNotice: payload };
        default:
            return state;
    }
};

