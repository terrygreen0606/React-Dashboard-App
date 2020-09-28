import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { Control } from 'react-redux-form';
import { Card, CardHeader, CardBody, FormGroup, Col, Button, Label} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Select from "react-select"; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Services from '../../../services/investment';
import { editRow } from '../../../store/actions/common';
import ActionButttons from "../../CommonComponents/ActionButtons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BackButton from '../../CommonComponents/BackButton';
import { formatDate, getDateFormat } from "../../CommonComponents/methods";

const HistoricalPriceList = props => {
    const [state, setState] = useState({ from: null, to: null });
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    
    useEffect(() => {  
        props.getBrokerageAccount({});        
        props.getList({ page });
        props.editRow({ id: '' });
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
        if (search.trim().length || state.from || state.to) {
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
                        props.deletePrice(id).then(() => props.getList({ page }));
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
        const url = `/edit-price`;
        const searchUrl='/view-price';
        return <ActionButttons id={row.Date} url={url} history={props.history} handleDelete={(ID) => handleDelete(ID)} editRow={props.editRow} searchUrl={searchUrl} isSearch={true} />;
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
            <BackButton backUrl='/investments-security' history={props.history} text={'Transaction History'} />
            </CardHeader>
            <CardBody>
            <FormGroup row className="col-md-12">
                    <Col className="col-md-2"> <NavLink strict to="/add-price" className="btn btn-primary" >ADD PRICE</NavLink></Col>
                    <Col className="col-md-3"> <NavLink strict to="#" className={props.match.path === '/historical-price' ? "btn btn-default" : "btn btn-primary"} >TRANSACTION HISTORY</NavLink></Col>
                    </FormGroup>
                    <hr />
                    <FormGroup row className="col-md-12">
                    <FormGroup row className="col-md-12">
                    <Col md="11">
                        </Col>
                        <Col md="1">
                       <Button type="button" size="sm" color="primary" style={{marginTop:'8px'}} onClick={() =>props.history.push('/investments-security') }>CLOSE</Button>
                        </Col>
                    </FormGroup>
                        <Col md="3">    
                        <Label htmlFor="text-input">Brokerage Account:</Label>
                        <Control
                        model=".Brokerage_Account"
                        component={propsData => <Select
                            {...propsData}
                                options={props.brokerageData && props.brokerageData.map(row => ({ value: row.Account_ID, label: row.Account_Name }))} 
                            />
                           
                        }/>
                    </Col>
                        <Col className="col-md-2">
                    <Label htmlFor="text-input">From Date:</Label>
                    <br />
                    <Control
                        model=".from"
                        className="form-control"
                        onChange={(date) => handleDateChange(date, 'from')}
                        selected={state.from}
                        component={fromDateProps => <DatePicker  {...fromDateProps} isClearable={true} placeholderText="From Date"/>}
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
                  
                    </FormGroup>
                    <FormGroup check row>
                        <Col md="12">
                            <Label check></Label>
                            <NavLink strict to="#" className="view-all" onClick={() => getAllList()}> View All </NavLink>
                        </Col>
                    </FormGroup>
                    {props.isLoading && <div className="animated fadeIn pt-1 text-center table-loader" />}
                    <BootstrapTable
                        data={props.prices}
                        version="4"
                        remote
                        condensed
                        hover pagination
                        options={{ ...options, page }}
                        fetchInfo={{ dataTotalSize: props.total_rows }}
                        trStyle={rowClassNameFormat}
                    >
                        <TableHeaderColumn dataField="" dataFormat={(cell, row) => (formatDate(row, 'Date'))}>Start Date</TableHeaderColumn>
                        <TableHeaderColumn  isKey dataField="Brokerage_Account" >Brokerage Account</TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataFormat={actions}>Action</TableHeaderColumn>
                    </BootstrapTable>
            </CardBody>
        </Card>
    </div >
    );
};

HistoricalPriceList.propTypes = {
    brokerageData: PropTypes.array.isRequired,
    getList: PropTypes.func.isRequired,
    prices: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired,
    deletePrice: PropTypes.func.isRequired,
    getBrokerageAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    brokerageData: state.investment.brokerageData,
    prices: state.investment.prices,
    total_rows: state.investment.total_rows,
    size: state.investment.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    getList: bindActionCreators(Services.getPrices, dispatch),
    editRow: bindActionCreators(editRow, dispatch),
    deletePrice: bindActionCreators(Services.deletePrice, dispatch),
    getBrokerageAccount: bindActionCreators(Services.getBrokerageAccount, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoricalPriceList);
