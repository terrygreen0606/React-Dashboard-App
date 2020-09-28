import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { FormGroup, Button, Col, Input, Label } from 'reactstrap';
import { Control } from 'react-redux-form';
import Select from "react-select"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as Services from '../../../../services/investment';
import { editRow } from '../../../../store/actions/common';
//import ActionButttons from "../../../CommonComponents/ActionButtons";

const List = props => {
    const [state, setState] = useState({ taxExempt: "", Issue_Date: null , Coupon_Date:null, Maturity_Date:null, Call_Date:null, Put_Date:null, Start_Date:null});
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    const {brokerageData, list, transaction, isLoading} = props;
    useEffect(() => {
        props.getList({ page });
        props.editRow({ id: '' });
    }, []);

    /************* Handle page change **************/
    const handlePageChange = (pageNumber) => {
        props.getList({
            page:pageNumber, search, sortTo: sort.sortName,
            sortBy: sort.sortOrder
        });
        setPage(page);
    }

    // /**************Search account name or number ***************/
    // const handleSearch = () => {
    //     if (search.trim().length) {
    //         props.getList({ page: 1, search });
    //         setPage(1);
    //         setSort({ sortName: undefined, sortOrder: undefined });
    //     }
    // }

    // /************** Reset Search ***************/
    // const handleResetSearch = () => {
    //     props.getList({ page: 1 });
    //     setPage(1);
    //     setSearch("")
    //     setSort({ sortName: undefined, sortOrder: undefined });
    // }

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

    // /*********** Action buttons ************/
    // const actions = (cell, row) => {
    //     // const url = `/edit-security`;
    //     // const searchUrl = `/view-security`
    //     // return <ActionButttons id={row.Bond_ID} type={row.Security_type} url={url} history={props.history} handleDelete={false} editRow={props.editRow} searchUrl={searchUrl} isSearch={true} />;
    // };
       /************ Handle date change **********/
       const handleDateChange = (date,key) => {
        setState({ ...state, [key]: date });
  };

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
        sortOrder: sort.sortOrder,
        pageStartIndex: 1
    };

    return (
        <div className="animated">
            <FormGroup row className="col-md-12">
            <Col className="col-md-2">
                <span>Look for transaction: </span>
            </Col>
            </FormGroup>
            <FormGroup row className="col-md-12">
             <Col className="col-md-2">
                    <Label htmlFor="text-input">Brokerage Account:</Label>
                    <Control
                        model=".Brokerage_Account"
                        component={brokerageProps => <Select
                        {...brokerageProps}
                        options={brokerageData.map(row => ({ value: row.Account_ID, label: row.Account_Name }))} />}
                       />
                    </Col>
                    <Col className="col-md-2">
                    <Label htmlFor="text-input">Action:</Label>
                    <Control
                        model=".Action"
                        component={props => <Input {...props} type="select" name="Action" id="Action">
                            <option value="" key="empty">Select Action</option>
                            <option value="CMPND" key="1">CMPND / "Z" Interest</option>
                            <option value="INTEREST" key="2">INTEREST</option>
                            <option value="Amortization" key="2">IO Amortization</option>
                            <option value="PAYDOWN" key="2">PAYDOWN</option>
                        </Input>}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Cusip/Symbol:</Label>
                    <Control
                        model=".Cusip_Symbol"
                        //onChange={(e) => dispatch(getCategoryData({id: e.value}))}
                        component={cusipProps => <Select
                            {...cusipProps}
                             options={list.map(row => ({ value: row.Bond_ID, label: row.Cusip }))}
                            />}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">From Date:</Label>
                    <br />
                    <Control
                        model=".From_Date"
                        className="form-control"
                        onChange={(date) => handleDateChange(date, 'From_Date')}
                        selected={state.From_Date}
                        component={FromDateProps => <DatePicker  {...FromDateProps} />}
                    />
                </Col>
                <Col className="col-md-3">
                    <Button type="submit" size="md" color="primary"  style={{ marginRight: '20px' }}>  SEARCH </Button>
                    <Button type="reset" size="md" color="primary"  > RESET </Button>
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
                        fetchInfo={{ dataTotalSize: props.total_rows }}
                        trStyle={rowClassNameFormat}
                    >
                        <TableHeaderColumn isKey dataField="Cusip" dataSort>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="Description" dataSort>Cusip</TableHeaderColumn>
                        <TableHeaderColumn dataField="Quantity">Descripon</TableHeaderColumn>
                        <TableHeaderColumn dataField="" >Action</TableHeaderColumn>
                    </BootstrapTable>
        </div >
    );
};

List.propTypes = {
    getList: PropTypes.func.isRequired,
    transaction: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    transaction: state.investment.transactionData,
    total_rows: state.investment.total_rows,
    size: state.investment.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    getList: bindActionCreators(Services.getTransaction, dispatch),
    editRow: bindActionCreators(editRow, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(List);
