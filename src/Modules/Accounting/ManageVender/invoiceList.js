import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { FormGroup, Col, Input, Label, Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ActionButttons from "../../CommonComponents/ActionButtons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as AccountService from '../../../services/accounting/VendorService';
import { editRow, incChunkSize } from '../../../store/actions/accounting';
import BackButton from '../../CommonComponents/BackButton';
import { formatDate, getNumberFormat } from '../../CommonComponents/methods';

const AccountTypeList = props => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    useEffect(() => {
        props.invoiceList({ page });
        props.vendorList();
        props.editRow({ id: '' });
        return () => props.incChunkSize(0);
    }, []);
    /************* Handle page change **************/
    const handlePageChange = (pageNumber) => {
        props.invoiceList({
            page:pageNumber , search, sortTo: sort.sortName,
            sortBy: sort.sortOrder
        });
        setPage(pageNumber);
    }
     /*********** delete account ***********/
     const handleDelete = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (<div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    <p>You want to delete this Bill.</p>
                    <button className="badge badge-blue" onClick={onClose}>No</button>
                    <button className="badge badge-red" onClick={() => {
                        props.deleteInvoice(id).then(() => props.invoiceList({ page }));
                        onClose();
                    }}>
                        Yes, Delete it!
                    </button>
                </div>);
            }
        });
    };
    /*********** Action buttons ************/
    const actions = (cell, row) => {
        const url = `/edit-invoice`;
        return <ActionButttons id={row.inv_id} url={url} history={props.history} handleDelete={(ID) => handleDelete(ID)} isSearch={false} editRow={props.editRow} />;
    };
    /**************Search account name or number ***************/
    const handleSearch = () => {
        if (search.trim().length) {
            props.invoiceList({ page: 1, search });
            setPage(1);
            setSort({ sortName: undefined, sortOrder: undefined });
        }
    }
    /************** Reset Search ***************/
    const handleResetSearch = () => {
        props.invoiceList({ page: 1 });
        setPage(1);
        setSearch("")
        setSort({ sortName: undefined, sortOrder: undefined });
    }
    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    }

    /*********** Sorting Function ************/
    const sortMethod = (sortTo, sortBy) => {
        const pageNumber = page ? 1 : undefined;
        setSort({ sortName: sortTo, sortOrder: sortBy })
        props.invoiceList({ page: pageNumber, sortTo, sortBy });
        setPage(pageNumber);
    }
    /******************* Get all list  *************/
    const getAllList = () => {
        props.invoiceList({});
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
        sizePerPage: Number(props.size),
        onSortChange: sortMethod,
        sortName: sort.sortName,
        sortOrder: sort.sortOrder
    };

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <BackButton history={props.history} text={"Enter Bill"} />
                </CardHeader>
                <CardBody>
                    <FormGroup row>
                        <Col md="3"><Input type="text" name="search" id="search" value={search} placeholder="Look for invoice no." onChange={e => setSearch(e.target.value)} /></Col>
                        <Col md="1"> <NavLink to="#" className="btn btn-success" onClick={() => handleSearch()} disabled={isLoading}>Search</NavLink> </Col>
                        <Col md="1"> <NavLink to="#" className="btn btn-primary" onClick={() => handleResetSearch()}>Reset</NavLink> </Col>
                        <Col className="col-md-2 offset-3 pull-right"> <NavLink strict to="/add-invoice" className="btn btn-success"> Enter Bill</NavLink> </Col>

                    </FormGroup>
                    <FormGroup check row>
                        <Col md="12">
                            <Label check>
                                {/* <Input type="checkbox" />{' '}
                                Show inactive accounts */}
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
                            <TableHeaderColumn isKey dataField="inv_no" dataSort >Invoice No.</TableHeaderColumn>
                            <TableHeaderColumn dataField="Inv_Date" dataFormat={(cell, row) => formatDate(row, 'Inv_Date')} dataSort>Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="Inv_Due_Date" dataFormat={(cell, row) => formatDate(row, 'Inv_Due_Date')} dataSort>Due Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="inv_amt" dataAlign='right'  dataFormat={(cell, row) => '$'+getNumberFormat(row.inv_amt)} headerAlign="center" dataSort>Amount</TableHeaderColumn>
                            <TableHeaderColumn dataField="" dataFormat={actions}>Action</TableHeaderColumn>
                        </BootstrapTable>
                    }
                </CardBody>
            </Card>
        </div>
    );
};

AccountTypeList.propTypes = {
    invoiceList: PropTypes.func.isRequired,
    accounting: PropTypes.array.isRequired,
    vendorList: PropTypes.any,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.any.isRequired,
    vendorDelete: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired,
    incChunkSize: PropTypes.func.isRequired,
    deleteInvoice : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    accounting: state.accounting.invoices,
    total_rows: state.accounting.total_rows,
    size: state.accounting.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    invoiceList: bindActionCreators(AccountService.invoiceList, dispatch),
    vendorList: bindActionCreators(AccountService.vendorList, dispatch),
    vendorDelete: bindActionCreators(AccountService.vendorDelete, dispatch),
    editRow: bindActionCreators(editRow, dispatch),
    incChunkSize: bindActionCreators(incChunkSize, dispatch),
    deleteInvoice: bindActionCreators(AccountService.deleteInvoice, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTypeList);
