import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Col, Label, Card, CardHeader, CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AccountService from '../../../services/accounting';
import BackButton from '../../CommonComponents/BackButton';
import { formatDate, getDateFormat, getNumberFormat } from '../../CommonComponents/methods';
import ActionButttons from "../../CommonComponents/ActionButtons";

const AccountsLedger = props => {
    const Account_ID = props.row_id;
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    useEffect(() => {
        if (!Account_ID) {
            props.history.goBack();
        } else {
            props.getList({ page: 1},
                {Account_ID, startDate: getDateFormat(new Date().getTime() - 1000 * 60 * 60 * 24 * 30), endDate: getDateFormat(new Date().getTime())
            });
        }
    }, []);
    /************* Handle page change **************/
    const handlePageChange = (pageNumber, sizePerPage) => {
        props.getList({ page: pageNumber }, { Account_ID, startDate: getDateFormat(startDate), endDate: getDateFormat(endDate) });
        setPage(pageNumber);
    }

    /**************Search account name or number ***************/
    const handleSearch = () => {
        props.getList({ page: 1 }, { Account_ID, startDate: getDateFormat(startDate), endDate: getDateFormat(endDate) });
        setPage(1);
    }
    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    }
    /*********** Action buttons ************/
    const actions = (row) => {
        return <ActionButttons id={row.Transaction_ID} url={''} history={props.history} handleDelete={(ID) => handleDelete(ID)} editRow={props.editRow} searchUrl={""} isSearch={false} />;
    };
     /*********** delete account ***********/
     const handleDelete = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (<div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    <p>You want to delete this transaction.</p>
                    <button className="badge badge-blue" onClick={onClose}>No</button>
                    <button className="badge badge-red" onClick={() => {
                        props.transactionsDelete(id, 'single').then(() => props.getList({ page: 1},
                            {Account_ID, startDate: getDateFormat(new Date().getTime() - 1000 * 60 * 60 * 24 * 30), endDate: getDateFormat(new Date().getTime())
                        }));
                        onClose();
                    }}>
                        Yes, Delete it!
                    </button>
                </div>);
            }
        });
    };

    const options = {
        sortIndicator: true,
        page,
        onPageChange: handlePageChange,
        hideSizePerPage: true,
        paginationSize: 10,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        alwaysShowAllBtns: true,
        withFirstAndLast: true,
        sizePerPage: props.size
    }
    const { accounts, isLoading, history } = props;
    const account = accounts.find(row => row);
    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <BackButton history={history} />
                </CardHeader>
                <CardBody>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="startDate">From:- </Label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="form-control"
                            />
                        </Col>
                        <Col md="3">
                            <Label htmlFor="endDate">To:- </Label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                className="form-control"
                            />
                        </Col>
                        <Col md="2"> <Button size="sm" color="primary" onClick={() => handleSearch()} disabled={isLoading}>Go</Button> </Col>
                    </FormGroup>
                    {isLoading ? <div className="animated fadeIn pt-1 text-center">Loading...</div> :
                        <>
                        <Col md="6"><b>{account ? "Opening Balance for "+account.Account_Name + ":-  $" +  getNumberFormat(account.Opening_balance) : ""}</b></Col><br/>
                        <BootstrapTable
                            data={accounts}
                            version="4"
                            version="4"
                            remote
                            condensed
                            striped hover pagination
                            options={{ ...options, page }}
                            fetchInfo={{ dataTotalSize: props.total_rows }}
                            trStyle={rowClassNameFormat} 
                        >
                            <TableHeaderColumn isKey dataField="Transaction_Date"  dataFormat={(cell, row) => (formatDate(row, 'Transaction_Date'))} width={'7%'} >Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="Transaction_Number"   >Trans #</TableHeaderColumn>
                            <TableHeaderColumn dataField="Memo" width={'15%'}>Payee / Category / Memo</TableHeaderColumn>
                            <TableHeaderColumn dataField="Account_Name"  width={'30%'} >Account Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="Debit" dataFormat={(cell, row) =>'$'+getNumberFormat(row.Debit)} dataAlign="right"  headerAlign="center">Decrease</TableHeaderColumn>
                            <TableHeaderColumn dataField="Credit" dataFormat={(cell, row) =>'$'+getNumberFormat(row.Credit)} dataAlign="right"  headerAlign="center">Increase</TableHeaderColumn>
                            <TableHeaderColumn dataField="Balance" dataFormat={(cell, row) => '$'+getNumberFormat(row.Balance)} headerAlign="center" dataAlign="right">Balance</TableHeaderColumn>
                            <TableHeaderColumn dataField=""  dataFormat={(cell, row) => actions(row)} width={'7%'} >Action</TableHeaderColumn>
                        </BootstrapTable>
                        </>
                    }
                </CardBody>
            </Card>
        </div>
    );
};

AccountsLedger.propTypes = {
    bankingList: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired,
    accounts: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    row_id: PropTypes.string.isRequired,
    transactionsDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    bankingList: state.accounting.bankingList,
    accounts: state.accounting.accountLedger,
    total_rows: state.accounting.total_rows,
    size: state.accounting.size,
    isLoading: state.loader.isLoading,
    row_id: state.accounting.edit_row_id
});

const mapDispatchToProps = dispatch => ({
    getList: bindActionCreators(AccountService.accountsLedgerList, dispatch),
    transactionsDelete: bindActionCreators(AccountService.transactionsDelete, dispatch) 
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsLedger);
