import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button, Col, Label, Card, CardHeader, CardBody } from 'reactstrap';
import { Control } from 'react-redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Switch from "react-switch";
import Select from "react-select"; 
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Services from '../../../services/investment';
import * as action from '../../../store/actions/investment';
import { toastAction } from '../../../store/actions/toast-actions';
import Message from '../../../utilities/message';
import { formatDate, getDateFormat, getNumberFormat } from "../../CommonComponents/methods";
import BackButton from '../../CommonComponents/BackButton';


const List = props => {
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [state, setState] = useState({ from: null, toBrokerage: '', fromBrokerage:'' });
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    const { investment} = useSelector(state => state);
    const { brokerageData} = investment;
    useEffect(() => {  
        props.getBrokerageAccount({}).then(()=> props.getTransferSecurityAction({ transferSecurity: [], total_rows: 0, size: 0 })  );  
        // props.getList({ date:'20200731', account_id:'84', page });
    }, []);

     
    /************* Handle page change **************/
    const handlePageChange = (pageNumber) => {
        props.getList({
            page:pageNumber, state, sortTo: sort.sortName,
            sortBy: sort.sortOrder
        });
        setPage(page);
    }

    /*********** Action buttons ************/
    const selectActions = (cell, row) => {
        return <label>
            <Switch onColor="#080" offColor="#888" onChange={() =>  setSelectedRecords([row])} checked={selectedRecords.findIndex(s => s.id === row.id) > -1} height={15} width={30} />
        </label>
    };
    /*********** Sorting Function ************/
    const sortMethod = (sortTo, sortBy) => {
        const pageNumber = page ? 1 : undefined;
        setSort({ sortName: sortTo, sortOrder: sortBy })
        props.getList({ page: pageNumber, sortTo, sortBy });
        setPage(pageNumber);
    }
    /******************* Get all list  *************/
    // const getAllList = () => {
    //     props.getList({});
    //     setPage(undefined);
    // };

    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    };
    
     /********Get List****** */
    const getListData = () =>
    {;
        if(state.from === null || state.fromBrokerage === '' ){
            toastAction(false, Message.emptyField);
        }else
        {
        props.getList({ date: getDateFormat(state.from), account_id:state.fromBrokerage.value, page });
        }
    }

    /*****Handle Submit****** */
    const handleSubmit = () => {
        const record = selectedRecords.find(r=>r) || {};
        let payload = {
            "toDate":getDateFormat(state.from),
            "account_id":state.fromBrokerage.value,
            "transaction_id":"145071",
            "qty":record['MarketValue'] || '0'
        }
        props.updateTransfer(payload).then(() => { props.history.push('/investments-security')});
    }
    
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
                <BackButton   backUrl='/investments-security' history={props.history} text={'Transfer Security'} />
                </CardHeader>
                <CardBody>
                <FormGroup row className="col-md-12">
                    <Col className="col-md-2">
                    <Label htmlFor="text-input">From Date:</Label>
                    <br />
                    <Control
                        model=".from"
                        className="form-control"
                        onChange={(date) => {setState({ ...state, from: date })}}
                        selected={state.from}
                        component={fromDateProps => <DatePicker  {...fromDateProps}   placeholderText="From Date"/>}
                        />
                        </Col>
                        <Col md="3">    
                     <Label htmlFor="text-input">Transfer From Brokerage Account: </Label>
                     <Control
                        model=".from_Brokerage_Account"
                        onChange={(e) => {setState({ ...state, fromBrokerage: e });getListData()}} 
                        component={fromBrokerageProps => <Select
                            {...fromBrokerageProps}
                            options={brokerageData.map(row => ({ value: row.Account_ID, label: row.Account_Name }))} />}
                                     />
                    </Col>
                    <Col md="3">    
                     <Label htmlFor="text-input">Transfer To Brokerage Account: </Label>
                     <Control
                        model=".to_Brokerage_Account"
                        onChange={(e) =>{ setState({ ...state, toBrokerage: e });getListData()}}  
                        component={toBrokerageProps => <Select
                            {...toBrokerageProps}
                            options={brokerageData.map(row => ({ value: row.Account_ID, label: row.Account_Name }))} />}
                                     />
                            </Col> 
                            <Col md="1"></Col>
                            <Col md="3"><Button type="button" size="sm" color="primary" style={{marginTop:'8px'}} onClick={() => handleSubmit()} disabled={props.isLoading}>TRANSFER & CLOSE</Button> </Col>
                    </FormGroup>
                    {/* <FormGroup row className="col-md-12">
                    <Col md="4">
                    <Switch onColor="#080" offColor="#888" onChange={() => setCheck(!check)} checked={check ? true : null} height={15} width={30} />
                    <span>{"   "}Transfer All Security</span>
                    </Col>
                        <Col md="12">
                        <Label check></Label>
                        <NavLink strict to="#" className="view-all" onClick={() => getAllList()}> View All </NavLink>
                     </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-12"></FormGroup> */}
                    {props.isLoading && <div className="animated fadeIn pt-1 text-center table-loader" />}
                        <BootstrapTable
                        data={props.transferSecurity}
                        version="4"
                        remote
                        condensed
                        hover pagination
                        options={{ ...options, page }}
                        fetchInfo={{ dataTotalSize: props.total_rows }}
                        trStyle={rowClassNameFormat}
                        selectedRecords={selectedRecords}
                    >
                        <TableHeaderColumn dataField="" dataFormat={selectActions}></TableHeaderColumn>
                        <TableHeaderColumn  isKey dataField="SettleDate" dataFormat={(cell, row) => (formatDate(row, 'SettleDate'))}>Buy Date</TableHeaderColumn>
                        <TableHeaderColumn  dataField="Description">Description</TableHeaderColumn>
                        <TableHeaderColumn  dataField="Lot">Lot</TableHeaderColumn>
                        <TableHeaderColumn  dataField="MarketValue">Quantity </TableHeaderColumn>
                        <TableHeaderColumn  dataField="adjusted_cost" dataFormat={(cell, row) =>row.adjusted_cost ? getNumberFormat(row.adjusted_cost) :""}>Adjusted Cost </TableHeaderColumn>
                      </BootstrapTable>
                </CardBody>
            </Card>
        </div >
    );
};
List.propTypes = {
    getList: PropTypes.func.isRequired,
    transferSecurity: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired,
    getBrokerageAccount: PropTypes.func.isRequired,
    updateTransfer: PropTypes.func.isRequired,
    getTransferSecurityAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    transferSecurity: state.investment.transferSecurity,
    total_rows: state.investment.total_rows,
    size: state.investment.size,
    isLoading: state.loader.isLoading
});
const mapDispatchToProps = dispatch => ({
    getList: bindActionCreators(Services.getTransferSecurity, dispatch),
    getBrokerageAccount:bindActionCreators(Services.getBrokerageAccount, dispatch),
    updateTransfer:bindActionCreators(Services.updateTransfer, dispatch),
    getTransferSecurityAction:bindActionCreators(action.getTransferSecurity, dispatch)
   });
export default connect(mapStateToProps, mapDispatchToProps)(List);
