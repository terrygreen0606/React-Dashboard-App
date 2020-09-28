import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { FormGroup, Button, Col, Input, Label, Card, CardHeader, CardBody } from 'reactstrap';
import { Control } from 'react-redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Services from '../../../services/investment';
import { editRow } from '../../../store/actions/common';
import ActionButttons from "../../CommonComponents/ActionButtons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { formatDate, getDateFormat } from "../../CommonComponents/methods";
import BackButton from '../../CommonComponents/BackButton';

const List = props => {
    const [state, setState] = useState({ from: null, to: null });
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    useEffect(() => {
        props.getList({ page });
        props.editRow({ id: '' });
        if(props.list.length < 16){
        props.getInvestment({});}
    }, []);

    /************* Handle page change **************/
    const handlePageChange = (pageNumber) => {
        props.getList({
            page: pageNumber, search, sortTo: sort.sortName,
            sortBy: sort.sortOrder
        });
        setPage(pageNumber);
    }

    /**************Search account name or number ***************/
    const handleSearch = () => {
        if (search.trim().length || state.from) {
            props.getList({ page: 1, search, from: state.from ? getDateFormat(state.from) : undefined, to: state.to ? getDateFormat(state.to) : undefined });
            setPage(1);
            setSort({ sortName: undefined, sortOrder: undefined });
        }
    }

    /************** Reset Search ***************/
    const handleResetSearch = () => {
        props.getList({ page: 1 });
        setPage(1);
        setSearch("");
        setState({ from: null, to: null })
        setSort({ sortName: undefined, sortOrder: undefined });
    }
      /*********** delete account ***********/
      const handleDelete = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (<div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    <p>You want to delete this coupon type.</p>
                    <button className="badge badge-blue" onClick={onClose}>No</button>
                    <button className="badge badge-red" onClick={() => {
                        props.deleteCoupon(id).then(() => props.getList({ page }));
                        onClose();
                    }}>
                        Yes, Delete it!
                    </button>
                </div>);
            }
        });
    };
   
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
        const url = `/edit-coupon`;
        return <ActionButttons id={row.Coupon_ID} url={url} history={props.history} handleDelete={(ID) => handleDelete(ID)} editRow={props.editRow} searchUrl={null} isSearch={false} />;
    };

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
            <Card>
                <CardHeader>
                <BackButton backUrl='/coupons' history={props.history} text={'Coupons'} />
               </CardHeader>
                <CardBody>
                <FormGroup row className="col-md-12">
                    <Col className="col-md-2"> <NavLink strict to="/coupons" className="btn btn-primary" >NEW COUPON</NavLink></Col>
                    <Col className="col-md-3"> <NavLink strict to="#" className={props.match.path === '/historical-coupon' ? "btn btn-default" : "btn btn-primary"} onClick={()=>props.history.push('/historical-coupon')} >HISTORICAL COUPON</NavLink></Col>
                    </FormGroup>
                    <hr />
                     <FormGroup row className="col-md-12">
                        <Col md="3">
                        <Label htmlFor="text-input">Cusip or Security Name:</Label>
                            <Input type="text" name="search" id="search" value={search} placeholder="security name or cusip" onChange={e => setSearch(e.target.value)} />
                        </Col>
                        <Col className="col-md-2">
                    <Label htmlFor="text-input">From Date:</Label>
                    <br />
                    <Control
                        model=".from"
                        className="form-control"
                        onChange={(date) => handleDateChange(date, 'from')}
                        selected={state.from}
                        component={dateProps => <DatePicker  {...dateProps} isClearable={true} placeholderText="From Date"/>}
                        />
                        </Col>
                        <Col className="col-md-2">
                    <Label htmlFor="text-input">To Date:</Label>
                    <br />
                        <Control
                            model="to"
                            className="form-control"
                            onChange={(date) => handleDateChange(date, 'to')}
                            selected={state.to}
                            component={toDateProps => <DatePicker  {...toDateProps} isClearable={true} placeholderText="To Date"/>}
                        />
                    </Col>                      
                    <Col md="1">  <br/> <Button type="button" size="sm" color="primary" style={{marginTop:'8px'}} onClick={() => handleSearch()} disabled={props.isLoading}>SEARCH</Button> </Col>
                    <Col md="1 "> <br/> <Button type="button" size="sm" color="primary" style={{marginTop:'8px'}} onClick={() => handleResetSearch()}>RESET</Button> </Col>
                    <Col md="1"> <br/> <Button type="button" size="sm" color="primary" style={{marginTop:'8px'}} onClick={() =>props.history.push('/investments-security') }>CLOSE</Button> </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col md="12">
                            <Label check></Label>
                            <NavLink strict to="#" className="view-all" onClick={() => getAllList()}> View All </NavLink>
                        </Col>
                    </FormGroup>
                    {props.isLoading && <div className="animated fadeIn pt-1 text-center table-loader" />}
                    <BootstrapTable
                        data={props.coupons}
                        version="4"
                        remote
                        condensed
                        hover pagination
                        options={{ ...options, page }}
                        fetchInfo={{ dataTotalSize: props.total_rows }}
                        trStyle={rowClassNameFormat}
                    >
                       
                        <TableHeaderColumn dataField="Start_Date" dataFormat={(cell, row) => (formatDate(row, 'Start_Date'))}>Start Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="Cusip" >Cusip</TableHeaderColumn>
                        <TableHeaderColumn dataField="Description">Description</TableHeaderColumn>
                        <TableHeaderColumn isKey dataField="Rate" >Rate</TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataFormat={actions}>Action</TableHeaderColumn>
                    </BootstrapTable>
                </CardBody>
            </Card>
        </div >
    );
};

List.propTypes = {
    getList: PropTypes.func.isRequired,
    coupons: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired,
    deleteCoupon: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    getInvestment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    coupons: state.investment.coupons,
    list: state.investment.list,
    total_rows: state.investment.total_rows,
    size: state.investment.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    getList: bindActionCreators(Services.getCoupons, dispatch),
    editRow: bindActionCreators(editRow, dispatch),
    deleteCoupon: bindActionCreators(Services.deleteCoupon, dispatch),
    getInvestment: bindActionCreators(Services.getInvestment, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(List);
