import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { FormGroup, Button, Col, Input, Label, Card, CardBody } from 'reactstrap';
import { Control } from 'react-redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Services from '../../../../services/investment';
import { editRow } from '../../../../store/actions/common';
import ActionButttons from "../../../CommonComponents/ActionButtons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { formatDate, getDateFormat } from "../../../CommonComponents/methods";
import {MONTHLY_POSTING, STYLE} from '../../../../utilities/constants';

const List = props => {
    const [state, setState] = useState({ btnType: '' ,fromDate:'', toDate:'',search:''}); 
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
     useEffect(() => {
         props.getList({page});
         props.editRow({ id: '' });
    }, []);

    /************* Handle page change **************/
    const handlePageChange = (pageNumber) => {
         props.getList({ search:state.search , from:getDateFormat(state.fromDate), to:getDateFormat(state.toDate) , page:pageNumber ,sortBy: sort.sortOrder  });
           setPage(pageNumber);
    }
  
    /**************Search according date***************/
    const handleSearch = () => {
            props.getList({ search:state.search , from:getDateFormat(state.fromDate), to:getDateFormat(state.toDate) , page:1  });
            setPage(1);
            setSort({ sortName: undefined, sortOrder: undefined });
           }
    /************ Handle data change **********/
    const handleStateChange = (date,key) => {
        setState({ ...state, [key]: date });
  };

    /************** Reset Search ***************/
    const handleResetSearch = () => {
        props.getList({ page: 1 });
        setPage(1);
        setState("")
        setSort({ sortName: undefined, sortOrder: undefined });
    }
      /*********** delete account ***********/
      const handleDelete = (id, type) => {
          confirmAlert({
            customUI: ({ onClose }) => {
                return (<div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    <p>You want to delete this account type.</p>
                    <button className="badge badge-blue" onClick={onClose}>No</button>
                    <button className="badge badge-red" onClick={() => {
                        props.historicalDelete(id, type).then(() => props.getList({ page }));
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
        props.getList({page:''});
        setPage(undefined);
    };

    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    };

    /*********** Action buttons ************/
    const actions = (cell, row) => {
        const setType = () => {
            if(row.posting.search('Amortization') > -1){
                props.setType(MONTHLY_POSTING.amortization);
            } else {
                props.setType(MONTHLY_POSTING.earnedInterest)
            }
        }        
        const url = `/monthly-posting` ;
        const searchUrl = `/monthly-posting`
        return <ActionButttons id={row.Settle_Date} url={url} setType={() => setType()} history={props.history} handleDelete={(ID) => handleDelete(ID, row.posting)} editRow={props.editRow} searchUrl={searchUrl} isSearch={false} />;
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
                <CardBody>
                <FormGroup row>
                <Col className="col-md-10">
                    </Col>
                    <Col className="col-md-2">
                    <Button type="button" size="sm" color="primary" onClick={()=>props.history.push('/investments-security')}>Close</Button>
                        </Col>
                    </FormGroup>
                <FormGroup row>
                <Col className="col-md-3">
                <Label htmlFor="text-input">Posting Type:</Label>
                <Control
                    model=".Payment_Frequency"
                    onChange={(e)=>handleStateChange(e.target.value,'search')}
                    component={paymentProps => <Input {...paymentProps} type="select" name="postingtype" id="posting_type" value={state.search}>
                             <option value="" key="empty">Select Posting</option>
                            <option value="Amortization" key="1">Amortization Posting</option>
                            <option value="Earned-Interest" key="2">Earned Interest Posting</option>
                            </Input>}
                        />
                </Col>
                     <Col className="col-md-2" >
                     <Label htmlFor="text-input">From Date:</Label>
                      <Control
                        model=""
                        className="form-control"
                        onChange={(date) => handleStateChange(date,'fromDate')}
                        selected={state.fromDate}
                        component={fromDateProps => <DatePicker  {...fromDateProps} placeholderText="Date"/>}
                     />
                      </Col>
                      <Col className="col-md-2" >
                      <Label htmlFor="text-input">To Date:</Label>
                      <Control
                        model=""
                        className="form-control"
                        onChange={(date) => handleStateChange(date,'toDate')}
                        selected={state.toDate}
                        component={toDateProps => <DatePicker  {...toDateProps} placeholderText="Date"/>}
                     />
                          </Col>
                     <Col className="col-md-4" style={{marginTop:'15px'}}>
                            <Button type="button" size="sm" color="primary" style={{ marginRight: STYLE.marginRight25 }} onClick={()=>handleSearch()} >SEARCH</Button>
                            <Button type="reset" size="sm" color="primary"  style={{ marginRight: STYLE.marginRight25 }} onClick={()=>handleResetSearch()}>RESET</Button>
                            
                            </Col>
                    </FormGroup>
                    {
                        props.historicalPosting != "" ? 
                        <>
                        <FormGroup check row>
                        <Col md="12">
                            <Label check></Label>
                            <NavLink strict to="#" className="view-all" onClick={() => getAllList()}> View All </NavLink>
                        </Col>
                    </FormGroup>
                    {props.isLoading && <div className="animated fadeIn pt-1 text-center table-loader" />}
                    <BootstrapTable
                        data={props.historicalPosting}
                        version="4"
                        remote
                        condensed
                        hover pagination
                        options={{ ...options, page }}
                        fetchInfo={{ dataTotalSize: props.total_rows }}
                        trStyle={rowClassNameFormat}
                    >
                       <TableHeaderColumn isKey={true} dataField="Settle_Date" dataFormat={(cell, row) => (formatDate(row, 'Settle_Date'))} >Date </TableHeaderColumn>
                        <TableHeaderColumn dataField="posting" >Posting Description  </TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataFormat={actions}>Action</TableHeaderColumn>
                    </BootstrapTable></>
                    :""}
                </CardBody>
            </Card>
        </div >
    );
};

List.propTypes = {
    getList: PropTypes.func.isRequired,
    historicalPosting: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired,
    historicalDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    historicalPosting: state.investment.historicalPosting,
    total_rows: state.investment.total_rows,
    size: state.investment.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    getList: bindActionCreators(Services.getHistoricalPostingData, dispatch),
    editRow: bindActionCreators(editRow, dispatch),
    historicalDelete: bindActionCreators(Services.deleteHistoricalPosting, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(List);
