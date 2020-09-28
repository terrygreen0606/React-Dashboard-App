import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { FormGroup, Button, Col, Input, Label,Card,CardHeader,CardBody } from 'reactstrap';
import { Control } from 'react-redux-form';
import Select from "react-select"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BackButton from '../../CommonComponents/BackButton';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as Services from '../../../services/accounting/accountService';
import Account from '../../../services/accounting';
import { editRow } from '../../../store/actions/common';
import {getNumberFormat, formatDate, getDateFormat} from "../../CommonComponents/methods";
import ActionButttons from "../../CommonComponents/ActionButtons";

const List = props => {
    const [state, setState] = useState({accountId: {value:"",lable:"Select Account"}, search:"", toDate:null, fromDate:null});
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    const {transactionsDelete, transaction, isLoading} = props;

    useEffect(() => {
        props.editRow({ id: '' });
        props.account({sortTo: 'Account_Name',
        sortBy: 'asc', status: 'Active'}).then(()=> props.getList({ page }));
    }, []);

    /************* Handle page change **************/
    const handlePageChange = (pageNumber) => {       
        props.getList({
            page: pageNumber, ...state, accountId: state.accountId.value || undefined, fromDate: state.fromDate ? getDateFormat(state.fromDate): undefined, toDate: state.toDate ? getDateFormat(state.toDate): undefined, sortTo: sort.sortName,
            sortBy: sort.sortOrder
        });   
        setPage(pageNumber);     
    }

    /**************Search account name or number ***************/
    const handleSearch = () => {
        props.getList({ page: 1,  ...state, accountId: state.accountId.value || undefined, fromDate: state.fromDate ? getDateFormat(state.fromDate): undefined, toDate: state.toDate ? getDateFormat(state.toDate): undefined, });
        setPage(1);
        setSort({ sortName: undefined, sortOrder: undefined });
    }

    /************** Reset Search ***************/
    const handleResetSearch = () => {
        props.getList({ page: 1 });
        setPage(1);
        setState({accountId: {value:"",lable:"Select Account"}, search:"", toDate:null, fromDate:null});
        setSort({ sortName: undefined, sortOrder: undefined });
    }

    /*********** Sorting Function ************/
    const sortMethod = (sortTo, sortBy) => {
        const pageNumber = page ? 1 : undefined;
        setSort({ sortName: sortTo, sortOrder: sortBy })
        props.getList({ page: pageNumber, sortTo, sortBy });
        setPage(pageNumber);
    }
    /******************* Get all list  *************/
    const getAllList = () => {
        props.getList({});
        setPage(undefined);
    };

    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    };

     /*********** delete account ***********/
     const handleDelete = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (<div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    <p>You want to delete this transaction.</p>
                    <button className="badge badge-blue" onClick={onClose}>No</button>
                    <button className="badge badge-red" onClick={() => {
                        transactionsDelete(id).then(() => props.getList({ page }));
                        onClose();
                    }}>
                        Yes, Delete it!
                    </button>
                </div>);
            }
        });
    };

    /*********** Action buttons ************/
    const actions = (row) => {
        const url = `/general-entry`;
        return <ActionButttons id={row.Transaction_Number} url={url} history={props.history} handleDelete={(ID) => handleDelete(ID)} editRow={props.editRow} searchUrl={""} isSearch={false} />;
    };

    const options = {
        sortIndicator: true,
        page,
        onPageChange: handlePageChange,
        hideSizePerPage: true,
        paginationSize: 10,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        alwaysShowAllBtns: true,
        withFirstAndLast: true,
        sizePerPage: props.size,
        onSortChange: sortMethod,
        sortName: sort.sortName,
        sortOrder: sort.sortOrder,
        pageStartIndex: 1
    };

    return (
        <div className="animated">
              <Card>
             <CardHeader>
             <BackButton history={props.history} text={"Search Transaction"} />
               </CardHeader>
                <CardBody>
                <FormGroup row className="col-md-12">   
                 <Col className="col-md-2"> <NavLink strict to="/general-entry" className="btn btn-primary"  >Transaction</NavLink></Col>
                 <Col className="col-md-3"> <NavLink strict to="#" className="btn btn-default" >Search</NavLink></Col> 
                </FormGroup>
                 <hr />
            <FormGroup row className="col-md-12">
             <Col className="col-md-3">
                    <Label htmlFor="text-input">Account:</Label>
                    <Control
                        model=".Account"
                        onChange={(event) => setState({...state, accountId: event})}
                        component={accountProps => <Select 
                            {...accountProps}
                            value={state.accountId}
                            options={props.accountList.map(row => ({ value: row.Account_ID, label: row.Account_Name }))} />}
                           />
                    </Col>
                    <Col className="col-md-2">
                    <Label htmlFor="text-input">Transaction #:</Label>
                    <Input  type="text" name="transaction" id="transaction" value={state.search}  onChange={(event)=>setState({...state, search: event.target.value})}/>
                    </Col>
                 <Col className="col-md-2">
                    <Label htmlFor="text-input">From Date:</Label>
                    <br />
                    <Control
                        model=".From_Date"
                        className="form-control"
                        onChange={(date) => setState({...state, fromDate: date || undefined})}
                        selected={state.fromDate}
                        component={FromDateProps => <DatePicker  {...FromDateProps} isClearable={true}/>}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">To Date:</Label>
                    <br />
                    <Control
                        model=".From_Date"
                        className="form-control"
                        onChange={(date) => setState({...state, toDate: date || undefined})}
                        selected={state.toDate}
                        component={FromDateProps => <DatePicker  {...FromDateProps} isClearable={true}/>}
                    />
                </Col>
                <Col className="col-md-3">
                    <Button type="submit" size="md" color="primary"  onClick={()=> handleSearch()} style={{ marginRight: '20px' }}>  SEARCH </Button>
                    <Button type="reset" size="md" color="primary"  onClick={()=> handleResetSearch()}> RESET </Button>
                </Col> 
            </FormGroup>
            <FormGroup check row>
                        <Col md="12">
                            <Label check></Label>
                            <NavLink strict to="#" className="view-all" onClick={() => getAllList()}> View All </NavLink>
                        </Col>
             </FormGroup>
                    {isLoading && <div className="animated fadeIn pt-1 text-center table-loader" />}
                    <BootstrapTable
                        data={transaction}
                        version="4"
                        remote
                        condensed
                        hover pagination
                        options={{ ...options, page }}
                        fetchInfo={{ dataTotalSize: transaction.length ? props.total_rows : 0 }}
                        trStyle={rowClassNameFormat}
                    >
                        <TableHeaderColumn isKey dataField="Transaction_Date" dataSort dataFormat={(cell, row) => formatDate(row, 'Transaction_Date')}>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="Transaction_Number" dataSort>Trans #</TableHeaderColumn>
                        <TableHeaderColumn dataField="Account_Name" width={'20%'}>Account</TableHeaderColumn>
                        <TableHeaderColumn dataField="Memo">Memo</TableHeaderColumn>
                        <TableHeaderColumn dataField="Debit" dataFormat={(cell, row) => '$'+getNumberFormat(row.Debit)} dataAlign={"right"} headerAlign={"center"}>Debit</TableHeaderColumn>
                        <TableHeaderColumn dataField="Credit" dataFormat={(cell, row) => '$'+getNumberFormat(row.Credit)} dataAlign={"right"} headerAlign={"center"}>Credit</TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataFormat={(cell, row) => actions(row)}>Action</TableHeaderColumn>
                    </BootstrapTable> 
                    </CardBody>
                    </Card>
        </div >
    );
};

List.propTypes = {
    getList: PropTypes.func.isRequired,
    account : PropTypes.func.isRequired,
    transaction: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired,
    accountList: PropTypes.array.isRequired,
    transactionsDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    accountList: state.accounting.accounts,
    transaction: state.accounting.transactions,
    total_rows: state.accounting.total_rows,
    size: state.accounting.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    account: bindActionCreators(Account.accountsList, dispatch),
    getList: bindActionCreators(Services.getTransactions, dispatch),
    editRow: bindActionCreators(editRow, dispatch),
    transactionsDelete: bindActionCreators(Services.transactionsDelete, dispatch) 
});


export default connect(mapStateToProps, mapDispatchToProps)(List);
