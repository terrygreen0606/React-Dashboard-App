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
import ActionButttons from "../../CommonComponents/ActionButtons";
import StatusIcon from "../../CommonComponents/StatusIcon";
import AccountService from '../../../services/accounting';
import { editRow } from '../../../store/actions/accounting';

const AccountTypeList = props => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(true);
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    useEffect(() => {
        props.getList({ page });
        props.editRow({ id: '' });
    }, []);
    /************* Handle page change **************/
    const handlePageChange = (pageNumber, sizePerPage) => {
        //this.fetchData(page, sizePerPage);
        props.getList({
            page: pageNumber,
            search,
            status: status ? undefined : "Inactive",
            sortTo: sort.sortName,
            sortBy: sort.sortOrder
        });
        setPage(pageNumber);
    }
    /*********** Action buttons ************/
    const actions = (cell, row) => {
        const url = `/edit-account-type`;
        return <ActionButttons id={row.Account_Type_ID} url={url} history={props.history} handleDelete={(ID) => handleDelete(ID)} editRow={props.editRow} isSearch={false} />;
    };
    /**************Search account name or number ***************/
    const handleSearch = () => {
        if (search.trim().length) {
            props.getList({ page: 1, search, status: status ? undefined : "Inactive" });
            setPage(1);
            setSort({ sortName: undefined, sortOrder: undefined });
        }
    }
    /************** Reset Search ***************/
    const handleResetSearch = () => {
        props.getList({ page: 1 });
        setPage(1);
        setSearch("")
        setSort({ sortName: undefined, sortOrder: undefined });
    }
    /*********** delete account type ***********/
    const handleDelete = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (<div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    <p>You want to delete this account type.</p>
                    <button className="badge badge-blue" onClick={onClose}>No</button>
                    <button className="badge badge-red" onClick={() => {
                        props.accountTypeDelete(id).then(() => props.getList({ page }));
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
        if (accountStatus) {
            props.getList({ page: 1, status: undefined, search });
            setPage(1);
        } else {
            props.getList({ page: 1, status: "Inactive", search });
            setPage(1);
        }
        setSort({ sortName: undefined, sortOrder: undefined });
        setStatus(accountStatus);
    }
    /************* Set status icon *****************/
    const setStatusIcon = (cell, row) => {
        return <StatusIcon status={row.Account_Type_Status === "Active"} />
    }
    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
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
    }
    const { accounting, isLoading } = props;
    const options = {
        sortIndicator: true,
        page,
        onPageChange: handlePageChange,
        hideSizePerPage: true,
        paginationSize: 10,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
        sizePerPage: props.size,
        onSortChange: sortMethod,
        sortName: sort.sortName,
        sortOrder: sort.sortOrder
    };

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <i className="icon-menu"></i>Account Types{' '}
                </CardHeader>
                <CardBody>
                    <FormGroup row>
                        <Col md="3"><Input type="text" name="search" id="search" value={search} placeholder="Look for account type name" onChange={e => setSearch(e.target.value)} /></Col>
                        <Col md="1"> <NavLink to="#" className="btn btn-success" onClick={() => handleSearch()} disabled={isLoading}>Search</NavLink> </Col>
                        <Col md="1"> <NavLink to="#" className="btn btn-primary" onClick={() => handleResetSearch()}>Reset</NavLink> </Col>
                        <Col className="col-md-2 offset-3 pull-right"> <NavLink strict to="/add-account-type" className="btn btn-success"> New Account Type</NavLink> </Col>
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
                            data={accounting}
                            version="4"
                            remote
                            condensed
                            striped hover pagination
                            options={{ ...options, page }}
                            fetchInfo={{ dataTotalSize: props.total_rows }}
                            trStyle={rowClassNameFormat}
                        >
                            <TableHeaderColumn isKey dataField="Account_Type_Name" dataSort >Account Type</TableHeaderColumn>
                            <TableHeaderColumn dataField="Account_Type_Class" dataSort>Class</TableHeaderColumn>
                            <TableHeaderColumn dataField="Account_Type_Status" dataSort dataFormat={setStatusIcon}>Status</TableHeaderColumn>
                            <TableHeaderColumn dataField="" dataFormat={actions}>Action</TableHeaderColumn>
                        </BootstrapTable>
                    }
                </CardBody>
            </Card>
        </div>
    );
};

AccountTypeList.propTypes = {
    getList: PropTypes.func.isRequired,
    accounting: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    accountTypeDelete: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    accounting: state.accounting.accountTypes,
    total_rows: state.accounting.total_rows,
    size: state.accounting.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    getList: bindActionCreators(AccountService.accountTypeList, dispatch),
    accountTypeDelete: bindActionCreators(AccountService.accountTypeDelete, dispatch),
    editRow: bindActionCreators(editRow, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTypeList);
