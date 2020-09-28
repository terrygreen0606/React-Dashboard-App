import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { FormGroup, Col, Label, Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as AccountService from '../../../services/accounting/VendorService';
import { editRow } from '../../../store/actions/accounting';
import BackButton from '../../CommonComponents/BackButton';
import ActionButttons from "../../CommonComponents/ActionButtons";
import { formatDate, getNumberFormat } from '../../CommonComponents/methods';

const AccountTypeList = props => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    useEffect(() => {
        props.vendorTransactions({ page, vender_id: props.vender_id });
        props.editRow({ id: '' });
    }, []);
    /************* Handle page change **************/
    const handlePageChange = (pageNumber) => {
        props.vendorTransactions({
            page: pageNumber,
            vender_id: props.vender_id,
            sortTo: sort.sortName,
            sortBy: sort.sortOrder
        });
        setPage(pageNumber);
    };
    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    }

 /*********** Action buttons ************/
 const actions = (cell, row) => {
    const url = `/edit-vendor`;
    return <ActionButttons id={row.vender_id} url={url} history={props.history}  searchUrl={""} editRow={props.editRow} isSearch={false}/>;
    };
    /*********** Sorting Function ************/
    const sortMethod = (sortTo, sortBy) => {
        const pageNumber = page ? 1 : undefined;
        setSort({ sortName: sortTo, sortOrder: sortBy })
        props.vendorTransactions({ page: pageNumber, vender_id: props.vender_id, sortTo, sortBy });
        setPage(pageNumber);
    }
    /******************* Get all list  *************/
    const getAllList = () => {
        props.vendorTransactions({});
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
                    <BackButton history={props.history} text={"Vendor Transaction"} />
                </CardHeader>
                <CardBody>
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
                            <TableHeaderColumn isKey dataField="inv_no" dataSort >Invoice No</TableHeaderColumn>
                            <TableHeaderColumn dataField="Inv_Date" dataFormat={(cell, row) => formatDate(row, 'Inv_Date')}>Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="Inv_Due_Date" dataFormat={(cell, row) => formatDate(row, 'Inv_Due_Date')}>Due Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="inv_amt" dataFormat={(cell, row) =>row.inv_amt ? '$'+getNumberFormat(parseInt(row.inv_amt)) :"$0.00"} dataSort dataAlign={"right"} headerAlign={"center"}>Amount</TableHeaderColumn>
                            <TableHeaderColumn dataField="inv_memo" dataSort >Memo</TableHeaderColumn>
                            <TableHeaderColumn dataField="flag" dataSort dataFormat={(cell, row) => row.flag ? "Pending" : "Paid"}>Status</TableHeaderColumn>
                            <TableHeaderColumn dataField="" dataFormat={actions}>Action</TableHeaderColumn>
                        </BootstrapTable>
                    }
                </CardBody>
            </Card>
        </div>
    );
};

AccountTypeList.propTypes = {
    vendorTransactions: PropTypes.func.isRequired,
    accounting: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired,
    vender_id: PropTypes.number
};

const mapStateToProps = state => ({
    accounting: state.accounting.transactions,
    total_rows: state.accounting.total_rows,
    size: state.accounting.size,
    isLoading: state.loader.isLoading,
    vender_id: state.accounting.edit_row_id
});

const mapDispatchToProps = dispatch => ({
    vendorTransactions: bindActionCreators(AccountService.vendorTransactions, dispatch),
    editRow: bindActionCreators(editRow, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTypeList);
