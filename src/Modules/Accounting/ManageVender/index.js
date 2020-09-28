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
import * as AccountService from '../../../services/accounting/VendorService';
import { editRow, incChunkSize } from '../../../store/actions/accounting';
import { getNumberFormat } from "../../CommonComponents/methods";

const AccountTypeList = props => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    useEffect(() => {
        props.vendorList({ page });
        props.editRow({ id: '' });
        return () => props.incChunkSize(0);
    }, []);
    /************* Handle page change **************/
    const handlePageChange = (pageNumber) => {
        props.vendorList({
            page: pageNumber,
            search, sortTo: sort.sortName,
            sortBy: sort.sortOrder
        });
        setPage(pageNumber);
    }
    /*********** Action buttons ************/
    const actions = (cell, row) => {
        const url = `/edit-vendor`;
        const searchUrl = `/transactions`;
        return <ActionButttons id={row.vend_id} url={url} history={props.history} handleDelete={(ID) => handleDelete(ID)} searchUrl={searchUrl} editRow={props.editRow} />;
    };
    /**************Search account name or number ***************/
    const handleSearch = () => {
        if (search.trim().length) {
            props.vendorList({ page: 1, search });
            setPage(1);
            setSort({ sortName: undefined, sortOrder: undefined });
        }
    }
    /************** Reset Search ***************/
    const handleResetSearch = () => {
        props.vendorList({ page: 1 });
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
                    <p>You want to delete this vendor.</p>
                    <button className="badge badge-blue" onClick={onClose}>No</button>
                    <button className="badge badge-red" onClick={() => {
                        props.vendorDelete(id).then(() => props.vendorList({ page }));
                        onClose();
                    }}>
                        Yes, Delete it!
                    </button>
                </div>);
            }
        });
    };

     /************* Set status icon *****************/
     const setStatusIcon = (cell, row) => {
        return <StatusIcon status={ row.vend_1099} />
     }
    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    }
    /*********** Sorting Function ************/
    const sortMethod = (sortTo, sortBy) => {
        const pageNumber = page ? 1 : undefined;
        setSort({ sortName: sortTo, sortOrder: sortBy })
        props.vendorList({ page: pageNumber, sortTo, sortBy });
        setPage(pageNumber);
    }
    /******************* Get all list  *************/
    const getAllList = (type) => {
        if(type === 'all'){
         props.vendorList({});
         setPage(undefined);
        }else{
            props.vendorList({ status: type, page });
        }
    }
    const getAddress = (cell, row) => {
        return `${row.vend_address}, ${row.vend_city || '-'}, ${row.vend_state || ''}-${row.vend_zip || '-'}, ${row.vend_Country || '-'}`;
        //return row.vend_address;
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
                    <i className="icon-menu"></i>Vendors{' '}
                </CardHeader>
                <CardBody>
                    <FormGroup row>
                        <Col md="2"><Input type="text" name="search" id="search" value={search} placeholder="Look for vendor name" onChange={e => setSearch(e.target.value)} /></Col>
                        <Col md="1"> <NavLink to="#" className="btn btn-success" onClick={() => handleSearch()} disabled={isLoading}>Search</NavLink> </Col>
                        <Col md="1"> <NavLink to="#" className="btn btn-primary" onClick={() => handleResetSearch()}>Reset</NavLink> </Col>
                        <Col className="col-md-2"> <NavLink strict to="/add-vendor" className="btn btn-success"> Add Vendor</NavLink></Col>
                        <Col className="col-md-2"><NavLink strict to="/invoice" className="btn btn-success"> Enter Bill</NavLink></Col>
                        <Col className="col-md-2"><NavLink strict to="/pay-bill" className="btn btn-success"> Pay Bill</NavLink></Col>
                        <Col className="col-md-2"><NavLink strict to="/credit" className="btn btn-success"> Enter Credit</NavLink></Col>
                    </FormGroup>
                    <FormGroup row>
                         <Col md="10"></Col>
                             <Col md="2">
                                 <Input  type="select" name="vender_type" id="select" onChange={(e)=>getAllList(e.target.value)}>
                                 <option value="Active" key="Active">Active</option>   
                                 <option value="Inactive" key="Inactive">In-Active</option>
                                 <option value="all" key="all">View All</option>
                                 </Input>
                             </Col>
                    </FormGroup>
                    {isLoading ? <div className="animated fadeIn pt-1 text-center">Loading...</div> :
                        <>
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
                            <TableHeaderColumn isKey dataField="vend_name" dataSort >Full Name </TableHeaderColumn>
                            <TableHeaderColumn dataField="vend_tax_id" dataSort >Tax-ID </TableHeaderColumn>
                            <TableHeaderColumn dataField="vend_address"  dataFormat={getAddress} dataSort width="30%">Address</TableHeaderColumn>
                            <TableHeaderColumn dataField="vend_1099"  dataFormat={setStatusIcon} dataSort width="12%">Eligible for 1099</TableHeaderColumn>
                            <TableHeaderColumn dataField="balance"  dataFormat={(cell, row) =>row.balance ? '$'+getNumberFormat(row.balance):"$0.00"} dataSort headerAlign={"center"} dataAlign={"right"}>Balance</TableHeaderColumn>
                            <TableHeaderColumn dataField="" dataFormat={actions}>Action</TableHeaderColumn>
                        </BootstrapTable>
                        </>
                    }
                </CardBody>
            </Card>
        </div>
    );
};

AccountTypeList.propTypes = {
    vendorList: PropTypes.func.isRequired,
    accounting: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.any.isRequired,
    vendorDelete: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired,
    incChunkSize: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    accounting: state.accounting.vendors,
    total_rows: state.accounting.total_rows,
    size: state.accounting.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    vendorList: bindActionCreators(AccountService.vendorList, dispatch),
    vendorDelete: bindActionCreators(AccountService.vendorDelete, dispatch),
    incChunkSize: bindActionCreators(incChunkSize, dispatch),
    editRow: bindActionCreators(editRow, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTypeList);
