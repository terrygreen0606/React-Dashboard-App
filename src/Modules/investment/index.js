import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { FormGroup, Button, Col, Input, Label, Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as Services from '../../services/investment';
import { editRow } from '../../store/actions/common';
import { STYLE } from '../../utilities/constants';
import ActionButttons from "../CommonComponents/ActionButtons";
import {  getNumberFormat } from "../CommonComponents/methods";

const List = props => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });

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
        setPage(pageNumber);
    }

    /**************Search account name or number ***************/
    const handleSearch = () => {
        if (search.trim().length) {
            props.getList({ page: 1, search });
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

    /*********** Action buttons ************/
    const actions = (cell, row) => {
        const url = `/edit-security`;
        const searchUrl = `/view-security`
        return <ActionButttons id={row.Bond_ID} type={row.Security_type} url={url} history={props.history} handleDelete={false} editRow={props.editRow} searchUrl={searchUrl} isSearch={true} />;
    };

    const { investment, isLoading } = props;
    const options = {
        sortIndicator: true,
        page,
        onPageChange: handlePageChange,
        hideSizePerPage: true,
        paginationSize: 10,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        withFirstAndLast: true,
        sizePerPage: props.size,
        onSortChange: sortMethod,
        sortName: sort.sortName,
        sortOrder: sort.sortOrder,
        pageStartIndex: 1,
    };

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <i className="icon-menu"></i>Investment Security{' '}
                </CardHeader>
                <CardBody>
                    <FormGroup row className="col-md-12"> 
                        <Button type="button" size="md" color="primary" style={{ marginRight: STYLE.marginRight25 }} onClick={() => props.history.push('/add-security')}>Add New<br /> Security</Button>
                        <Button type="button" size="md" color="primary" style={{ marginRight: STYLE.marginRight25 }} onClick={() => props.history.push('/brokers')}>Add <br /> Broker</Button>
                        <Button type="button" size="md" color="primary" style={{ marginRight: STYLE.marginRight25 }} onClick={() => props.history.push('/transaction')}>Add <br /> Transaction</Button>
                        <Button type="button" size="md" color="primary" style={{ marginRight: STYLE.marginRight25 }} onClick={() => props.history.push('/add-price')}>Add <br />Price</Button>
                        <Button type="button" size="md" color="primary" style={{ marginRight: STYLE.marginRight25 }} onClick={() => props.history.push('/coupons')}>Add <br /> Coupon</Button>
                        <Button type="button" size="md" color="primary" style={{ marginRight: STYLE.marginRight25 }} onClick={() => props.history.push('/monthly-posting')}>Monthly <br /> Posting</Button> 
                        <Button type="button" size="md" color="primary" onClick={() => props.history.push('/transfer-security')}>Transfer <br/>Security</Button>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="12">
                            <h6>Look for security name or cusip</h6>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3"><Input type="text" name="search" id="search" value={search} placeholder="Look for security name or cusip" onChange={e => setSearch(e.target.value)} /></Col>
                        <Col md="1"> <Button type="button" size="sm" color="primary" onClick={() => handleSearch()} disabled={isLoading}>Search</Button> </Col>
                        <Col md="1"> <Button type="button" size="sm" color="primary" onClick={() => handleResetSearch()}>Reset</Button> </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col md="12">
                            <Label check></Label>
                            <NavLink strict to="#" className="view-all" onClick={() => getAllList()}> View All </NavLink>
                        </Col>
                    </FormGroup>
                    {isLoading && <div className="animated fadeIn pt-1 text-center table-loader" />}
                    <BootstrapTable
                        data={investment}
                        version="4"
                        remote
                        condensed
                        hover pagination
                        alwaysShowAllBtns
                        options={{ ...options, page }}
                        fetchInfo={{ dataTotalSize: props.total_rows }}
                        trStyle={rowClassNameFormat}
                    >
                        <TableHeaderColumn isKey dataField="Cusip" dataSort>Cusip</TableHeaderColumn>
                        <TableHeaderColumn dataField="Description" dataSort>Security Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="Adjusted_Cost" dataFormat={(cell, row) => row.Quantity ? getNumberFormat(row.Quantity, 3) :""}>Current Quantity</TableHeaderColumn>
                        <TableHeaderColumn dataField="Quantity" dataFormat={(cell, row) =>row.Adjusted_Cost ? `$${getNumberFormat(row.Adjusted_Cost)}` :""}>Adjusted Cost</TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataFormat={actions}>Action</TableHeaderColumn>
                    </BootstrapTable>
                </CardBody>
            </Card>
        </div >
    );
};

List.propTypes = {
    getList: PropTypes.func.isRequired,
    investment: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    investment: state.investment.list,
    total_rows: state.investment.total_rows,
    size: state.investment.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    getList: bindActionCreators(Services.getInvestment, dispatch),
    editRow: bindActionCreators(editRow, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(List);
