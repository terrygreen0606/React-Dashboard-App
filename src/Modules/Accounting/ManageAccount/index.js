import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { FormGroup, Col, Input, Label, Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import StatusIcon from "../../CommonComponents/StatusIcon";
import ActionButttons from "../../CommonComponents/ActionButtons";
import AccountService from '../../../services/accounting';
import { editRow } from '../../../store/actions/accounting';
import {getNumberFormat} from "../../CommonComponents/methods";

const AccountsList = props => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(true);
    const [sort, setSort] = useState({ sortName: 'Account_Name', sortOrder: 'asc' })
    useEffect(() => {
        props.accountTypeList();
        props.getList({ page, sortTo: sort.sortName,
            sortBy: sort.sortOrder, status: status ? "Active" : "Inactive" });
        props.editRow({ id: '' });
    }, []);
    /************* Handle page change **************/
    const handlePageChange = (pageNumber) => {
        props.getList({
            page: pageNumber, search, status: status ? "Active" : "Inactive", sortTo: sort.sortName,
            sortBy: sort.sortOrder
        });
        setPage(pageNumber);
    }
    /*********** Action buttons ************/
    const actions = (cell, row) => {
        const url = `/edit-account`;
        const searchUrl = `/manage-account-ledger`;
        return <ActionButttons
            id={row.Account_ID}
            url={url}
            history={props.history}
            handleDelete={(ID) => handleDelete(ID)}
            searchUrl={searchUrl}
            editRow={props.editRow}
        />;
    };
    /*********** get account type name ************/
    const getAccountTypeName = (cell, row) => { 
        const types = props.accountTypes.find(type => type.Account_Type_ID && type.Account_Type_ID.toString() === row.Account_Type_ID.toString()) || {};
        return types["Account_Type_Name"] || "";
    }
    /************* Set status icon *****************/
    const setStatusIcon = (cell, row) => {
        return <StatusIcon status={row.Account_Status === "Active"} />
    }
    /**************Search account name or number ***************/
    const handleSearch = () => {
        if (search.trim().length) {
            props.getList({ page: 1, search, status: status ? "Active" : "Inactive" });
            setPage(1);
            setSort({ sortName: undefined, sortOrder: undefined });
        }
    }
    /************** Reset Search ***************/
    const handleResetSearch = () => {
        props.getList({ page: 1, sortTo: 'Account_Name',
            sortBy: 'asc',status: status ? "Active" : "Inactive" });
        setPage(1);
        setStatus(true)
        setSearch("")
        setSort({ sortName: 'Account_Name', sortOrder: 'asc' });
    }
    /*********** delete account ***********/
    const handleDelete = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (<div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    <p>You want to delete this account type.</p>
                    <button className="badge badge-blue" onClick={onClose}>No</button>
                    <button className="badge badge-red" onClick={() => {
                        props.accountDelete(id).then(() => props.getList({ page , status: status ? "Active" : "Inactive" }));
                        onClose();
                    }}>
                        Yes, Delete it!
                    </button>
                </div>);
            }
        });
    };
    /************* Handle active/inactive status *************/
    const handleChangeStatus = () => {
        const accountStatus = !status;
        console.log(accountStatus);
        if (accountStatus) {
            props.getList({ page: 1, sortTo: 'Account_Name',
                sortBy: 'asc', search, status: 'Active' });
            setSort({ sortName: 'Account_Name', sortOrder: 'asc' });
            setPage(1);
        } else {
            props.getList({ page: 1,sortTo: 'Account_Name',
            sortBy: 'desc', search, status: 'Inactive' });
            setSort({ sortName: 'Account_Name', sortOrder: 'desc' });
            setPage(1);
        }
        setStatus(accountStatus);        
    }
    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    }
    /*********** Sorting Function ************/
    const sortMethod = (sortTo, sortBy) => {
        const pageNumber = page ? 1 : undefined;
        setSort({ sortName: sortTo, sortOrder: sortBy })
        props.getList({ page: pageNumber, sortTo, sortBy , status: status ? "Active" : "Inactive" });
        setPage(pageNumber);
    }
    /******************* Get all list  *************/
    const getAllList = () => {
        props.getList({status: status ? "Active" : "Inactive",view:'all'});
        setPage(undefined);
    }
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
        sortOrder: sort.sortOrder
    }
    const { accounts, isLoading } = props;
    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <i className="icon-menu"></i>Accounts List{' '}
                </CardHeader>
                <CardBody>
                    <FormGroup row>
                        <Col md="3"><Input type="text" name="search" id="search" value={search} placeholder="Look for account name or number" onChange={e => setSearch(e.target.value)}  onKeyUp={(e)=>{if(e.keyCode === 13){handleSearch()}}}/></Col>
                        <Col md="1"> <NavLink to="#" className="btn btn-success" onClick={() => handleSearch()} disabled={isLoading}>Search</NavLink> </Col>
                        <Col md="1"> <NavLink to="#" className="btn btn-primary" onClick={() => handleResetSearch()}>Reset</NavLink> </Col>
                        <Col className="col-md-2 offset-3 pull-right"> <NavLink strict to="/add-account" className="btn btn-success"> New Account </NavLink> </Col>
                        <Col className="col-md-2"> <NavLink strict to="/general-entry" className="btn btn-success"> General Entry </NavLink> </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col md="12">
                            <Label check>
                                <Input type="checkbox" onChange={() => handleChangeStatus()} />{' '}
                                Show inactive accounts
                        </Label>
                            <NavLink strict to="#" className="view-all" onClick={() => getAllList()}> View All </NavLink>
                        </Col>
                    </FormGroup>
                    {isLoading ? <div className="animated fadeIn pt-1 text-center">Loading...</div> :
                        <BootstrapTable
                            data={accounts}
                            version="4"
                            remote
                            striped hover pagination
                            options={{ ...options, page }}
                            fetchInfo={{ dataTotalSize: props.total_rows }}
                            trStyle={rowClassNameFormat}
                        >
                            <TableHeaderColumn isKey dataField="Account_Name" dataSort  width={'30%'}>Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="Account_No">Number</TableHeaderColumn>
                            <TableHeaderColumn dataField="Account_Type_ID" dataFormat={getAccountTypeName} dataSort>Type</TableHeaderColumn>
                            <TableHeaderColumn dataField="Account_Status" dataSort dataFormat={setStatusIcon}>Status</TableHeaderColumn>
                            <TableHeaderColumn dataField="Balance" dataAlign='right'  dataFormat={(cell, row) => '$'+getNumberFormat(row.Balance)} headerAlign="center">Balance</TableHeaderColumn>
                            <TableHeaderColumn dataField=""  dataFormat={actions}>Action</TableHeaderColumn>
                        </BootstrapTable>
                    }
                </CardBody>
            </Card>
        </div>
    );
};

AccountsList.propTypes = {
    getList: PropTypes.func.isRequired,
    accountTypeList: PropTypes.func.isRequired,
    accounts: PropTypes.array.isRequired,
    accountTypes: PropTypes.array.isRequired,
    accountDelete: PropTypes.func.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    accounts: state.accounting.accounts,
    accountTypes: state.accounting.accountTypes,
    total_rows: state.accounting.total_rows,
    size: state.accounting.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    getList: bindActionCreators(AccountService.accountsList, dispatch),
    accountTypeList: bindActionCreators(AccountService.accountTypeList, dispatch),
    accountDelete: bindActionCreators(AccountService.accountDelete, dispatch),
    editRow: bindActionCreators(editRow, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsList);
