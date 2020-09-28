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
import { formatDate, getDateFormat } from "../../CommonComponents/methods";
import BackButton from '../../CommonComponents/BackButton';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const List = props => {
    const [state, setState] = useState({ from: null, to: null });
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
        setPage(page);
    }
 /*********** delete account ***********/
 const handleDelete = (id) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (<div className='custom-ui'>
                <h1>Are you sure?</h1>
                <p>You want to delete this account type.</p>
                <button className="badge badge-blue" onClick={onClose}>No</button>
                <button className="badge badge-red" onClick={() => {
                    // props.brokerDelete(id).then(() => props.getList({ page }));
                    onClose();
                }}>
                    Yes, Delete it!
                </button>
            </div>);
        }
    });
};
    /**************Search account name or number ***************/
    const handleSearch = () => {
        if (search.trim().length) {
            props.getList({ page: 1, search, from: state.from ? getDateFormat(state.from) : undefined, to: state.to ? getDateFormat(state.to) : undefined });
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
        const url = `/edit-transaction`;
        return <ActionButttons id={row.ID} type={row.Action} url={url} history={props.history} handleDelete={(ID) => handleDelete(ID)} editRow={props.editRow} isSearch={false} />;
    };

       /************ Handle date change **********/
       const handleDateChange = (date,key) => {
        setState({ ...state, [key]: date });
        };


    const { transaction, isLoading } = props;
    const options = {
        sortIndicator: true,
        page,
        onPageChange: handlePageChange,
        hideSizePerPage: true,
        paginationSize: 10,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: true,
        sizePerPage: props.size,
        onSortChange: sortMethod,
        sortName: sort.sortName,
        sortOrder: sort.sortOrder,
        pageStartIndex: 1
    };

    return (<>
        <div className="animated">
            <Card>
                <CardHeader>
                <BackButton history={props.history} backUrl="/investments-security" text={'Transaction History'} />
                </CardHeader>
                <CardBody>          
               <FormGroup row className="col-md-12">
                        <Col md="3">
                        <Label htmlFor="text-input">ID:</Label>
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
                        component={fromDateProps => <DatePicker  {...fromDateProps} isClearable={true}/>}
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
                            component={toDaterops => <DatePicker  {...toDaterops} isClearable={true}/>}
                        
                        />
                    </Col>                      
                    <Col md="1">  <br/> <Button type="button" size="sm" color="primary" style={{marginTop:'8px'}} onClick={() => handleSearch()} disabled={props.isLoading}>SEARCH</Button> </Col>
                    <Col md="1 "> <br/> <Button type="button" size="sm" color="primary" style={{marginTop:'8px'}} onClick={() => handleResetSearch()}>RESET</Button> </Col>
                        <Col md="1"> <br /> <Button type="button" size="sm" color="primary" style={{ marginTop: '8px' }} onClick={() => props.history.push('/investments-security')}>CLOSE</Button> </Col>
                        <Col md="1"> <br/> <Button type="button" size="sm" color="primary" style={{marginTop:'8px'}} onClick={() =>props.history.push('/add-transaction') }>ADD TRANSACTION</Button> </Col>
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
                         <TableHeaderColumn isKey dataField="ID" dataSort>ID</TableHeaderColumn>
                         <TableHeaderColumn dataField="Lot" >Lot</TableHeaderColumn>
                         <TableHeaderColumn dataField="Symbol"  >Symbol</TableHeaderColumn>
                         <TableHeaderColumn dataField="" dataFormat={(cell, row) => (formatDate(row, 'TradeDate'))} width='100px'>Trade Date </TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataFormat={(cell, row) => (formatDate(row, 'SettleDate'))} width='100px'>Settle Date </TableHeaderColumn>
                        <TableHeaderColumn dataField="Description" width='100px' >Description</TableHeaderColumn>
                        <TableHeaderColumn dataField="Action" >Action </TableHeaderColumn>
                        <TableHeaderColumn dataField="Price">Price</TableHeaderColumn>
                        <TableHeaderColumn dataField="Quantity">Quantity</TableHeaderColumn>
                        <TableHeaderColumn dataField="Factor">Factor</TableHeaderColumn>
                        <TableHeaderColumn dataField="NetAmount" width='100px'>Net Amount</TableHeaderColumn>
                        <TableHeaderColumn dataField="AccruedInterest" width='130px'>Accrued Interest</TableHeaderColumn>
                        <TableHeaderColumn dataField="Yield">Yield</TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataFormat={actions}>Action</TableHeaderColumn>
                    </BootstrapTable>
                </CardBody>
            </Card>
            
        </div >
        </>
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
